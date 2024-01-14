import yargs from "yargs"
import { loadFromArray } from "./fetch/tsv"
import getSlugJson, { extractSlug } from "./fetch/slug"
import { addCardRequest } from "./ankiadd";
import fs from "fs/promises"
import Progress from "progress"

async function GetWords(slugs: string[], outfile: string) {
    slugs = slugs.map(extractSlug)

    console.log(slugs)

    const bar = new Progress(":bar", slugs.length)
    
    const data = await loadFromArray(slugs.map(e=>e.toString()), (i: number)=>bar.tick(i))

    const csv = data.join('\n')

    if (outfile) {
        const encoder = new TextEncoder
        await fs.writeFile(outfile, encoder.encode(csv))
    }
    else {
        console.log(csv)
    }
}

yargs(process.argv)
    .scriptName("jishocsv")
    .option("o", {
        alias: "out",
        type: "string",
        describe: "The file to output to. If left blank logs at end"
    })
    .command(
        "words <word-list...>",
        "Get csv from words or urls",
        {
            slugs: {
                alias: "word-list",
                type: "array",
                default: [] as string[]
            }
        },
        (argv)=>{
            GetWords(argv.slugs, argv.o as string)
        },    
    )
    .command(
        "word <word>",
        "Get and add a word to anki using ankiconnect",
        {
            slugs: {
                alias: "word",
                type: "string",
                default: ""
            }
        },
        ({word}) => {
            const json = addCardRequest(word as string)
        }
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
            const filestring = new TextDecoder().decode(file)
            const wordMatches = filestring.matchAll(/(.+?)(?:[ ]|$)/gm) // Splits the words based on space

            const words = [...wordMatches].map(a=>a[1])
            console.log({file, filestring, wordMatches, words})

            GetWords(words, argv.o as string)
        }
    )
    .demandCommand()
    .showHelpOnFail(true)
    .help()
    .parse()