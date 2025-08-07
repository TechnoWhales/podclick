import { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

//const nextConfig: NextConfig = {}
const nextConfig: NextConfig = {
  /*  experimental: {
        missingSuspenseWithCSRBailout: false,
    },*/
  images: {
    remotePatterns: [
      {
        hostname: 'staging-it-incubator.s3.eu-central-1.amazonaws.com',
        pathname: '/**',
        port: '',
        protocol: 'https',
      },
      {
        hostname: 'staging-it-incubator.s3.eu-central-1.amazonaws.com',
        pathname: '/**',
        port: '',
        protocol: 'https',
      },
    ],
  },
  reactStrictMode: true,
}

const withNextIntl = createNextIntlPlugin()
export default withNextIntl(nextConfig)
