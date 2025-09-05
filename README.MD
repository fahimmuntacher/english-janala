# Vocabulary Learning Web App

An interactive web app to explore vocabulary lessons with meanings, pronunciation, synonyms, and word details. Built with **HTML, Tailwind CSS, and JavaScript**. Supports **English pronunciation** using the Web Speech API.

---

## Features

1. **Lesson List**
   - Fetches all lessons from API.
   - Displays lessons as buttons dynamically.
   - Click a lesson to load its vocabulary.

2. **Vocabulary Display**
   - Shows each word with meaning and pronunciation.
   - Handles empty lessons gracefully with a friendly message.
   - Dynamically creates cards for each word.

3. **Word Details Modal**
   - Click the info button to open a modal showing detailed information.
   - Displays:
     - Word
     - Pronunciation
     - Meaning
     - Example sentence
     - Synonyms

4. **Pronunciation**
   - Click the volume button to pronounce the word in English (`en-US` accent).
   - Uses the browser's **Web Speech API**.

5. **Loading Spinner**
   - Shows spinner while data is being fetched.
   - Hides vocabulary container until fetch completes.

6. **Active Lesson Highlight**
   - The clicked lesson button is highlighted.
   - Previous active lesson button is deactivated.

---

## How It Works

1. **Load Lessons**
   - `loadLessons()` fetches all lessons from API.
   - `displayLesson(lessons)` generates lesson buttons dynamically.

2. **Load Level Words**
   - Clicking a lesson button calls `loadLevelWord(id)`.
   - Spinner shows while fetching words.
   - After fetch, `displayLevelLesson(words)` shows words.
   - Highlights the active lesson button.

3. **Word Details Modal**
   - Clicking the info button calls `loadWordDetail(id)`.
   - Fetches detailed info for the word.
   - Opens modal with the word details and synonyms.

4. **Pronunciation**
   - Clicking the volume button calls `pronounceWord(word)`.
   - Uses Web Speech API to speak the word in English.

---


## Example Code Snippets

**Load Lessons**
```js
const loadLessons = () => {
    fetch('https://openapi.programming-hero.com/api/levels/all')
        .then(res => res.json())
        .then(json => displayLesson(json.data));
};
loadLessons();
