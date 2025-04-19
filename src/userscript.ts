// ==UserScript==
// @name         Jisho Anki
// @namespace    http://tampermonkey.net/
// @version      2024-01-14
// @description  try to take over the world!
// @author       You
// @match        https://jisho.org/search/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=jisho.org
// @grant        none
// ==/UserScript=

import { addCardRequest } from "./ankiadd"

const elements = document.querySelectorAll(".exact_block>div, .concepts>div")

for (const element of elements) {
    const word = element.querySelector("span.text")?.textContent
    const furigana = element.querySelector("span.furigana")?.textContent

    const button = document.createElement("button")
    button.textContent = "Add to anki"
    button.onclick = (e)=>{addCardRequest(word! + furigana!)}
    element.prepend(button)
}