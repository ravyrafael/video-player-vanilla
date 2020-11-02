var videoPlayer = {
    currentVideo: 0,
    getDom(){
        this.video = document.querySelector("#player");
        this.playPause = document.querySelector("#play-pause");
        this.currentTime = document.querySelector("#current-time");
        this.totalTime = document.querySelector("#total-time");
        this.videoTime = document.querySelector("#video-time");
        this.fullScreen = document.querySelector("#full-screen");
        this.nextArrow = document.querySelector("#next-arrow");
        this.title = document.querySelector("#title");
        
    },

    load() {
        this.videoObject = window.videos[this.currentVideo]
        this.video.src = `./files/${this.videoObject.file}`
    },

    updateVideoTime(value){
        this.video.currentTime = value
        var minutes = Math.floor(value / 60).toString().padStart(2, 0)
        var seconds = Math.floor(value % 60).toString().padStart(2, 0)
        this.currentTime.innerHTML = `${minutes}:${seconds}`
    },
    updateBarTime(value){
            var minutes = Math.floor(this.video.currentTime / 60).toString().padStart(2, 0)
            var seconds = Math.floor(this.video.currentTime % 60).toString().padStart(2, 0)
            this.currentTime.innerHTML = `${minutes}:${seconds}`
            this.videoTime.value = this.video.currentTime
    },

    play() {
            if (this.playPause.innerText == "play_arrow") {
                this.video.play()
                this.playPause.innerHTML = '<i class="material-icons">pause</i>';
            }
            else {
                this.video.pause()
                this.playPause.innerHTML = '<i class="material-icons">play_arrow</i>';
            }
    },
    handleFullScreen() {
            this.video.requestFullscreen()
    },
    next(){
        if(this.currentVideo < window.videos.length - 1)
            this.currentVideo += 1 
        else
            this.currentVideo = 0
        this.load()
    },
    back(){
        if(this.currentVideo > 0)
            this.currentVideo -= 1 
        this.load()

    },
    startActions(){
        this.video.ontimeupdate = () =>  this.updateBarTime(this.video.currentTime)       
        this.video.onended = () => {
            this.next();
            this.play();
        }
        this.videoTime.onchange = () => this.updateVideoTime(this.videoTime.value)
        this.videoTime.oninput = () => this.updateVideoTime(this.videoTime.value)
        this.playPause.onclick = (event) => this.play()
        this.fullScreen.onclick = (event) =>this.handleFullScreen()
        this.nextArrow.onclick = (event) =>this.next()

        this.video.onloadeddata = () =>{
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

