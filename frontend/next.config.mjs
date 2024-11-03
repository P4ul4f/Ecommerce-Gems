/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode : true,
  images: {
    domains: ['luxury-gemstone.vercel.app'],
  },
  webpack(config) {
    // Encontrar la regla existente que maneja las importaciones de SVG
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.(".svg")
    );

    // Asegúrate de que la regla exista antes de modificarla
    if (fileLoaderRule) {
      config.module.rules.push(
        // Reaplicar la regla existente, pero solo para SVG que terminan en ?url
        {
          ...fileLoaderRule,
          test: /\.svg$/i,
          resourceQuery: /url/, // *.svg?url
        },
        // Convertir todas las demás importaciones de *.svg a componentes React
        {
          test: /\.svg$/i,
          issuer: fileLoaderRule.issuer,
          resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // excluir si *.svg?url
          use: ["@svgr/webpack"],
        }
      );

      // Modificar la regla del cargador de archivos para ignorar *.svg
      fileLoaderRule.exclude = /\.svg$/i;
    }

    return config;
  },
};

export default nextConfig;
