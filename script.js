
const overlay = document.getElementById('overlay')

const Display = document.getElementById('quoteDisplay')
const Input = document.getElementById('text')
const timer = document.getElementById('timer')
const modal = document.querySelector('.results')
const startScreen =document.querySelector('.beginTest')

const startbutton = document.getElementById('.start')
const num = Math.floor(Math.random() * (1642 - 1) + 1)
var timeInSeconds;
var typedChar=0;
var word=0;
var incorrect=0;



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
      console.log(incorrect+"number of incorrect")
    }
  })

  if (correct){
    stopTimer()
    openModal()
  } 
})

function getRandomQuote() {
  return fetch('https://api.quotable.io/random')
    .then(response => response.json())
    .then(data => data.content)
}

async function renderNewQuote() {

  const quote =   await getRandomQuote();
  Display.innerHTML =''
  quote.split('').forEach(character => {
    const characterSpan = document.createElement('span')
    characterSpan.innerText = character
    word+=1
    Display.appendChild(characterSpan)
  })
  Input.value = null
 
}


let startTime
function startTimer() {
  timer.innerText = 0
  startTime = new Date()
  timeInSeconds = setInterval(() => {
    timer.innerText = getTimerTime()
  }, 1000)
}

function getTimerTime() {
  return Math.floor((new Date() - startTime) / 1000)
}
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

}

function openModal(){
  open(modal)
  
}

  document.getElementById('close').onclick = function(){
     typedChar=0
     word=0
    if (document.getElementById('results') == null) return
    modal.classList.remove('active')
    overlay.classList.remove('active')
    Input.focus();
  startTimer()
renderNewQuote()
   
  }
  

function open(modal){
  if (modal == null) return
  modal.classList.add('active')
  overlay.classList.add('active')
}

document.getElementById('start').onclick  = function(){
  startScreen.classList.remove('active')
overlay.classList.remove('active')
Input.focus();
  startTimer()
renderNewQuote()
}


startScreen.classList.add('active')

