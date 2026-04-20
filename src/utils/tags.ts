export const normalizeTag = (tag: string) => tag.trim().toLowerCase();

export const slugifyTag = (tag: string) =>
    normalizeTag(tag)
        .replace(/[^\p{L}\p{N}\s-]/gu, "")
        .replace(/\s+/g, "-");