import yargs from "yargs"
import { loadFromArray } from "./jisho/csv"

const slugsConfig = {

}

yargs(process.argv.splice(2))
    .scriptName("jishocsv")
    .command(
        "words [word-list...]",
        "Get csv from words",
        {
            slugs: {
                alias: "word-list",
                type: "array",
                default: [] as string[]
            }
        },
        (argv)=>{
            console.log(argv.slugs)
            loadFromArray(argv.slugs.map(e=>e.toString()))
        },    
    )
    .command({
        command: "urls [url-list]",
        describe: "Get csv from jisho urls",
        handler: (argv)=>{
            console.log("To be implemented", argv["url-list"])
        },
    })
    .help()
    .argv