import yargs from "yargs"

yargs(process.argv.splice(2))
    .scriptName("jishocsv")
    .array("word-list")
    .array("url-list")
    .command({
        command: "words [word-list]",
        describe: "Get csv from words",
        handler: (argv)=>{
            console.log("To be implemented", argv["word-list"])
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
