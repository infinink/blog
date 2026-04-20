import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function parseDate(dateStr: string) {
  const [m, d, y] = dateStr.split('/');
  return new Date(Number(y), Number(m) - 1, Number(d));
}

export async function GET(context: APIContext) {
  const entries = await getCollection('post');
  const sortedEntries = entries.sort(
    (a, b) => parseDate(b.data.date).getTime() - parseDate(a.data.date).getTime(),
  );

  return rss({
    title: "infinInk Blog",
    description: 'Notes from someone still figuring it out — shipped anyway.',
    site: context.url.origin,
    items: sortedEntries.map((entry) => ({
      title: entry.data.title,
      pubDate: parseDate(entry.data.date),
      description: entry.data.frontmatter,
      link: `/posts/${entry.id}`,
      customData: entry.data.tags
        .map((tag) => `<category>${escapeXml(tag)}</category>`)
        .join(''),
    })),
    stylesheet: '/rss/feed.xsl',
    customData: `<language>en-us</language>`,
  });
}