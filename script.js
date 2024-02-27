const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');

const music = document.querySelector('audio');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

const progresscontainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');

const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');

const song = [
    {
        name: 'music-1',
        displayName: 'Blinding Lights',
        artist: 'The Weeknd'
    },
    {
        name: 'music-2',
        displayName: 'Tick Tock',
        artist: 'Joji'
    },
    {
        name: 'music-3',
        displayName: 'Lost in the fire',
        artist: 'The Weeknd'
    },
    {
        name: 'music-4',
        displayName: 'Save Your Tears',
        artist: 'The Weeknd'
    }
];

let isPlaying = false;

function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    music.play();
}

function pauseSong() {
    music.pause();
    playBtn.classList.replace('fa-pause', 'fa-play');
    isPlaying = false;
}

playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `images/${song.name}.jpg`;
}

let songIndex = 0;

function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = song.length - 1;
    }
    console.log(songIndex);
    loadSong(song[songIndex]);
    playSong();
}

function nextSong() {
    songIndex++;
    if (songIndex > song.length - 1) {
        songIndex = 0;
    }
    console.log(songIndex);
    loadSong(song[songIndex]);
    playSong();
}

function updateprogressbar(e) {
    if (isPlaying) {
        const { duration, currentTime } = e.srcElement;

        const progressPercent = (currentTime / duration) * 100;

        progress.style.width = `${progressPercent}%`;

        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }

        if (durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }

        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);

        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`;
            currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
        }
    }
}

function setProgressBar(e) {
    const width = this.clientWidth;
    const clickx = e.offsetX;
    const { duration } = music;

    music.currentTime = (clickx / width) * duration;
}

loadSong(song[songIndex]);

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

music.addEventListener('ended', nextSong);

music.addEventListener('timeupdate', updateprogressbar);
progresscontainer.addEventListener('click', setProgressBar);