import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import github from '@astrojs/github'; 
import sitemap from '@astrojs/sitemap';
import theme from './dark-theme.json';
import rehypeSlug from 'rehype-slug';
import staticSite from '@astrojs/static-site';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';

adapter: staticSite(),

const prettyCodeOptions = {
    theme,
    onVisitHighlightedLine(node) {
        node?.properties?.className?.push('highlight-line');
    },
    onVisitHighlightedChars(node) {
        node?.properties?.className
            ? node.properties.className.push('highlighted-chars')
            : (node.properties.className = ['highlighted-chars']);
    },
    tokensMap: {},
};

export default defineConfig({
    site: 'https://JaviGr3p.github.io/pricipalj4gr3p/', // 🔹 URL correcta
    base: '/pricipalj4gr3p/',  // 🔹 Asegúrate de que coincide con el nombre del repositorio
    output: 'static',
    adapter: github(), // 🔹 Usa el adaptador correctamente
    integrations: [tailwind(), react(), mdx(), sitemap()],
    markdown: {
        syntaxHighlight: false,
        extendDefaultPlugins: true,
        rehypePlugins: [
            [rehypePrettyCode, prettyCodeOptions],
            rehypeSlug,
            [
                rehypeAutolinkHeadings,
                {
                    properties: {
                        className: ['anchor'],
                    },
                },
            ],
        ],
        shikiConfig: {
            theme,
        },
    },
});
