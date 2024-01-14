import getSlugJson from "./fetch/slug";
import { getSlugCsv } from "./fetch/tsv";

export const addCardRequest = async (slug: string) => {

    const tsv = await getSlugCsv(slug)
    const [kanji, hirigana, meaning] = tsv.split("\t")

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
                    "tags": [
                    
                    ],
                    "picture": []
                }
            }
        })
    }
    )
}