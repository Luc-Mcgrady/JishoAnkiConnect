import { addCardRequest } from "./ankiadd"

function addButtons() {
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
}

addButtons()
const word_elements = document.querySelectorAll<HTMLLinkElement>("li.japanese_word > span:nth-child(2) > a:nth-child(1)")
for (const word_element of word_elements) {
    word_element.addEventListener("click", ()=>setTimeout(addButtons, 1000));
}