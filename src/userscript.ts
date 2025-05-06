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