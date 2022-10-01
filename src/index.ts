import yargs from "yargs"
import { loadFromArray } from "./jisho/csv"
import { extractSlug } from "./jisho/slug"
import fs from "fs/promises"

function GetWords(slugs: string[]) {
    slugs = slugs.map(extractSlug)

    console.log(slugs)

    loadFromArray(slugs.map(e=>e.toString()))
}

yargs(process.argv.splice(2))
    .scriptName("jishocsv")
    .command(
        "$0 <word-list...>",
        "Get csv from words or urls",
        {
            slugs: {
                alias: "word-list",
                type: "array",
                default: [] as string[]
            }
        },
        (argv)=>{
            GetWords(argv.slugs)
        },    
    )
    .command(
        "file <filename>",
        "Get csv from words or urls locaited in a file",
        {
            file: {
                alias: "filename",
                type: "string",
                required: true
            }
        },
        async (argv)=>{
            const file = await fs.readFile(argv.file)
            const filestring = file.toString()
            const wordMatches = filestring.matchAll(/(.+?)(?:[ ]|$)/gm) // Splits the words based on space

            const words = [...wordMatches].map(a=>a[1])
            console.log({file, filestring, wordMatches, words})
            GetWords(words)
        }
    )
    .help()
    .argv