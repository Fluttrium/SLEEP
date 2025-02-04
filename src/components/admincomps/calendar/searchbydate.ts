export async function searchbydate(year: number, month: number) {
    try {
        const response = await fetch("/api/admin/calendar/pickdata", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ year, month }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Ошибка при поиске записей:", errorData.message);
            throw new Error(errorData.message);
        }

        const data = await response.json();
        console.log("Полученные данные:", data);
        return data;
    } catch (error) {
        console.error("Ошибка выполнения запроса:", error);
        throw new Error("Не удалось получить записи.");
    }
}
