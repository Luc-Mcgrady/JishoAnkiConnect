import fetch from "node-fetch"

export type JishoWord = any

export default async function getSlugJson(slug: string) : Promise<JishoWord> {
    const resp = await fetch(`https://jisho.org/api/v1/search/words?keyword=${slug}`)
    const full = await resp.json()
    
    return full;
}

export function extractSlug(url: string) {
    const slug = url.match(/https:\/\/jisho\.org\/search\/([%A-F0-9]+)$/)

    if (!slug)
        return url // IF it fails to extract anything return the input

    return slug[1]
}