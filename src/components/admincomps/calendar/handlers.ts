export async function searchbyhour(hour: number) {
    try {
        const response = await fetch("/api/admin/calendar/pickhour", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({hour}),
        })
        if (response.ok) {
            const consulsAtHour = await response.json();
            console.log('Записи на выбранный час:', consulsAtHour);
            return consulsAtHour;
        } else {
            const errorData = await response.json();
            console.error('Ошибка при поиске записей на выбранный час:', errorData.message);
            throw new Error(errorData.message);
        }
    } catch (error) {
        console.error('Ошибка выполнения запроса:', error);
        throw new Error('Не удалось получить записи.');
    }

}

export async function fetchAllDoctors() {
    try {
        const response = await fetch('api/admin/calendar/getdocs', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Ошибка при получении списка докторов:', error);
        throw error;
    }
}

export async function fetchAllDoctorProduct() {
    try {
        const response = await fetch('api/admin/calendar/docproduct', {})
        return await response.json();
    } catch (error) {
        console.error('Ошибка при получении списка doctorProduct:', error);
        throw error;
    }
}
