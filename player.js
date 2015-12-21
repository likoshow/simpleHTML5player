var player = (function() {
    var _fsFuncList = ['requestFullscreen', 
            'webkitRequestFullScreen',
            'mozRequestFullScreen',
            'msRequestFullScreen']
    var _SPEEDBAR_LENGTH = 100
    var _options
    var _vWidth
    var _doc
    var _video
    var _posBar
    var _crtTime
    var _bufBar 
    var _crtVol
    var _mVideo
    var _methods = {
        fscreen: function() {
            _fsFuncList.forEach(function(item, index) {
                if(_video[item]){
                    _video[item]()
                    return
                }
            })
        },
        play: function(target) {
            _video.play()
            target.className = 'icon-pause2'
            target.dataset['click'] = 'pause'
            // target.innerHTML = 'pause'
        },
        pause: function(target) {
            _video.pause()
            target.className = 'icon-play3'
            target.dataset['click'] = 'play'
            // target.innerHTML = 'play'
        },
        setCrtTime: function(target, e) {
            var barLeft = target.getBoundingClientRect()['left']
            _video.currentTime = (e.clientX - barLeft) / _vWidth * _video.duration
        },
        setVolume: function(target, e) {
            if(target){
                var barLeft = target.getBoundingClientRect()['left']
                _video.volume = (e.clientX - barLeft) / _SPEEDBAR_LENGTH
            }


            _crtVol.style.width = _video.volume * _SPEEDBAR_LENGTH + 'px'
            // console.log(_crtVol)
        },
        setSpeed: function(target) {
            var speed = target.innerHTML
            _video.playbackRate = parseFloat(speed)
            var speedList = target.parentNode
            var crtSpeedBtn = speedList.previousElementSibling
            crtSpeedBtn.innerHTML = speed
            speedList.style.display = 'none'
        },
        changeSpeed: function(target) {
            var speedList = target.nextElementSibling
            if(speedList.style.display){
                speedList.style.display = ''
            }
            else{
                speedList.style.display = 'none'
            }
        }

    }


    //初始化
    var init = function(options) {
        _doc = document
        _options = options
        _mVideo = _doc.querySelector('.' + options.mVideo)
        _video = _doc.querySelector('.' + options.video)
        _video.src = options.src

        _crtVol = _doc.querySelector('.' + options.crtVol)
        _posBar = _doc.querySelector('.' + options.posBar)
        _bufBar = _posBar.parentNode
        _crtTime = _doc.querySelector('.' + options.crtTime)
        _durTime = _doc.querySelector('.' + options.durTime)

        _mVideo.onclick = _click
        _video.ontimeupdate = _timeUpdate
        _video.onloadedmetadata = _loadedmetadata
    }

    var _click = function(e) {
        var target = e.target || e.srcElement
        var method = target.dataset['click']
        if(method){
            _methods[method](target, e)
        }
    }
    var _loadedmetadata = function() {
        
        var _durBar = _bufBar.parentNode
        _vWidth = _video.videoWidth
        _durTime.innerHTML = _formatTime(_video.duration)
        _durBar.style.width = _vWidth + 'px'
        _mVideo.style.width = _vWidth + 'px'
        _methods.setVolume()
    }
    var _timeUpdate = function() {
        _posBar.style.width = (_video.currentTime / _video.duration * _vWidth) + 'px'
        _bufBar.style.width = _video.buffered.end(0) / _video.duration * _vWidth + 'px'
        _crtTime.innerHTML = _formatTime(_video.currentTime)
    }
    var _formatTime = function(time) {
        time = Math.ceil(time)
        var min = parseInt(time / 60)
        min = min < 10 ? '0' + min : min
        var sec = time % 60
        sec = sec < 10 ? '0' + sec : sec
        return min + ':' + sec
    }

    return {
        init: init
    }
})()

window.onload = function() {
    var options = {
        mVideo: 'm-video',
        video:'video',
        crtTime: 'currentTime',
        durTime: 'durationTime',
        posBar: 'positionBar',
        crtSpeedBtn: 'crtSpeed',
        speedList: 'speed-list',
        crtVol: 'crt-volume',
        // src: 'test.mp4'
        src: 'http://us.sinaimg.cn/001dqTlljx06XEZPS2nm01040101zBW50k02.mp4?KID=unistore,video&Expires=1450615343&ssig=VO00Hv%2FMVn'
    }
    player.init(options)
}