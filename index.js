var video = document.querySelector("#player")
var playPause = document.querySelector("#play-pause")
var currentTime = document.querySelector("#current-time")
var totalTime = document.querySelector("#total-time")
var videoTime = document.querySelector("#video-time")
var fullScreen = document.querySelector("#full-screen")



video.src = `./files/${window.videos[0].file}`

video.onloadeddata  = ()=>{
    var minutes = Math.floor(video.duration/60).toString()
    var seconds = Math.floor(video.duration%60).toString()
    totalTime.innerHTML = `${minutes.padStart(2,0)}:${seconds.padStart(2,0)}`
    videoTime.max = video.duration;
    videoTime.onchange = function(event){
        video.currentTime = event.target.value
    }
    var playInterval = setInterval(()=>{
        var minutes = Math.floor(video.currentTime/60).toString().padStart(2,0)
        var seconds = Math.floor(video.currentTime%60).toString().padStart(2,0)
        currentTime.innerHTML = `${minutes}:${seconds}`
        videoTime.value = video.currentTime
    }, 100)
}



playPause.onclick = (event)=>{
    if(playPause.innerText == "play_arrow"){
        video.play()
        playPause.innerHTML = '<i class="material-icons">pause</i>';
    }
    else{
        video.pause()
        playPause.innerHTML = '<i class="material-icons">play_arrow</i>';
    }
}

fullScreen.onclick = (event)=>{
    video.requestFullscreen()
}