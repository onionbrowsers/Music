// 进度条函数

(function ($,root) {
    var $scope = $(document.body)
    var curDuration 
    var frameId
    var startTime
    var lastPercent = 0  //记录每次暂停后进度条走了多少
    // 将得到的持续时间转换成分钟秒数
    function formateDate(duration) {
        var duration = Math.round(duration)
        var minute = Math.floor(duration / 60)
        var second = duration - minute * 60
        if(minute < 10) {
            minute = '0' + minute
        }
        if(second < 10) {
            second = '0' + second
        }
        return minute + ':' + second
    }
    // 改变进度条
    function randerPro(percent) {
        var percentage = (percent - 1) * 100 + '%' 
        $scope.find('.pro-top').css({
             transform:'translateX('+ percentage +')'
        })
    }
    // 改变左侧时间，查看其播放了多少秒
    function upDate(percent) {
        var currentTime = percent * curDuration
        var time = formateDate(currentTime)
        $scope.find('.cur-time').html(time)
        randerPro(percent)
    }
    // 获取进度条的百分比
    function start() {
        cancelAnimationFrame(frameId)
        startTime = new Date().getTime()
        //计算百分比
        function frame() {
            var curTime = new Date().getTime()
            var percent =lastPercent + (curTime - startTime) / (curDuration * 1000)
            if(percent < 1) {
                // 观察帧数，时刻判定进度条
                frameId = requestAnimationFrame(frame) 
                upDate(percent)
            }else{
                cancelAnimationFrame(frameId)
            }
        }
        frame()
    }
    // 暂停时停止进度条的运动，时间也停止
    function stop() {
        var stopTime = new Date().getTime();
        lastPercent = lastPercent + (stopTime - startTime) / (curDuration * 1000)
        cancelAnimationFrame(frameId)
    }
    // 将计算的时长放入html中
    function randerAllTime(duration) {
        lastPercent = 0
        curDuration = duration
        var allTime = formateDate(duration)
        $scope.find('.all-time').html(allTime)
    }
    root.proccess = {
        randerAllTime : randerAllTime,
        start: start, 
        stop: stop,
        upDate : upDate
    }
})(window.Zepto,window.player) 