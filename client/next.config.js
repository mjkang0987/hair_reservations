/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify      : true
};

module.exports = nextConfig;

module.exports = {
    async rewrites() {
        const asides = ['day', 'three', 'week', 'month', 'year'];
        let types = [];

        asides.map((aside) => {
            const type = {
                source     : `/${aside.toLowerCase()}/:path*`,
                destination: '/'
            };

            types = [...types, type];
        });

        return [
            ...types
        ];
    }
};

