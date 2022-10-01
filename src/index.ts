import yargs from "yargs"

yargs(process.argv.splice(2))
    .scriptName("JishoToCsv")
    .command("words", "Get csv from words", 
    (yargs)=>{
        return yargs.option("words", {
            alias: "words",
            type: "array",
            describe: "A list of words to get the csv for"
        })
    },
    (argv)=>{
        console.log("To be implemented", argv.words)
    })
    .command("urls", "Get csv from jisho urls",
    (yargs)=>{
        return yargs.option("urls", {
            alias: "urls",
            type: "array",
            describe: "A list of urls to get the csv for"
        })
    },
    (argv)=>{
        console.log("To be implemented", argv.urls)
    })
    
    .argv
    