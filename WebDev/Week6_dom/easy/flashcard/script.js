let currentIndex = 0;
let score = 0;
let selectedCards = [];



const topics = {
  "Math": [
    { question: "What is 2 + 2?", answer: "4" },
    { question: "What is 2 + 1?", answer: "3" },
    { question: "What is 2 + 3?", answer: "5" },
    { question: "What is 2 + 4?", answer: "6" }
  ],
  "animals": [
    { question: "What barks", answer: "dog" },
    { question: "What mew's", answer: "cat" },
    { question: "What bites", answer: "snake" },
    { question: "What growls", answer: "lion" }
  ],
  "countries": [
    { question: "What is largest country", answer: "china" },
    { question: "What is the richest country", answer: "usa" },
    { question: "What is the deepest place ?", answer: "marina trench" },
    { question: "What is highest peak?", answer: "mount everest" }
  ]
}




// Populate the dropdown with topic names
const select = document.getElementById("topic-select");
Object.keys(topics).forEach(topic => {
  let option=document.createElement("option");
  option.value=topic;
  option.textContent=topic;
  // set its value and text to topic
  select.appendChild(option);
  // append it to select
});


function startQuiz() {
  let topic = document.getElementById("topic-select").value;
  let count = parseInt(document.getElementById("question-count").value);

  selectedCards = topics[topic].slice(0, count);
  currentIndex = 0;
  score = 0;

  // hide setup screen
  document.getElementById("setup-screen").style.display = "none";
  // show quiz screen
  document.getElementById("quiz-screen").style.display = "block";

  showCard();
}

function showCard() {
  let card = selectedCards[currentIndex];

  document.getElementById("question").textContent = card.question;
  document.getElementById("answer").textContent = card.answer;

  // hide the answer by default
  document.getElementById("answer").style.display = "none";
}

function flipCard() {
  document.getElementById("answer").style.display = "block";

  // hide flip button, show Got it / Missed buttons
  document.getElementById("flip-btn").style.display = "none";
  document.getElementById("action-btns").style.display = "block";
}

function nextCard(x){
    if(x){
        score+=1;
    }
    currentIndex+=1;
    if (currentIndex==selectedCards.length){
        document.getElementById("quiz-screen").style.display = "none";
        document.getElementById("result-screen").style.display = "block";
        document.getElementById("result-text").textContent=`You scored ${score} out of 4`;
    }
    else{
        showCard();
        document.getElementById("flip-btn").style.display = "block";
        document.getElementById("action-btns").style.display = "none";
        document.getElementById("answer").style.display = "none";
    }
}


function restartQuiz(){
    document.getElementById("result-screen").style.display = "none";
    score=0;
    currentIndex=0;
    document.getElementById("setup-screen").style.display = "block";
}