import { delay } from "../delay.ts"
import getSlugJson from "./slug.ts"

export async function getSlugCsv(slug: string) {
    try {
        const json = await getSlugJson(slug)
        const main = json.data[0]
        
        const senses = main.senses.map(
            sense=>
`${
sense.english_definitions
    .join(" | ")
}<small>(${sense.parts_of_speech})</small>`
            )
            .join("\<br/\>")

        return `${main.slug}\t${main.japanese[0].reading}\t${senses}`
    }
    catch {
        return ""
    }
}

const wait = 700 // Wait in ms

export async function loadFromArray(
    slugs: string[], 
    progress: (amt: number) => void = ()=>{}
) {

    async function attempt(slug: string,max=2,_current=0) : Promise<string> {
        const result = await getSlugCsv(slug)

        if(result) {
            return result
        }
        else if (max > _current) { // Repeat until max repeats
            await delay(wait)
            return await attempt(slug,max,_current+1) 
        }
        else {
            console.error(`${slug} Failed after ${_current} retrys`)
            return "Error"
        }
    }

    const resp = [] as string[]
    let i = 0;
	for (const slug of slugs) {
        resp.push(await attempt(slug))
        progress(++i)
    }

    return resp
}
