export function savePost(data: FormData) {
    const apiEndpoint = '/api/report';

    fetch(apiEndpoint, {
        method: 'POST',
        body: JSON.stringify(data),
    })
        .then((res) => res.json())
        .then((response) => {
            alert(response.message);
        })
        .catch((err) => {
            alert(err);
        });
}

export function getPosts(): Promise<any> {
    const apiEndpoint = '/api/report';

    return fetch(apiEndpoint, {
        method: 'GET',
    })
        .then((res) => res.json())
        .then((response) => {
            return response as any; // Указываем тип возвращаемого значения
        })
        .catch((err) => {
            console.error("Ошибка при получении отчета:", err);
            throw err;
        });
}