const isGithubPages = process.env.NODE_ENV === "production";

module.exports = {
  output: "export", // next build ile otomatik static export yapılır
  basePath: isGithubPages ? "/FizibiliteFormu" : "",
  assetPrefix: isGithubPages ? "/FizibiliteFormu/" : "",
  images: {
    unoptimized: true, // GitHub Pages için zorunlu (çünkü Image Optimization desteklenmiyor)
  },
};
