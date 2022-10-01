function delay(t = delay_ms) {
    return new Promise(resolve => {
        setTimeout(resolve, t);
    });
}

async function getSlug(slug) {

    try {
        const resp = await fetch(`https://jisho.org/api/v1/search/words?keyword=${slug}`)
        const full = await resp.json()
        const main = full.data[0]
        
        const senses = main.senses.map(sense=>sense.english_definitions.join(" | ").replace(",", "..")).join("<br/>")

        return `${main.slug}, ${main.japanese[0].reading}, ${senses}`
    }
    catch (e) {
        console.error(e)
        return ""
    }
}

async function getUrl(url) {
    const slug = url.match(/https:\/\/jisho\.org\/search\/([%A-F0-9]+)$/)

    if (!slug)
        return

    return await getSlug(slug[1])
}

const wait = 1000 // Wait in ms

async function loadFromBookmarks(urls) {
    const urlarr = urls.split("\n")

    async function attempt(url,max=2,_current=0) {
        await delay(wait)

        const result = await getUrl(url)

        if(result) {
            return result
        }
        else if (max > current) {
            return await attempt(url,max,_current+1) 
        }
        else {
            console.error(`${url} Failed after ${current} retrys`)
        }
    }
    
    let resp = []
	for (const url of urlarr) {
        resp.push(await attempt(url))
    }

    console.log(resp.join("\n"))
}
