const textInput = document.getElementById("textInput");
const regexInput = document.getElementById("regexInput");
const result = document.getElementById("result");

function testRegex() {
    const text = textInput.value;
    const pattern = regexInput.value;

    if (!pattern) {
        result.textContent = "Enter a regex pattern.";
        return;
    }

    try {
        const regex = new RegExp(pattern);
        const match = regex.test(text);

        result.textContent = match
        ? "✅ Match found"
        : "❌ No match";
    } catch (err) {
        result.textContent = "⚠️ Invalid regex pattern";
   }
}

textInput.addEventListener("input", testRegex);
regexInput.addEventListener("input", testRegex);