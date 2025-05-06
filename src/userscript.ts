import { addCardRequest } from "./ankiadd"

const elements = document.querySelectorAll(".exact_block>div, .concepts>div")

for (const element of elements) {
    const word = element.querySelector("span.text")?.textContent?.replace(/\s+/g, "")
    const furigana = element.querySelector("span.furigana")?.textContent?.replace(/\s+/g, "")
    let sentence = document.querySelector<HTMLInputElement>("#keyword")?.value

    if (sentence == word) {
        sentence = undefined
    }
    else if (sentence && word){
        sentence = sentence.replace(word, word.bold());
    }

    const button = document.createElement("button")
    button.textContent = "Add to anki"
    button.onclick = (e)=>{addCardRequest(word! + furigana!, sentence)}
    element.prepend(button)
}