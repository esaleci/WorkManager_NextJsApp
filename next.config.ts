import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
 
    images: {
        // loader: 'default',  
        // formats: ['image/avif', 'image/webp'],
        // formats: ['image/avif', 'image/webp'],
        disableStaticImages: true,  
         unoptimized: true,  
            //   loader: 'custom',
            // loaderFile: './src/app/ui/dashboard/imageloder.js',
           remotePatterns: [  {
            protocol: 'http',
            hostname: 'localhost',
            port: '3000',
            pathname: '/images/**',
          },
        ]
    //      remotePatterns: [  {
    //         protocol: 'http',
    //         hostname: 'localhost',
    //         port: '3000',
    //         pathname: '/images/**',
    //       },
    //     ]
      },
      reactStrictMode: false,
      trailingSlash: true,
      staticPageGenerationTimeout: 1000, 
      typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
      },
      eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
      },
      output: 'standalone',
};

export default nextConfig;
