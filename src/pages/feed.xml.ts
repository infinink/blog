import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { comparePostsByPinnedAndDate, parsePostDate } from '@/utils/posts';

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET(context: APIContext) {
  const entries = await getCollection('post');
  const sortedEntries = entries.sort((a, b) =>
    comparePostsByPinnedAndDate(a.data, b.data),
  );

  return rss({
    title: "infinInk Blog",
    description: 'Notes from someone still figuring it out — shipped anyway.',
    site: context.url.origin,
    items: sortedEntries.map((entry) => ({
      title: entry.data.title,
      pubDate: parsePostDate(entry.data.date),
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