import { Helmet } from "react-helmet-async";

export const SEO = ({
  title = "HK Masso | Massothérapie Équilibrée",
  description = "Professional massotherapy and wellness services by HK Masso.",
  favicon = "/favicon.png",
}) => (
  <Helmet>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta charSet="utf-8" />

    <link rel="icon" type="image/png" href={favicon} />
    <link rel="apple-touch-icon" href={favicon} />

    <meta property="og:type" content="website" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
  </Helmet>
);
