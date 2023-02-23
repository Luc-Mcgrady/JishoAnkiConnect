import yargs from "https://deno.land/x/yargs@v17.7.0-deno/deno.ts"
import { loadFromArray } from "./fetch/tsv.ts"
import { extractSlug } from "./fetch/slug.ts"
import ProgressBar from "https://deno.land/x/progress@v1.3.6/mod.ts"
import { addCardRequest } from "./ankiadd.ts";

async function GetWords(slugs: string[], outfile: string) {
    slugs = slugs.map(extractSlug)

    console.log(slugs)

    const bar = new ProgressBar({title: "fetched", total: slugs.length})
    
    const data = await loadFromArray(slugs.map(e=>e.toString()), (i: number)=>bar.render(i))

    const csv = data.join('\n')

    if (outfile) {
        const encoder = new TextEncoder
        await Deno.writeFile(outfile, encoder.encode(csv))
    }
    else {
        console.log(csv)
    }
}

yargs(Deno.args)
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
        (argv: { slugs: string[]; o: string; })=>{
            GetWords(argv.slugs, argv.o)
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
        ({word}: {word: string}) => {
             addCardRequest(word)
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
        async (argv: { file: string|URL; o: string })=>{
            const file = await Deno.readFile(argv.file)
            const filestring = file.toString()
            const wordMatches = filestring.matchAll(/(.+?)(?:[ ]|$)/gm) // Splits the words based on space

            const words = [...wordMatches].map(a=>a[1])
            console.log({file, filestring, wordMatches, words})

            GetWords(words, argv.o)
        }
    )
    .demandCommand()
    .showHelpOnFail(true)
    .help()
    .parse()