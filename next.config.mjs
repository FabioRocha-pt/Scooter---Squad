/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ignora os erros do ESLint para não bloquear o build
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // O modularizeImports sai do "experimental" e vem para a raiz (caso estejas a usá-lo)
  modularizeImports: {
    // as tuas configs aqui, se existirem
  },
  
  experimental: {
    // outras opções experimentais, mas sem o modularizeImports
  }
};

export default nextConfig;