import { getCollection } from 'astro:content';
import { comparePostsByPinnedAndDate } from '@/utils/posts';

export async function GET() {
  const entries = await getCollection('post');
  const sortedEntries = entries.sort((a, b) =>
    comparePostsByPinnedAndDate(a.data, b.data),
  );

  const searchIndex = sortedEntries.map((entry) => ({
    title: entry.data.title,
    date: entry.data.date, 
    frontmatter: entry.data.frontmatter,
    tags: entry.data.tags,
    link: `/posts/${entry.id}`,
  }));

  return new Response(JSON.stringify(searchIndex), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
