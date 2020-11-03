var videoPlayer = {
    currentVideo: 0,
    getDom() {
        this.video = document.querySelector("#player");
        this.playPause = document.querySelector("#play-pause");
        this.currentTime = document.querySelector("#current-time");
        this.totalTime = document.querySelector("#total-time");
        this.videoTime = document.querySelector("#video-time");
        this.fullScreen = document.querySelector("#full-screen");
        this.nextArrow = document.querySelector("#next-arrow");
        this.title = document.querySelector("#title");
        this.volumeBtn = document.querySelector("#mute");
        this.volume = document.querySelector("#volume");
    },

    load() {
        this.videoObject = window.videos[this.currentVideo]
        this.video.src = `./files/${this.videoObject.file}`
    },

    updateVideoTime(value) {
        this.video.currentTime = value
        var minutes = Math.floor(value / 60).toString().padStart(2, 0)
        var seconds = Math.floor(value % 60).toString().padStart(2, 0)
        this.currentTime.innerHTML = `${minutes}:${seconds}`
    },
    updateBarTime(value) {
        var minutes = Math.floor(this.video.currentTime / 60).toString().padStart(2, 0)
        var seconds = Math.floor(this.video.currentTime % 60).toString().padStart(2, 0)
        this.currentTime.innerHTML = `${minutes}:${seconds}`
        this.videoTime.value = this.video.currentTime
    },

    mute() {
        if (this.volumeBtn.innerText != "volume_off") {
            this.volume.oldValue = this.video.volume
            this.volume.value = 0;
            this.video.volume = 0;
            this.volumeBtn.children[0].innerText = 'volume_off';
        }
        else {
            this.volume.value = this.volume.oldValue * 100;
            this.video.volume = this.volume.oldValue;
            this.volumeBtn.children[0].innerText = 'volume_up';
        }
    },

    play() {
        if (this.playPause.innerText == "play_arrow") {
            this.video.play()
            this.playPause.children[0].innerHTML = 'pause';
        }
        else {
            this.video.pause()
            this.playPause.children[0].innerText = 'play_arrow';
        }
    },
    handleFullScreen() {
        this.video.requestFullscreen()
    },
    next() {
        if (this.currentVideo < window.videos.length - 1)
            this.currentVideo += 1
        else
            this.currentVideo = 0
        this.load()
    },
    back() {
        if (this.currentVideo > 0)
            this.currentVideo -= 1
        this.load()
    },
    updateVolume(value) {
        this.video.volume = value / 100;
        if (value > 50) {
            this.volumeBtn.children[0].innerText = 'volume_up';
        }
        else if (value < 60 && value > 0) {
            this.volumeBtn.children[0].innerText = 'volume_down';
        }
        else if (value == 0) {
            this.volumeBtn.children[0].innerText = 'volume_mute';
        }
    },
    showVolume(show){
        this.volume.style.opacity = show ? 1 : 0
    },
    startActions() {
        this.video.ontimeupdate = () => this.updateBarTime(this.video.currentTime)
        this.video.onended = () => {
            this.next();
            this.play();
        }
        this.videoTime.onchange = () => this.updateVideoTime(this.videoTime.value)
        this.videoTime.oninput = () => this.updateVideoTime(this.videoTime.value),
            this.volume.oninput = () => this.updateVolume(this.volume.value)
        this.volume.onchange = () => this.updateVolume(this.volume.value)
        this.playPause.onclick = () => this.play()
        this.fullScreen.onclick = () => this.handleFullScreen()
        this.nextArrow.onclick = () => this.next()
        this.volumeBtn.onclick = () => this.mute()
        // this.volumeBtn.onmouseover = () => this.showVolume(true)
        // this.volumeBtn.onmouseout = () => this.showVolume(false)
        this.video.onloadeddata = () => {
            this.title.innerText = `${this.videoObject.title} - ${this.currentVideo + 1} / ${window.videos.length} `
            var minutes = Math.floor(this.video.duration / 60).toString()
            var seconds = Math.floor(this.video.duration % 60).toString()
            this.totalTime.innerHTML = `${minutes.padStart(2, 0)}:${seconds.padStart(2, 0)}`
            this.videoTime.max = this.video.duration;
        }
    }
}
videoPlayer.getDom()
videoPlayer.startActions();
videoPlayer.load()

