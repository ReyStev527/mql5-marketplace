import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({
  title = 'MQL5 Marketplace - Professional Expert Advisors',
  description = 'Discover high-quality, tested Expert Advisors for MetaTrader 5. Automate your trading with proven strategies from professional developers.',
  keywords = 'MQL5, Expert Advisors, MetaTrader, Trading, Forex, Automation, EA',
  image = '/og-image.jpg',
  url = '',
  type = 'website',
  author = 'MQL5 Marketplace Team',
  siteName = 'MQL5 Marketplace'
}) => {
  const fullUrl = `${window.location.origin}${url}`;
  const fullImageUrl = image.startsWith('http') ? image : `${window.location.origin}${image}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      
      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#1976d2" />
      <meta name="msapplication-TileColor" content="#1976d2" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />
      
      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": siteName,
          "description": description,
          "url": window.location.origin,
          "logo": `${window.location.origin}/logo.png`,
          "sameAs": [
            "https://facebook.com/mql5marketplace",
            "https://twitter.com/mql5marketplace",
            "https://linkedin.com/company/mql5marketplace"
          ]
        })}
      </script>
    </Helmet>
  );
};

export default SEO;

