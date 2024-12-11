/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['assets.aceternity.com'], // Добавьте сюда ваш домен для загрузки изображений
    },
    async headers() {
        return [
            {
                source: "/api/:path*", // Настройки для всех API-роутов
                headers: [
                    { key: "Cache-Control", value: "no-store, no-cache, must-revalidate, proxy-revalidate" },
                ],
            },
        ];
    },
};

module.exports = nextConfig;
