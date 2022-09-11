const example = 
`
https://jisho.org/search/%E9%AD%85%E5%8A%9B
https://jisho.org/search/%E4%B8%8D%E6%80%9D%E8%AD%B0
https://jisho.org/search/%E5%85%B1%E6%84%9F
https://jisho.org/search/%E6%B8%A9%E3%81%8B%E3%81%95
`

const urls = example.split("\n").filter(a=>a!="")

async function getUrl(url) {
    const slug = url.match(/https:\/\/jisho\.org\/search\/([%A-F0-9]+)$/)

    if (!slug)
        return

    const resp = await fetch(`https://jisho.org/api/v1/search/words?keyword=${slug}`)
    const full = await resp.json()
    const main = full.data[0]
    return `${main.slug}, ${main.senses[0].english_definitions.join(", ")}`
}

const requests = urls

async function main() {
    const resp = requests.map(req)

    console.log(resp.join("\n"))
}

main()