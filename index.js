var videoPlayer = (element) => {
    return {
        element: element,
        currentVideo: 0,
        getDom() {
            this.video = this.element.querySelector("#player");
            this.playPause = this.element.querySelector("#play-pause");
            this.currentTime = this.element.querySelector("#current-time");
            this.totalTime = this.element.querySelector("#total-time");
            this.videoTime = this.element.querySelector("#video-time");
            this.fullScreen = this.element.querySelector("#full-screen");
            this.nextArrow = this.element.querySelector("#next-arrow");
            this.title = this.element.querySelector("#title");
            this.volumeBtn = this.element.querySelector("#mute");
            this.volume = this.element.querySelector("#volume");
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
        showVolume(show) {
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
}

var player1 = videoPlayer(document.querySelector("#conteudo"))
player1.getDom()
player1.startActions();
player1.load();

var player2 = videoPlayer(document.querySelector("#conteudo2"))
player2.getDom()
player2.startActions();
player2.load();
