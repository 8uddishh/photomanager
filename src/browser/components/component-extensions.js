export const copyToClipboard = (text) => {
    let $txt = document.createElement("input")
    document.body.appendChild($txt)
    $txt.setAttribute("type", "text")
    $txt.value = text
    $txt.select()
    document.execCommand("copy")
    $txt.remove()
}