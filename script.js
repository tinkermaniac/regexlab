const textInput = document.getElementById("textInput");
const regexInput = document.getElementById("regexInput");
const result = document.getElementById("result");
const preview = document.getElementById("preview");
const explanationBox = document.getElementById("explanation");

function escapeHTML(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function explainRegex(pattern) {
  const explanations = [];

  const rules = [
    { regex: /\\d/, text: "Matches any digit (0–9)" },
    { regex: /\\w/, text: "Matches any word character (letters, digits, underscore)" },
    { regex: /\./, text: "Matches any single character" },
    { regex: /\+/, text: "Matches one or more of the previous token" },
    { regex: /\*/, text: "Matches zero or more of the previous token" },
    { regex: /\?/, text: "Makes the previous token optional" },
    { regex: /\^/, text: "Anchors the match to the start of the string" },
    { regex: /\$/, text: "Anchors the match to the end of the string" },
    { regex: /\[[^\]]+\]/, text: "Matches any character inside the brackets" }
  ];

  rules.forEach(rule => {
    if (rule.regex.test(pattern)) {
      explanations.push(rule.text);
    }
  });

  if (explanations.length === 0) {
    return "No explanation available for this pattern yet.";
  }

  return explanations.join(". ") + ".";
}

function testRegex() {
  const text = textInput.value;
  const pattern = regexInput.value;

  preview.innerHTML = "";
  explanationBox.textContent = "";

  if (!pattern) {
    result.textContent = "Enter a regex pattern.";
    preview.textContent = escapeHTML(text);
    return;
  }

  try {
    const regex = new RegExp(pattern, "g");
    const matches = text.match(regex);

    explanationBox.textContent = explainRegex(pattern);

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
    result.textContent = "⚠️ Invalid regex pattern";
    preview.textContent = escapeHTML(text);
    explanationBox.textContent = "";
  }
}

textInput.addEventListener("input", testRegex);
regexInput.addEventListener("input", testRegex);
