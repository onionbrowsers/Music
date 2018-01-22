// 将音频放到页面中

(function ($,root) {
    // 建立新音频
    function audioManager() {
        this.audio = new Audio()
        this.status = 'pause'
    }
    // 在原型上添加方法
    audioManager.prototype = {
        // 调用audio播放方法
        play :function () {
            this.status = 'play'
            this.audio.play()
        },
        // 调用audio暂停方法
        pause :function () {
            this.status = 'pause'
            this.audio.pause()
        },
        // 改变audio的src
        changeSource :function (src) {
            this.audio.src = src
            this.audio.load()  //重新加载音频
        },
        // 拉进度条时直接在当前时间播放
        jumpToPlay:function (times) {
            this.audio.currentTime = times
            this.play()
        }
    }
    root.audioManager = audioManager
})(window.Zepto,window.player)