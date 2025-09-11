/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
  },
  experimental: {
    serverComponentsExternalPackages: ['pdf-parse', 'PyPDF2'],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push('pdf-parse', 'PyPDF2');
    }
    return config;
  },
}

module.exports = nextConfig
