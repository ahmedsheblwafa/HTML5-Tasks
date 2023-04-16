const myTracks = ["sound1.wav", "sound2.wav", "sound3.wav"];
let myTracksDivs;
let i = 0;
const controllers = [...document.getElementsByClassName("controller")];

const renderTracks = () => {
  tracks.innerHTML = "";
  myTracks.forEach((track, index) => {
    tracks.innerHTML += `<div class="track">
        <span>${track}</span>
        <span onclick='removeTrack(event,${index})'  >delete</span>
      </div>`;
  });

  myTracksDivs = [...document.getElementsByClassName("track")];
};

renderTracks();

// *******************************
// change playing track background
// *******************************
let rangeInterval;
const changePlayingTrackBackground = () => {
  myAudio.onplay = () => {
    myTracksDivs.forEach(track => track.classList.remove("active"));
    myTracksDivs[i].classList.add("active");
    startPauseButton();
    clearInterval(rangeInterval);
    setInterval(() => {
      range.value = Math.round(myAudio.currentTime);
    }, 1000);
  };
};

myAudio.onpaused = () => {
  clearInterval(rangeInterval);
};

changePlayingTrackBackground();

myAudio.onloadeddata = () => {
  range.max = Math.round(myAudio.duration);
};
// *******************************
// ***********play mode**********
// *******************************
const playMode = () => {
  controllers.forEach(controller => controller.classList.remove("active"));
  playButton.classList.add("active");
  myAudio.src = myTracks[i];
  myAudio.play();
  myAudio.onended = () => {
    if (i < myTracks.length - 1) {
      myAudio.src = myTracks[++i];
      myAudio.play();
    }
  };
};
playButton.onclick = playMode;

// *******************************
// ***********repeat mode*********
// *******************************
const repeatMode = () => {
  controllers.forEach(controller => controller.classList.remove("active"));
  repeatButton.classList.add("active");
  myAudio.src = myTracks[i];
  myAudio.play();
  myAudio.onended = () => {
    if (i < myTracks.length - 1) {
      myAudio.src = myTracks[++i];
    } else {
      myAudio.src = myTracks[(i = 0)];
    }
    myAudio.play();
  };
};
repeatButton.onclick = repeatMode;

// *******************************
// ***********shuffle mode*********
// *******************************
const shuffleMode = () => {
  controllers.forEach(controller => controller.classList.remove("active"));
  shufleButton.classList.add("active");

  //   make array of shuffled indexes
  let indexes = [];
  let j = 0;
  for (let i = 0; i < myTracks.length; i++) {
    indexes.push(i);
  }
  let shuffledIndexes = indexes.sort((a, b) => Math.random() - 0.5);
  i = shuffledIndexes[j];
  myAudio.src = myTracks[i];
  myAudio.play();
  myAudio.onended = () => {
    if (j < shuffledIndexes.length - 1) {
      i = shuffledIndexes[++j];
      myAudio.src = myTracks[i];
      myAudio.play();
    }
  };
};
shufleButton.onclick = shuffleMode;

// *******************************
// ***********pause **************
// *******************************
const startPauseButton = () => {
  pauseButton.innerHTML = "pause";
  pauseButton.onclick = () => {
    myAudio.pause();
    pauseButton.innerHTML = "resume";
    startresumeButton();
  };
};
const startresumeButton = () => {
  pauseButton.onclick = () => {
    myAudio.play();
    pauseButton.innerHTML = "pause";
    startPauseButton();
  };
};

// *******************************
// ****make tracks clickable *****
// *******************************
const makeTracksClickable = () => {
  myTracksDivs.forEach((track, index) => {
    track.onclick = () => {
      i = index;
      if (repeatButton.classList.contains("active")) {
        myAudio.src = myTracks[i];
        myAudio.play();
      } else {
        playMode();
      }
    };
  });
};
makeTracksClickable();

// *******************************
// ****add new sound track *******
// *******************************
addFile.oninput = e => {
  myTracks.push(e.target.value.split("\\").pop());
  renderTracks();
  makeTracksClickable();
};

// *******************************
// ****remove sound track ********
// *******************************

const removeTrack = (e, index) => {
  e.stopPropagation();
  myTracks.splice(index, 1);
  if (index == i) {
    myAudio.pause();
  } else if (index < i) {
    i--;
  }
  renderTracks();
  makeTracksClickable();
  myTracksDivs[i].classList.add("active");
};

// *******************************
// ****change current time *******
// *******************************

range.oninput = () => {
  myAudio.currentTime = range.value;
};
