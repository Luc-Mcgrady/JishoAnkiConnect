import { delay } from "../delay"
import getSlugJson from "./slug"

export async function getSlugCsv(slug: string) {
    try {
        const json = await getSlugJson(slug)
        const main = json.data[0]
        
        const senses = main.senses.map(
            sense=>
            `${
            sense.english_definitions
                .join(" | ")
                .replace(",", "..") 
            }
            (<small>${sense.parts_of_speech}</small>)`
            )
            .join("<br/>")

        return `${main.slug},${main.japanese[0].reading},${senses}`
    }
    catch (e) {
        console.error(e)
        return ""
    }
}

const wait = 1000 // Wait in ms

export async function loadFromArray(
    slugs: string[], 
    progress: (amt: number) => void = ()=>{}
) {

    async function attempt(slug: string,max=2,_current=0) {
        await delay(wait)

        const result = await getSlugCsv(slug)

        if(result) {
            return result
        }
        else if (max > _current) { // Repeat until max repeats
            return await attempt(slug,max,_current+1) 
        }
        else {
            console.error(`${slug} Failed after ${_current} retrys`)
        }
    }

    let resp = [] as string[]
    let i = 0;
	for (const slug of slugs) {
        resp.push(await attempt(slug))
        progress(++i)
    }
    
    return resp
}
