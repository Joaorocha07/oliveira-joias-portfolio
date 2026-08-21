import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.r2.dev",
      },
    ],
    // Padrão do Next é 4h — as fotos de produto quase nunca mudam, então
    // um TTL curto faz o Vercel reotimizar (e cobrar) a mesma imagem várias
    // vezes por dia. 31 dias reduz drasticamente as re-transformações.
    minimumCacheTTL: 2678400,
    // Menos variações de largura = menos combinações únicas otimizadas por
    // imagem, cobrindo os tamanhos realmente usados no site (grids em
    // 25vw/33vw/50vw/100vw e miniaturas de 80px/192px).
    deviceSizes: [640, 828, 1200, 1920],
    imageSizes: [96, 192, 256, 384],
  },
};

export default nextConfig;
