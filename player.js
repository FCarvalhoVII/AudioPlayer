window.player = {
    title: document.getElementsByTagName('h5'),
    artist: document.getElementsByClassName('artist'),
    img: document.getElementsByClassName('display-img'),
    music: document.getElementsByTagName('audio'),
    volume: document.getElementById('volume-bar'),
    progress: document.getElementById('progress'),
    currentDuration: document.getElementById('current-duration'),
    totalDuration: document.getElementById('total-duration'),

    musicData: songs,
    currentSong: {},
    musicPlaying: 0,
    isPlaying: false,

    start() {
        this.update()
        this.music[0].onended = () => this.next()
        this.volume.value = this.volume.max
    },

    next() {
        this.musicPlaying++
        if (this.musicPlaying == this.musicData.length) this.restart()
        this.update()
        this.music[0].play()
    },

    update() {
        this.currentSong = this.musicData[this.musicPlaying]
        this.title[0].innerText = this.currentSong.title
        this.artist[0].innerText = this.currentSong.artist
        this.img[0].style.background = `url('${path(this.currentSong.img)}') no-repeat center center / cover`
        this.music[0].src = path(this.currentSong.file)

        this.music[0].onloadeddata = () => {
            this.progress.max = this.music[0].duration
            this.totalDuration.innerText = this.secondsToMinutes(this.music[0].duration)
        }
    },

    restart() {
        this.musicPlaying = 0
        this.update()
    },

    /* Buttons */
    play() {
        this.isPlaying = true
        this.music[0].play()
        this.music[0].ontimeupdate = () => this.timeUpdate()
    },

    pause() {
        this.isPlaying = false
        this.music[0].pause()
    },

    buttonPlayPause() {
        if(this.isPlaying === false) {
            this.play()
        } else {
            this.pause()
        }
    },

    buttonMute() {
        this.music[0].muted = !this.music[0].muted
    },

    setVolume(value) {
        this.music[0].volume = value / 100
    },

    /* Progress Bar */
    setProgress(value) {
        this.music[0].currentTime = value
    },

    timeUpdate() {
        this.currentDuration.innerText = this.secondsToMinutes(this.music[0].currentTime)
        this.progress.value = this.music[0].currentTime
    },

    secondsToMinutes(time) {
        const minutes = Math.floor(time / 60)
        const seconds = Math.floor(time % 60)
        return `${('0' + minutes).slice(-2)}:${('0' + seconds).slice(-2)}`
    }
}