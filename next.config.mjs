/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimisations pour la vitesse de développement
  experimental: {
    // Optimise les imports pour réduire le temps de compilation
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  
  // Configuration Webpack optimisée
  webpack: (config, { dev, isServer }) => {
    if (dev) {
      // Optimisations pour le développement
      config.optimization = {
        ...config.optimization,
        // Réutilise les modules entre les builds
        moduleIds: 'deterministic',
        // Optimise la taille des chunks
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true,
            },
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              priority: -10,
              chunks: 'all',
            },
          },
        },
      };
      
      // Améliore les performances de résolution des modules
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
      };
    }
    
    return config;
  },
  
  // Configuration des images
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
    // Optimise le chargement des images
    formats: ['image/webp', 'image/avif'],
  },
  
  // Optimisations pour le serveur de développement
  devIndicators: {
    buildActivity: false, // Désactive l'indicateur de build pour réduire les distractions
  },
  
  // Configuration ESLint pour de meilleures performances
  eslint: {
    // Ignore les erreurs ESLint pendant le build pour accélérer
    ignoreDuringBuilds: false,
  },
  
  // Configuration TypeScript
  typescript: {
    // Ignore les erreurs TypeScript pendant le build pour accélérer (à utiliser avec précaution)
    ignoreBuildErrors: false,
  },
  
  // Configuration de production
  swcMinify: true, // Utilise SWC pour la minification (plus rapide que Terser)
  
  // Headers pour améliorer les performances
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ];
  },
};

export default nextConfig; 