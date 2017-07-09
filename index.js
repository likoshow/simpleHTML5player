var onLoad = function() {
    player.init({
        mVideo: '#video_wrap',
        video:'video',
        crtTime: 'currentTime',
        durTime: 'durationTime',
        posBar: 'positionBar',
        crtSpeedBtn: 'crtSpeed',
        speedList: 'speed-list',
        pause: 'icon-pause2',
        play: 'icon-play3',
        crtVol: 'crt-volume',
        src: './11.mp4'
    });
};
if(document.addEventListener){
    document.addEventListener('DOMContentLoaded', onLoad, false)
}
else {
    window.onload = onLoad
}