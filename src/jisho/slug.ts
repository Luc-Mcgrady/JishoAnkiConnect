import fetch from "node-fetch"

export type JishoWord = any

export default async function getSlugJson(slug: string) : Promise<JishoWord> {
    const resp = await fetch(`https://jisho.org/api/v1/search/words?keyword=${slug}`)
    const full = await resp.json()
    
    return full;
}
