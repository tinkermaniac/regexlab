const textInput = document.getElementById("textInput");
const regexInput = document.getElementById("regexInput");
const result = document.getElementById("result");
const preview = document.getElementById("preview");
const explanationBox = document.getElementById("explanation");
const library = document.getElementById("library");

const regexLibrary = [
  { name: "Digits", pattern: "\\d+" },
  { name: "Email", pattern: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}" },
  { name: "URL", pattern: "https?:\\/\\/.+" },
  { name: "Phone", pattern: "\\+?\\d{10,13}" },
  { name: "Word", pattern: "\\w+" },
  { name: "Whitespace", pattern: "\\s+" },
  { name: "Strong Password", pattern: "(?=.*[A-Z])(?=.*\\d).{8,}" }
];

function escapeHTML(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function explainRegex(pattern) {
  const rules = [
    { regex: /\\d/, text: "Matches any digit (0–9)" },
    { regex: /\\w/, text: "Matches any word character" },
    { regex: /\./, text: "Matches any character" },
    { regex: /\+/, text: "Matches one or more of the previous token" },
    { regex: /\*/, text: "Matches zero or more of the previous token" },
    { regex: /\?/, text: "Makes the previous token optional" },
    { regex: /\^/, text: "Anchors the match to the start of the string" },
    { regex: /\$/, text: "Anchors the match to the end of the string" },
    { regex: /\[[^\]]+\]/, text: "Matches any character inside brackets" }
  ];

  const explanations = rules
    .filter(rule => rule.regex.test(pattern))
    .map(rule => rule.text);

  return explanations.length
    ? explanations.join(". ") + "."
    : "No explanation available for this pattern yet.";
}

function updateURL(text, pattern) {
  const params = new URLSearchParams();
  if (text) params.set("text", text);
  if (pattern) params.set("pattern", pattern);
  history.replaceState(null, "", "?" + params.toString());
}

function loadFromURL() {
  const params = new URLSearchParams(window.location.search);
  const text = params.get("text");
  const pattern = params.get("pattern");

  if (text) textInput.value = text;
  if (pattern) regexInput.value = pattern;

  if (text || pattern) testRegex();
}

function testRegex() {
  const text = textInput.value;
  const pattern = regexInput.value;

  preview.innerHTML = "";
  explanationBox.textContent = "";

  updateURL(text, pattern);

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

    preview.innerHTML = escapeHTML(text).replace(
      regex,
      match => `<mark>${match}</mark>`
    );
  } catch {
    result.textContent = "⚠️ Invalid regex pattern";
    preview.textContent = escapeHTML(text);
  }
}

function loadLibrary() {
  regexLibrary.forEach(item => {
    const btn = document.createElement("button");
    btn.textContent = item.name;
    btn.onclick = () => {
      regexInput.value = item.pattern;
      testRegex();
    };
    library.appendChild(btn);
  });
}

loadLibrary();
loadFromURL();

textInput.addEventListener("input", testRegex);
regexInput.addEventListener("input", testRegex);
