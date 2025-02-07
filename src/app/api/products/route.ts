import {NextResponse} from 'next/server'
import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
    try {
        const products = await prisma.product.findMany({
            include: {category: true, items: true}
        })
        return NextResponse.json(products)
    } catch (error) {
        return NextResponse.json(
            {error: 'Ошибка при загрузке продуктов'},
            {status: 500}
        )
    }
}

export async function POST(request: Request) {
    try {
        const {name, imageUrl, categoryId} = await request.json()

        const product = await prisma.product.create({
            data: {
                name,
                imageUrl,
                categoryId: Number(categoryId)
            }
        })

        return NextResponse.json(product, {status: 201})
    } catch (error) {
        return NextResponse.json(
            {error: 'Ошибка при создании продукта'},
            {status: 500}
        )
    }
}

export async function DELETE(request: Request) {
    try {
        const {id} = await request.json()

        await prisma.productItem.deleteMany({
            where: {
                productId: id
            }
        });
        await prisma.product.delete({
            where: {id: Number(id)}
        })

        return NextResponse.json(
            {message: 'Продукт удален'},
            {status: 200}
        )
    } catch (error) {
        return NextResponse.json(
            {error: 'Ошибка при удалении продукта'},
            {status: 500}
        )
    }
}