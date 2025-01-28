import {NextResponse} from "next/server";
import {prisma} from "../../../../../../prisma/prisma-client";


export async function GET(
    request: Request,
    {params}: { params: { id: string } }
) {
    try {
        const productId = parseInt(params.id);
        if (isNaN(productId)) {
            return NextResponse.json(
                {error: "Invalid consultation ID format"},
                {status: 400}
            );
        }

        const items = await prisma.consulProductItem.findMany({
            where: {consulProductId: productId},
            orderBy: {dateStart: 'asc'}
        });

        return NextResponse.json({
            status: 'success',
            items: items.map(item => ({
                id: item.id,
                dateStart: item.dateStart.toISOString(),
                dateEnd: item.dateEnd.toISOString(),
                consulProductId: item.consulProductId
            }))
        });

    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json(
            {error: 'Internal server error'},
            {status: 500}
        );
    }
}


export async function POST(
    request: Request,
    {params}: { params: { id: string } }
) {
    try {
        // 1. Проверка ID
        const productId = parseInt(params.id);
        if (isNaN(productId)) {
            return NextResponse.json(
                {error: "Invalid consultation ID format"},
                {status: 400}
            );
        }

        // 2. Проверка существования консультации
        const productExists = await prisma.consulProduct.findUnique({
            where: {id: productId}
        });

        if (!productExists) {
            return NextResponse.json(
                {error: "Consultation product not found"},
                {status: 404}
            );
        }

        // 3. Парсинг и валидация тела запроса
        let slots;
        try {
            slots = await request.json();
        } catch (e) {
            return NextResponse.json(
                {error: "Invalid JSON format"},
                {status: 400}
            );
        }

        if (!Array.isArray(slots)) {
            return NextResponse.json(
                {error: "Expected array of slots"},
                {status: 400}
            );
        }

        // 4. Валидация структуры слотов
        const validSlots = slots.every(slot =>
            slot.dateStart &&
            slot.dateEnd &&
            !isNaN(Date.parse(slot.dateStart)) &&
            !isNaN(Date.parse(slot.dateEnd))
        );

        if (!validSlots) {
            return NextResponse.json(
                {error: "Invalid slot structure or date format"},
                {status: 400}
            );
        }

        // 5. Удаление старых записей и создание новых
        const transactionResult = await prisma.$transaction(async (tx) => {
            // Удаление всех существующих слотов для данного продукта
            await tx.consulProductItem.deleteMany({
                where: {consulProductId: productId}
            });

            // Добавление новых слотов
            const createdItems = await Promise.all(
                slots.map(slot =>
                    tx.consulProductItem.create({
                        data: {
                            dateStart: new Date(slot.dateStart),
                            dateEnd: new Date(slot.dateEnd),
                            consulProductId: productId
                        }
                    })
                )
            );

            return createdItems;
        });

        // 6. Формирование ответа
        return NextResponse.json({
            status: 'success',
            createdCount: transactionResult.length,
            items: transactionResult.map(item => ({
                id: item.id,
                dateStart: item.dateStart.toISOString(),
                dateEnd: item.dateEnd.toISOString(),
                consulProductId: item.consulProductId
            }))
        });

    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json(
            {error: 'Internal server error'},
            {status: 500}
        );
    }
}


export async function DELETE(
    request: Request,
    {params}: { params: { id: string } }
) {
    try {
        const productId = parseInt(params.id);
        if (isNaN(productId)) {
            return NextResponse.json(
                {error: "Invalid consultation ID format"},
                {status: 400}
            );
        }

        await prisma.consulProductItem.deleteMany({
            where: {consulProductId: productId}
        });

        return NextResponse.json({
            status: 'success',
            message: 'All slots deleted successfully'
        });

    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json(
            {error: 'Internal server error'},
            {status: 500}
        );
    }
}