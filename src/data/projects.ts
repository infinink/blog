export interface Project {
    title: string;
    description: string;
    link: string;
    techStack: string[];
}

export const projects: Project[] = [
    {
        title: "PCSO Lotto API",
        description:
            "A Node.js REST API that provides real-time PCSO lotto results via web scraping, with Redis-based caching and locking to ensure data freshness and prevent duplicate requests.",
        link: "https://github.com/infininkk/pcso-lotto-api",
        techStack: ["Node.js", "Cheerio", "Redis"],
    },
    {
        title: "U Do Note",
        description:
            "Flutter note-taking app integrating Spaced Repetition, Leitner, Feynman techniques, and etc with OCR via Google ML Kit and AI summarization using OpenAI.",
        link: "https://github.com/infininkk/u-do-note",
        techStack: ["Flutter", "Firebase", "OpenAI"],
    },
];