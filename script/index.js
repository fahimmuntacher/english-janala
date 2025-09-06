const loadLessons = ()=>{
    fetch('https://openapi.programming-hero.com/api/levels/all')
    .then((res) => res.json())
    .then((json) => displayLesson(json.data));
}
loadLessons()

const loadLevelWord = (id) =>{
    spinner(true)
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
    .then((words) => words.json())
    .then((data) => {
        removeActive();
        const clickBtn = document.getElementById(`level-btn-${id}`);
        clickBtn.classList.add("activeBtn");
        displayLevelLesson(data.data)
    })
}



const removeActive = () =>{
    const lessonButtons = document.querySelectorAll(".lesson-btn");
    lessonButtons.forEach(btn=> btn.classList.remove("activeBtn"))
}

const synonyms = (syn) => {
    const synonymsEle = syn.map((el) => `<span class = "btn text-xl p-5">${el}</span>`);
    return (synonymsEle.join(' '));
}

const loadWordDetail = async (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`;
    console.log(url)
    const detail = await fetch (url);
    const wordDetail = await detail.json();
    console.log(wordDetail)
    displayWordDetail(wordDetail.data);  
}

const displayWordDetail = (word) => {
    console.log(word);
    const detailContainer = document.querySelector(".detail-container");
    detailContainer.innerHTML = `
    <div class="mx-auto border-2 border-gray-400 shadow-xl p-10 space-y-7">
        <h1 class="font-bold text-4xl">${word.word} <span>(<i class="fa-solid fa-microphone-lines"></i> : ${word.pronunciation})</span></h1>
        <div class="space-y-2">
            <p class="font-semibold text-xl">Meaning</p>
            <p class="font-semibold text-2xl">${word.meaning}</p>
        </div>
        <div class="space-y-2">
            <h2 class="font-semibold text-2xl">Example</h2>
            <p class="text-2xl">${word.sentence}</p>
        </div>
        <div class="space-y-2">
            <h2 class="text-xl font-bold">সমার্থক শব্দগুলো</h2>
            <div class= "flex flex-wrap gap-2">${synonyms(word.synonyms)}</div>
            
        </div>
     </div>`
    document.getElementById("word_modal").showModal();

}

const spinner = (status) =>{
    if(status == true){
        document.getElementById('spinner').classList.remove('hidden')
        document.getElementById('words-container').classList.add('hidden')
    }else{
        document.getElementById('words-container').classList.remove('hidden')
        document.getElementById('spinner').classList.add('hidden')
    }
} 

const displayLevelLesson = (words) =>{
    const wordsContainer = document.getElementById('words-container'); 
    wordsContainer.innerHTML = "";
    document.getElementById('default-message').innerHTML = ''

    if(words.length == 0){
        wordsContainer.innerHTML = `
        <div class="text-center space-y-5 col-span-full">
                <div>
                    <i class="fa-solid fa-triangle-exclamation text-8xl text-gray-500"></i>
                </div>
                <p class="text-gray-400 text-xl">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                <h1 class="text-3xl font-semibold">নেক্সট Lesson এ যান</h1>
            </div>`;
            spinner(false);
        return;
    }
    words.forEach(word =>{
        const wordDiv = document.createElement("div");
        wordDiv.innerHTML = `
         <div class="bg-white rounded-2xl shadow-sm text-center py-12 px-8 flex flex-col justify-between gap-4 h-full">
                    <h1 class="text-2xl font-bold">${word.word ? word.word : "শব্দ পাওয়া যায়নি!"}</h1>
                    <p class="font-semibold">Meaning /Pronounciation</p>
                    <div class="font-medium text-3xl hind-siliguri">
                        "${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি!"} / ${word.pronunciation ? word.pronunciation : "উচ্চারণ পাওয়া যায়নি!"}"
                    </div>
                    <div class="flex justify-between items-center mt-5">
                
                        <button onclick="loadWordDetail(${word.id})" class="p-3 bg-sky-100 rounded-xl cursor-pointer hover:bg-sky-300"><i class="fa-solid fa-circle-info text-3xl"></i></button>
                        <button  onclick="pronounceWord('${word.word}')"  class="p-3 bg-sky-100 rounded-xl cursor-pointer hover:bg-sky-300"><i class="fa-solid fa-volume-high text-3xl"></i></button>
                    </div>
        </div>
        `;
        
        wordsContainer.append(wordDiv)
    })
    spinner(false)
}

const displayLesson = (lessons) =>{
    
    const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML = '';
    

    for(let lesson of lessons){ 
        const lessonDiv = document.createElement("div");
        lessonDiv.innerHTML = `
            <button id ="level-btn-${lesson.level_no}" onclick = "loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary text-xl lesson-btn">
            <i class="fa-solid fa-book-open"></i> Lesson - ${ lesson.level_no}
            </button>
        `;
       
        levelContainer.append(lessonDiv); 
        
    }
    
}

const pronounceWord = (word) => {
    if (!word) return;
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "en-US";
    window.speechSynthesis.speak(utterance);
};

document.getElementById("btn-search").addEventListener("click", () => {
    const searchValue = document.getElementById("input-search").value.trim().toLowerCase();
    

    fetch("https://openapi.programming-hero.com/api/words/all")
    .then(res => res.json())
    .then(data => {
        
        const allWords = data.data;
        
        const filterWords = allWords.filter(word => word.word.toLowerCase().includes(searchValue));
        const wordsContainer = document.getElementById('words-container');
        wordsContainer.innerHTML = " ";
        if(filterWords.length === 0){
            
            wordsContainer.innerHTML = `
            <div class="text-center space-y-5 col-span-full">
                <div>
                    <i class="fa-solid fa-triangle-exclamation text-8xl text-gray-500"></i>
                </div>
                <p class="text-gray-400 text-xl">এই word এখনো যুক্ত করা হয়নি।</p>
                <h1 class="text-3xl font-semibold">অন্য Words খুঁজুন!</h1>
            </div>`;
         spinner(false);
         return;
        }
        displayLevelLesson(filterWords);
        
        
        spinner(false);
    })
    
})
