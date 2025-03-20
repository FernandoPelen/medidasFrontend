module.exports = {
  eslint: {
    ignoreDuringBuilds: true, 
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/login",
        permanent: true, 
      },
    ];
  },
};
