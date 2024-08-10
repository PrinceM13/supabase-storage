/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ahmbsxoaozlomvkqepkr.supabase.co",
        pathname: "/**"
      }
    ]
  }
};

export default nextConfig;
