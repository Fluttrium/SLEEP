/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['assets.aceternity.com'],
        remotePatterns: [
            {
                protocol: "https",
                hostname: "storage.yandexcloud.net",
                pathname: "/**",
            },
        ],// Добавьте сюда ваш домен для загрузки изображений
    },
};

export default nextConfig;
