export function delay(t: number) {
    return new Promise(resolve => {
        setTimeout(resolve, t);
    });
}

export async function getSlugJson(slug: string) {
    const resp = await fetch(`https://jisho.org/api/v1/search/words?keyword=${slug}`)
    const full = await resp.json()
    
    return full;
}

export async function getSlugCsv(slug: string) {
    try {
        const json = await getSlugJson(slug)
        const main = json.data[0]
        
        const senses = main.senses.map(sense=>sense.english_definitions.join(" | ").replace(",", "..")).join("<br/>")

        return `${main.slug}, ${main.japanese[0].reading}, ${senses}`
    }
    catch (e) {
        console.error(e)
        return ""
    }
}

export async function getUrl(url: string) {
    const slug = url.match(/https:\/\/jisho\.org\/search\/([%A-F0-9]+)$/)

    if (!slug)
        return

    return await getSlugCsv(slug[1])
}

const wait = 1000 // Wait in ms

export async function loadFromBookmarks(urls: string) {
    const urlarr = urls.split("\n")

    async function attempt(url: string,max=2,_current=0) {
        await delay(wait)

        const result = await getUrl(url)

        if(result) {
            return result
        }
        else if (max > _current) {
            return await attempt(url,max,_current+1) 
        }
        else {
            console.error(`${url} Failed after ${_current} retrys`)
        }
    }
    
    let resp = [] as string[]
	for (const url of urlarr) {
        resp.push(await attempt(url))
    }

    console.log(resp.join("\n"))
}
