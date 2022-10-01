import yargs from "yargs"
import { loadFromArray } from "./jisho/csv"

yargs(process.argv.splice(2))
    .scriptName("jishocsv")
    .array("slugs")
    .alias("slugs", "word-list")
    .alias("slugs", "url-list")
    .command({
        command: "words [word-list...]",
        describe: "Get csv from words",
        handler: (argv)=>{
            console.log(argv.slugs)
            loadFromArray(argv.slugs as string[])
        },
    })
    .command({
        command: "urls [url-list]",
        describe: "Get csv from jisho urls",
        handler: (argv)=>{
            console.log("To be implemented", argv["url-list"])
        },
    })
    .help()
    .argv
