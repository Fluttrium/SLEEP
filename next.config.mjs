/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {

        domains: ['assets.aceternity.com'],['img.medicalexpo.ru'],
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
