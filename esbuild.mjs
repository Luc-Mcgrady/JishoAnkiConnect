import esbuild from "esbuild"

await esbuild.build({
    sourceRoot: "src",
    entryPoints: ["src/index.ts"],
    outfile: "dist/cli.js",
    bundle: true,
    platform: "node",
})

await esbuild.build({
    sourceRoot: "src",
    entryPoints: ["src/userscript.ts"],
    outfile: "dist/userscript.js",
    bundle: true,
    platform: "browser",
    banner: {
        js: `// ==UserScript==
// @name         Jisho -> Anki
// @namespace    http://tampermonkey.net/
// @version      2024-01-14
// @description  Add Jisho.org words to Anki from a button on the site using ankiconnect.
// @author       Luc McGrady
// @match        https://jisho.org/search/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=jisho.org
// @grant        none
// ==/UserScript==`}
})