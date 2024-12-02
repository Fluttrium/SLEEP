import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function clearAllTables() {
    try {
        // Получение списка всех таблиц (для PostgreSQL — schema = 'public')
        const tables: { table_name: string }[] = await prisma.$queryRawUnsafe(
            `SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';`
        );

        // Удаление данных из каждой таблицы
        for (const { table_name } of tables) {
            await prisma.$executeRawUnsafe(`TRUNCATE TABLE "${table_name}" CASCADE;`);
        }

        console.log('Все таблицы очищены!');
    } catch (error) {
        console.error('Ошибка при очистке таблиц:', error);
    } finally {
        await prisma.$disconnect();
    }
}

clearAllTables();
