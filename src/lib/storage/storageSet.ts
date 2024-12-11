import {S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand} from "@aws-sdk/client-s3";

// Типизация параметров для загрузки файла
interface FileUploadParams {
    key: string;  // No need for bucket in the parameter, it’s already in the environment variable
    file: Buffer;
}

// Настройка клиента S3 для Yandex Cloud
const s3 = new S3Client({
    endpoint: 'https://storage.yandexcloud.net',
    region: 'ru-central1',
    credentials: {
        accessKeyId: process.env.YANDEX_CLOUD_ACCESS_KEY!,
        secretAccessKey: process.env.YANDEX_CLOUD_SECRET_KEY!,
    },
});

// Функция загрузки файла в S3
export const uploadFile = async ({key, file}: FileUploadParams): Promise<string> => {
    try {
        const bucket = process.env.YANDEX_CLOUD_BUCKET;  // Get bucket name from environment variable
        if (!bucket) {
            throw new Error('Bucket name is missing in environment variables.');
        }

        // Используем команду для загрузки файла
        const command = new PutObjectCommand({
            Bucket: bucket,
            Key: key,
            Body: file,
            ACL: 'public-read',  // File is publicly accessible
        });

        const result = await s3.send(command);

        // Возвращаем URL загруженного файла
        return `https://storage.yandexcloud.net/sleep2/${key}`;

    } catch (error) {
        console.error('Ошибка загрузки файла:', error);
        throw new Error('Failed to upload file.');
    }
};

// Функция получения файла из S3
export const getFile = async (key: string): Promise<Buffer> => {
    try {
        const bucket = process.env.YANDEX_CLOUD_BUCKET;
        if (!bucket) {
            throw new Error('Bucket name is missing in environment variables.');
        }

        const command = new GetObjectCommand({
            Bucket: bucket,
            Key: key,
        });

        const file = await s3.send(command);

        // Проверка типа тела файла и возвращаем его как Buffer
        if (file.Body instanceof Buffer) {
            return file.Body;
        } else {
            throw new Error('File body is not a buffer.');
        }
    } catch (error) {
        console.error('Ошибка скачивания файла:', error);
        throw new Error('Failed to retrieve file.');
    }
};

// Функция удаления файла из S3
export const deleteFile = async (key: string): Promise<void> => {
    try {
        const bucket = process.env.YANDEX_CLOUD_BUCKET;
        if (!bucket) {
            throw new Error('Bucket name is missing in environment variables.');
        }

        const command = new DeleteObjectCommand({
            Bucket: bucket,
            Key: key,
        });

        await s3.send(command);

        console.log('Файл успешно удалён:', key);
    } catch (error) {
        console.error('Ошибка удаления файла:', error);
        throw new Error('Failed to delete file.');
    }
};
