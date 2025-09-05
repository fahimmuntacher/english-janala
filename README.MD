# Vocabulary Learning Web App

A simple interactive web app to explore vocabulary lessons with meanings, pronunciation, and word details. Built with HTML, CSS (Tailwind), and JavaScript. Supports **Indian English pronunciation** using the Web Speech API.

---

## Features

1. **Lesson List**
   - Fetches lessons from API.
   - Displays all lessons as buttons.
   - Click a lesson to view its vocabulary.

2. **Vocabulary Display**
   - Shows word, meaning, and pronunciation.
   - Handles empty lessons gracefully with a friendly message.

3. **Word Details Modal**
   - Click the info button to open a modal with detailed information about the word.

4. **Pronunciation**
   - Click the volume button to pronounce the word in **Indian English**.
   - Uses the browser's Web Speech API.
   - Supports rate and pitch adjustment.

5. **Loading Spinner**
   - Displays spinner while data is fetching.
   - Hides vocabulary container until loading is complete.

---

## How It Works

1. **Load Lessons**
   - `loadLessons()` fetches all lessons from API.
   - `displayLesson()` dynamically generates lesson buttons.

2. **Load Vocabulary**
   - Clicking a lesson button calls `loadLevelWord(level_no)`.
   - Spinner shows during fetch.
   - After fetch, `displayLevelLesson(words)` displays words.
   - Handles empty lessons with a fallback message.

3. **Word Modal**
   - Clicking info button triggers `displayWordDetail(word)` and opens modal.

4. **Pronunciation**
   - Clicking the volume button triggers `pronounceWord(word)`.
   - Pronounces in Indian English using `utterance.lang = "en-IN"`.

---

## Usage

1. Clone or download the project.
2. Open `index.html` in a modern browser.
3. Click on a lesson button to load words.
4. Use the info button to see word details.
5. Use the volume button to hear Indian English pronunciation.

---

## Important Notes

- The Web Speech API may vary depending on browser support.
- Some browsers may not have a native “Indian English” voice; fallback voices will be used.
- Spinner will only appear if fetch takes noticeable time (for local arrays, you may not see it unless you simulate delay).

---

## Example Code Snippets

**Pronunciation Function**
```js
const pronounceWord = (word) => {
    if (!word) return;
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "en-IN";
    utterance.rate = 0.9;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
};
