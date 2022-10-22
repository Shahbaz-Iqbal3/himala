const poetryBox = document.querySelectorAll(".poetry-box")
const playEl = document.querySelectorAll("i");
const playerEl = document.querySelector(".player")
const currentTimeAudio = document.querySelector(".C-time")
const totalTimeAudio = document.querySelector(".T-time")
const prevBtn = document.querySelector("button.prev")
const nextBtn = document.querySelector("button.next")
const playPauseBtn = document.querySelector("button.paly-pause")
const playPauseicon = document.querySelector(".paly-pause>img")
const rangeEl = document.querySelector("input[type=range]")
const barEl = document.querySelector(".bar"),
Progress =  document.querySelector("#topProg"),
ProgThumb = document.querySelector("#thumbProg"),
CopyBtn = document.querySelectorAll(".copybtn"),
keyIntroEl = document.querySelector(".closeBtn-kb")

/////////////////
const audioEl = new Audio("Himala.ogg");
//////////////////////
let count = 0;
let index = 0;
let playTime = 0
let scrollAm = 0
let interval =0
////////////////////////////////
let timeCode = []
for (let x = 0; x < playEl.length; x++) {
  timeCode[x] = +playEl[x].getAttribute("data-time");
}
////////////////////
playEl.forEach((element, i) => {
  element.addEventListener("click", () => {
    playTime = timeCode[i]
    audioEl.currentTime = playTime
    index = i
    audioEl.play()
    playPauseicon.src = "images/pause_icon.png"
    count = 1
    interval = setInterval(updateIndex, 1000);
  });
});
//////////////////////
setInterval(() => {
  playerEl.classList.remove("active")
  Cmin = Math.abs(Math.ceil(((audioEl.duration - audioEl.currentTime) - audioEl.duration) / 60))
  Csec = Math.abs(Math.ceil(((audioEl.duration - audioEl.currentTime) - audioEl.duration) % 60))
  Tmin = Math.floor((audioEl.duration) / 60)
  Tsec = Math.floor((audioEl.duration) % 60)
  Cmin = Cmin < 10 ? "0" + Cmin : Cmin;
  Csec = Csec < 10 ? "0" + Csec : Csec;
  Tmin = Tmin < 10 ? "0" + Tmin : Tmin;
  Tsec = Tsec < 10 ? "0" + Tsec : Tsec;
  currentTimeAudio.innerText = `${Cmin}:${Csec}`
  totalTimeAudio.innerText = `${Tmin}:${Tsec}`
}, 1000);
///////////////
function progBar() {
  progressBarValue = Math.abs(Math.floor(audioEl.currentTime / audioEl.duration * 100))
  rangeEl.value = progressBarValue
  Progress.style.width = progressBarValue + "%"
  ProgThumb.style.left = progressBarValue + "%"
  barEl.style.width = progressBarValue + "%"
  rangeEl.addEventListener("mousedown", () => {
    audioEl.currentTime = Math.abs(Math.floor(rangeEl.value * audioEl.duration / 100))
  })
  rangeEl.addEventListener("mouseup", () => {
    audioEl.currentTime = Math.abs(Math.floor(rangeEl.value * audioEl.duration / 100))
  })

}
setInterval(progBar, 1000);
/////////////////////////////////////////////////////////////////////////events
prevBtn.addEventListener("click", () => {
  if (index <= 0) {
    index = 1
  }
  prev(--index)
  scroll(index)
})
/////////////////
playPauseBtn.addEventListener("click", () => {
  playPause()
})
///////////////////
nextBtn.addEventListener("click", () => {
  if (index = updateIndex() >= timeCode.length - 1) {
    index = timeCode.length - 1
  }
  next(index)
})
window.addEventListener("keydown", (e) => {
  if (e.key === "n") {
    if (index = updateIndex() >= timeCode.length - 1) {
      index = timeCode.length - 1
    }
    next(index)
  } else if (e.keyCode == 32 && e.target == document.body) {
    e.preventDefault();
    playPause()
  } else if (e.key === "p") {
    if (index <= 0) {
      index = 1
    }
    prev(--index)
    scroll(index)
  }
})

keyIntroEl.addEventListener("click", ()=>{
    document.querySelector(".keyboard-intro").classList.add("active")
})
/////////////////////////////////////////////////////////////////////function
function playPause() {
  if (count == 0) {
    count = 1
    audioEl.play();
    playPauseicon.src = "images/pause_icon.png"
    interval = setInterval(updateIndex, 1000);
  } else {
    count = 0
    audioEl.pause();
    playPauseicon.src = "images/play_icon.png"
    clearInterval(interval)
  }
}

//////////////////////
function prev(index) {
  playTime = timeCode[index]
  console.log(playTime, index, "prev");
  audioEl.currentTime = playTime
}
function next(index) {
  index = updateIndex()
  console.log(index, "next");
  playTime = timeCode[index]
  audioEl.currentTime = playTime
  scroll(index)
}
///////////////////////
function updateIndex() {
  if (audioEl.currentTime < timeCode[0]) {
    index = 0
    scroll(index)
  } else if (audioEl.currentTime < timeCode[1]) {
    index = 1
    scroll(index - 1)
  } else if (audioEl.currentTime < timeCode[2]) {
    index = 2
    scroll(index - 1)
  } else if (audioEl.currentTime < timeCode[3]) {
    index = 3
    scroll(index - 1)
  } else if (audioEl.currentTime < timeCode[4]) {
    index = 4
    scroll(index - 1)
  } else if (audioEl.currentTime < timeCode[5]) {
    index = 5
    scroll(index - 1)
  } else if (audioEl.currentTime < timeCode[6]) {
    index = 6
    scroll(index - 1)
  } else if (audioEl.currentTime < timeCode[7]) {
    index = 7
    scroll(index - 1)
  } else if (audioEl.currentTime < timeCode[8]) {
    index = 8
    scroll(index-1)
  }
  return index
}

function scroll(index) {
  scrollTo({
    top: poetryBox[index].offsetTop - innerHeight / 3,
    behavior: 'smooth'
  })
  poetryBox.forEach((e) => {
    e.style.border = "3px solid #e4e4e4"
  })
  poetryBox[index].style.border = "3px solid black"
}
CopyBtn.forEach((e, i) => {
  e.addEventListener("click", () => {
    const text = document.querySelectorAll(".poetry")[i].innerText
    try { navigator.clipboard.writeText(text);
      console.log('copy content sucessfuly' ,text);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  })
})
uRL = window.location.href.slice(7)
console.log(uRL);