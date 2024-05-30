import getSlugJson from "./fetch/slug.ts";
import { formatSenses } from "./fetch/tsv.ts";

export const addCardRequest = async (slug: string) => {

    const resp = await getSlugJson(slug) // Todo pass this as argument rather than slug
    const top = resp.data[0];
    const kanji = top.japanese[0].word
    const meaning = formatSenses(top)
    const hirigana = top.japanese[0].reading; 

    const jlpt = top.jlpt.map(rank=>rank.replace("-", "::"))

    return await fetch("http://127.0.0.1:8765",
    {
        method: "post",
        body: JSON.stringify({
            "action": "guiAddCards",
            "version": 6,
            "params": {
                "note": {
                    "deckName": "Default",
                    "modelName": "Japaneese word",
                    "fields": {
                        "Kanji": kanji,
                        "Hirigana": hirigana,
                        "Meaning": meaning
                    },
                    "tags": jlpt,
                    "picture": []
                }
            }
        })
    }
    )
}