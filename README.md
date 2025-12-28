# RegexLab

RegexLab is a lightweight, in-browser regex playground built to make testing and understanding regular expressions less painful.

It lets you write a regex, instantly see matches highlighted in real time, and get simple explanations for what different parts of the pattern are doing. Everything runs locally in the browser, no backend, no setup.

---

## Features

- Real-time regex matching and highlighting  
- Plain-language explanations for common regex tokens  
- Built-in library of commonly used regex patterns  
- Shareable links that restore text and pattern state  
- Clean, distraction-free UI  

---

## How It Works

RegexLab uses JavaScript’s `RegExp` engine to test patterns against user-provided text. Matches are highlighted directly in the preview, and a small rule-based system explains the most common regex constructs when they appear in a pattern.

The current text and regex pattern are encoded into the URL, so sharing a link recreates the exact same state for anyone opening it.

---

## Project Structure

```
regexlab/
├── index.html
├── style.css
└── script.js
```

No frameworks, no dependencies.

---

## Running Locally

Clone the repository and open `index.html` in your browser.

```bash
git clone https://github.com/your-username/regexlab.git
cd regexlab
```

---

## Why This Exists

Regex is powerful but often opaque. RegexLab focuses on making feedback immediate and understandable instead of treating regex like a black box.

---

## Future Ideas

- Support for regex flags (`i`, `m`, `g`) via UI toggles  
- More detailed explanations for complex patterns  
- Saving and exporting regex snippets  

---
~ Ritwik Dadarwal
