import yargs from "yargs"
import { loadFromArray } from "./jisho/csv"
import { extractSlug } from "./jisho/slug"

yargs(process.argv.splice(2))
    .scriptName("jishocsv")
    .command(
        "$0 [word-list...]",
        "Get csv from words",
        {
            slugs: {
                alias: "word-list",
                type: "array",
                default: [] as string[]
            }
        },
        (argv)=>{
            const slugs = argv.slugs.map(extractSlug).filter(e=>!!e)

            console.log(slugs)

            loadFromArray(argv.slugs.map(e=>e.toString()))
        },    
    )
    .help()
    .argv