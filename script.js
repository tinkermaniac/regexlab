const textInput = document.getElementById("textInput");
const regexInput = document.getElementById("regexInput");
const result = document.getElementById("result");
const preview = document.getElementById("preview");

function escapeHTML(str) {
    return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function testRegex() {
    const text = textInput.value;
    const pattern = regexInput.value;

    preview.innerHTML = "";

    if (!pattern) {
        result.textContent = "Enter a regex pattern.";
        preview.etxtContent = escapeHTML(text);
        return;
    }

    try {
        const regex = new RegExp(pattern, "g");
        const matches = text.match(regex);

        if (!matches) {
            result.textContent = "❌ No match";
            preview.textContent = escapeHTML(text);
            return;
        }

        result.textContent = `✅ ${matches.length} match(es) found`;

        const highlighted = escapeHTML(text).replace(
        regex,
        (match) => `<mark>${match}</mark>`
    );

    preview.innerHTML = highlighted;

} catch (err) {
    result.textContent = "⚠️Invalid regex pattern";
    preview.textContent = escapeHTML(text);
}
}

textInput.addEventListener("input", testRegex);
regexInput.addEventListener("input", testRegex);