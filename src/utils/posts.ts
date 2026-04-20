export const parsePostDate = (dateStr: string) => {
    const [m, d, y] = dateStr.split("/").map(Number);
    return new Date(y, m - 1, d);
};

export const comparePostsByPinnedAndDate = <T extends { date: string; pinned?: boolean }>(
    a: T,
    b: T,
) => {
    const pinDiff = Number(Boolean(b.pinned)) - Number(Boolean(a.pinned));
    if (pinDiff !== 0) return pinDiff;
    return parsePostDate(b.date).getTime() - parsePostDate(a.date).getTime();
};