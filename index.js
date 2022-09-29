function delay(t = delay_ms) {
    return new Promise(resolve => {
        setTimeout(resolve, t);
    });
}

async function getSlug(slug, i) {
    
    await delay(i * 1000)

    try {
        const resp = await fetch(`https://jisho.org/api/v1/search/words?keyword=${slug}`)
        const full = await resp.json()
        const main = full.data[0]
        
        const senses = main.senses.map(sense=>sense.english_definitions.join(" | ").replace(",", "")).join("\n")

        return `${main.slug}, ${main.japanese[0].reading}, ${senses}`
    }
    catch (e) {
        console.error(e)
        return ""
    }
}

async function getUrl(url, i) {
    const slug = url.match(/https:\/\/jisho\.org\/search\/([%A-F0-9]+)$/)

    if (!slug)
        return

    return await getSlug(slug[1], i)
}


async function loadFromBookmarks(urls) {
    const slugs = urls.split("\n")

	const requests = slugs.map(getSlug)
    const resp = await Promise.all(requests)

    console.log(resp.join("\n"))
}
