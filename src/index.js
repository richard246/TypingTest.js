
import { initializeApp } from 'firebase/app'
import {
  getFirestore, collection,query,
  onSnapshot,orderBy,addDoc,limit,
} from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyBOhILaL3-As43cwjV2bUDwyECuTrgujWk",
  authDomain: "typing-dec6b.firebaseapp.com",
  projectId: "typing-dec6b",
  storageBucket: "typing-dec6b.appspot.com",
  messagingSenderId: "124685184327",
  appId: "1:124685184327:web:2cd561a43954b33d79b062"
};
// init firebase
initializeApp(firebaseConfig)

// init services
const db = getFirestore()

// collection ref
const colRef = collection(db, 'users')
const q = query(colRef, orderBy("WPM", "desc"), limit(5))
// get collection data

onSnapshot(q, (snapshot) =>{
  let users =[]
  snapshot.docs.forEach((doc) =>{
    users.push({ ...doc.data(), id: doc.id})
  })
  console.log(users)
  document.getElementById('first').innerHTML = users[0].Name;
  document.getElementById('second').innerHTML = users[1].Name;
  document.getElementById('third').innerHTML = users[2].Name;
  document.getElementById('fourth').innerHTML = users[3].Name;
  document.getElementById('fifth').innerHTML = users[4].Name;
  document.getElementById('firstWPM').innerHTML = (users[0].WPM+" WPM");
  document.getElementById('secondWPM').innerHTML = (users[1].WPM+" wpm");
  document.getElementById('thirdWPM').innerHTML = (users[2].WPM+" wpm");
  document.getElementById('fourthWPM').innerHTML = (users[3].WPM+" wpm");
  document.getElementById('fifthWPM').innerHTML = (users[4].WPM+" wpm");
  })
 
// typing test logic
const overlay = document.getElementById('overlay')

const Display = document.getElementById('quoteDisplay')
const Input = document.getElementById('text')
const timer = document.getElementById('timer')
const resultsScreen = document.querySelector('.results')
const startScreen =document.querySelector('.beginTest')
const leaderBoard =document.querySelector('.leaderBoard')


var num;
var timeInSeconds;
var typedChar=0;
var word=0;
var incorrect=0;
var Name;
let i = 90;




Input.addEventListener('input', () => {
  const arrayQuote = Display.querySelectorAll('span')
  const arrayValue = Input.value.split('')

  let correct = true
  arrayQuote.forEach((characterSpan, index) => {
    const character = arrayValue[index]
    if (character == null) {
      characterSpan.classList.remove('correct')
      characterSpan.classList.remove('incorrect')
      correct = false
    } else if (character === characterSpan.innerText) {
      typedChar+=1
      characterSpan.classList.add('correct')
      characterSpan.classList.remove('incorrect')
    } else if(character != characterSpan.innerText){
      characterSpan.classList.remove('correct')
      characterSpan.classList.add('incorrect')
      correct = false
      typedChar+=1
      incorrect+=1;
      console.log("number of incorrect: "+incorrect)
    }
  })

  if (correct){
    stopTimer()
    openResultsScreen()
  } 
})
function getRandomNum(){
  num = Math.floor(Math.random() * (1642 - 1) + 1)
}

function getRandomQuote() {
  getRandomNum();
  console.log(num)
  return fetch('https://type.fit/api/quotes')
    .then(response => response.json())
    .then(data => data[num].text)
    
}


async function renderNewQuote() {

  const quote =   await getRandomQuote();
  console.log(quote)
  Display.innerHTML =''
  quote.split('').forEach(character => {
    const characterSpan = document.createElement('span')
    characterSpan.innerText = character
    word+=1
    Display.appendChild(characterSpan)
  })
  Input.value = null
 
}

//stars timer
let startTime
function startTimer() {
  timer.innerText = 0
  startTime = new Date()
  timeInSeconds = setInterval(() => {
    timer.innerText = getTimerTime()
  }, 1000)
}
//gets time
function getTimerTime() {
  return Math.floor((new Date() - startTime) / 1000)
}
//stops timer and displays results
function stopTimer(){
  clearInterval(timeInSeconds)
  console.log(parseInt(timer.innerHTML))
  const time = parseInt(timer.innerHTML)
const wpm =Math.floor((word/5)/(time/60));
const acc = Math.floor((1-(incorrect/typedChar))*100)
resultBorder.innerText = ('WPM: '+ wpm)
if(acc<0){
  resultBorder2.innerText =('Accuracy: '+1+'%')
}
else{
resultBorder2.innerText =('Accuracy: '+acc+'%')
}


if (!document.getElementById("userName").innerHTML == "") {
  const uname = document.getElementById("userName").innerHTML
  console.log("yo");
     addDoc(colRef,{
      Name: uname,
      WPM: wpm,
    })
     
      }
  }

//opens results screen
function openResultsScreen(){
  openStart(resultsScreen)
  console.log("2");
}
//restarts the test from results screen
  document.getElementById('close').onclick = function(){
     typedChar=0
     word=0
     incorrect=0
    if (document.getElementById('results') == null) return
    resultsScreen.classList.remove('working')
    overlay.classList.remove('working')
    Input.focus();
  startTimer()
renderNewQuote()
console.log("1");
   
  }
  //from results to title screen
  document.getElementById('backToTitle').onclick = function(){
   
    if (document.getElementById('results') == null) return
    resultsScreen.classList.remove('working')
    overlay.classList.add('working')
    startScreen.classList.add('working')
 }
  //from leaderboard to title screen
  document.getElementById('Back').onclick = function(){
   
   if (document.getElementById('leaderBoard') == null) return
   leaderBoard.classList.remove('working')
   overlay.classList.add('working')
   startScreen.classList.add('working')
  
}
 
 
 //from start screen to leaderboard
 document.getElementById('leaderBoardB').onclick  = function(){

  startScreen.classList.remove('working')
leaderBoard.classList.add('working')
overlay.classList.add('working')


}
  
//opens results screen
function openStart(){
  if (resultsScreen == null) return
  resultsScreen.classList.add('working')
  overlay.classList.add('working')
  console.log("3");
}
//starts test from start screen
document.getElementById('start').onclick  = function(){
  typedChar=0
     word=0
     incorrect=0
  startScreen.classList.remove('working')
overlay.classList.remove('working')
Input.focus();
  startTimer()
renderNewQuote()
console.log("4");
}


startScreen.classList.add('working')



