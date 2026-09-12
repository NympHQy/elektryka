import path from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv, type Plugin } from 'vite'
import { seo, services, site } from './src/data/site'

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/**
 * SEO z jednego źródła. Tytuł, opis, Open Graph, ikony i dane strukturalne
 * trafiają do <head> z src/data/site.ts, a build dokłada robots.txt i sitemap.xml.
 */
function seoPlugin(siteUrl: string): Plugin {
  const base = `${siteUrl.replace(/\/+$/, '')}/`
  const absolute = (pathname: string) => new URL(pathname, base).toString()

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Electrician',
    '@id': `${base}#firma`,
    name: site.name,
    description: seo.description,
    url: base,
    image: absolute(seo.ogImage),
    logo: absolute('/icon-512.png'),
    telephone: site.phoneLabel,
    email: site.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: seo.locality,
      addressRegion: seo.region,
      addressCountry: 'PL',
    },
    areaServed: seo.areaServed.map((area) => ({ '@type': area.type, name: area.name })),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Usługi elektryczne',
      itemListElement: services.map((service) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: service.title, description: service.description },
      })),
    },
  }

  const head = [
    `<title>${escapeHtml(seo.title)}</title>`,
    `<meta name="description" content="${escapeHtml(seo.description)}" />`,
    `<link rel="canonical" href="${base}" />`,
    `<meta name="robots" content="index, follow, max-image-preview:large" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:locale" content="pl_PL" />`,
    `<meta property="og:site_name" content="${escapeHtml(site.name)}" />`,
    `<meta property="og:title" content="${escapeHtml(seo.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(seo.description)}" />`,
    `<meta property="og:url" content="${base}" />`,
    `<meta property="og:image" content="${absolute(seo.ogImage)}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${escapeHtml(seo.ogImageAlt)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<link rel="icon" href="/favicon.svg" type="image/svg+xml" />`,
    `<link rel="icon" href="/favicon-32.png" sizes="32x32" type="image/png" />`,
    `<link rel="apple-touch-icon" href="/apple-touch-icon.png" />`,
    `<script type="application/ld+json">${JSON.stringify(structuredData).replace(/</g, '\\u003c')}</script>`,
  ].join('\n    ')

  return {
    name: 'volcik-seo',
    transformIndexHtml: {
      order: 'pre',
      handler: (html) => html.replace('<!--seo-->', head),
    },
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n\nSitemap: ${absolute('/sitemap.xml')}\n`,
      })
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: [
          '<?xml version="1.0" encoding="UTF-8"?>',
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
          `  <url><loc>${base}</loc><changefreq>monthly</changefreq><priority>1.0</priority></url>`,
          '</urlset>',
          '',
        ].join('\n'),
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')

  return {
    plugins: [react(), seoPlugin(env.VITE_SITE_URL || seo.siteUrl)],
    resolve: {
      alias: { '@': path.resolve(__dirname, './src') },
    },
  }
})
