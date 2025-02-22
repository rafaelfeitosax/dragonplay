const audio = document.getElementById("audio");
const playButton = document.getElementById("play");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const progressBar = document.getElementById("progress-bar");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const volumeBar = document.getElementById("volume-bar");
const volumeLevelEl = document.getElementById("volume-level");

const songs = ["songs/faixa1.mp3", "songs/faixa2.mp3", "songs/faixa3.mp3", "songs/faixa4.mp3", "songs/faixa5.mp3"];
let songIndex = 0;
const songNames = ["Faixa 1", "Faixa 2", "Faixa 3", "Faixa 4", "Faixa 5"];
const covers = ["img/faixa1.jpg", "img/faixa2.jpg", "img/faixa3.jpg", "img/faixa4.jpg", "img/faixa5.jpg"];

function loadSong(index) {
    audio.src = songs[index];
    document.getElementById("music-name").textContent = songNames[index];
    document.getElementById("cover").src = covers[index];
    audio.load();
}

function togglePlay() {
    if (audio.paused) {
        audio.play();
        playButton.innerHTML = `<i class="fa-solid fa-pause"></i>`;
    } else {
        audio.pause();
        playButton.innerHTML = `<i class="fa-solid fa-play"></i>`;
    }
}

function updateProgress() {
    const { currentTime, duration } = audio;
    progressBar.value = (currentTime / duration) * 100;
    currentTimeEl.textContent = formatTime(currentTime);
    durationEl.textContent = formatTime(duration);
}

function setProgress(event) {
    const width = progressBar.clientWidth;
    const clickX = event.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

function formatTime(time) {
    if (!time) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
}

function prevSong() {
    songIndex = songIndex > 0 ? songIndex - 1 : songs.length - 1;
    loadSong(songIndex);
    audio.play();
}

function nextSong() {
    songIndex = songIndex < songs.length - 1 ? songIndex + 1 : 0;
    loadSong(songIndex);
    audio.play();
}

// use to volum 
function updateVolume() {
    audio.volume = volumeBar.value;
    volumeLevelEl.textContent = `${Math.round(volumeBar.value * 100)}%`;
}

// aqui eu nao preciso parar, so seguir a musica
audio.addEventListener("ended", nextSong);

// pra funcionar os botoes
playButton.addEventListener("click", togglePlay);
prevButton.addEventListener("click", prevSong);
nextButton.addEventListener("click", nextSong);
audio.addEventListener("timeupdate", updateProgress);
progressBar.addEventListener("input", () => {
    audio.currentTime = (progressBar.value / 100) * audio.duration;
});
volumeBar.addEventListener("input", updateVolume);

// da o play
loadSong(songIndex);
audio.volume = 1; 
