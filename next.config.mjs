const isGithub = process.env.NODE_ENV === "production";

export default {
  output: "export",
  basePath: isGithub ? "/FizibiliteFormu" : "",
  assetPrefix: isGithub ? "/FizibiliteFormu/" : "",
  images: {
    unoptimized: true,
  },
};
