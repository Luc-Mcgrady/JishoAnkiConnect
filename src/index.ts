import yargs, { describe } from "yargs"
import { loadFromArray } from "./jisho/csv"
import { extractSlug } from "./jisho/slug"
import fs from "fs/promises"
import cliProgress from "cli-progress"

async function GetWords(slugs: string[], outfile: string) {
    slugs = slugs.map(extractSlug)

    console.log(slugs)

    const bar = new cliProgress.Bar({}, cliProgress.Presets.shades_classic)
    
    bar.start(slugs.length, 0)
    const data = await loadFromArray(slugs.map(e=>e.toString()), (i)=>bar.update(i))
    bar.stop()

    if (outfile) {
        await fs.writeFile(outfile, data)
    }
    else {
        console.log(data)
    }
}

yargs(process.argv.splice(2))
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
            GetWords(argv.slugs, argv.o as any)
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

            GetWords(words, argv.o)
        }
    )
    .demandCommand()
    .showHelpOnFail(true)
    .help()
    .argv