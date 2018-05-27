var $ = window.Zepto;
var root = window.player;
var $scope = $(document.body)
var songList
var audio = new root.audioManager()
var proccess = root.proccess
var playList = root.playList

// 拉进度条
function bindTouch() {
    var  $sliderPoint = $scope.find('.silder-point')
    var offset = $scope.find('.pro-wrapper').offset()
    var left = offset.left
    var width = offset.width
    // 刚触碰进度条时停止歌曲，时间不动，进度条不动
    $sliderPoint.on('touchstart',function () {
        proccess.stop();
    }).on('touchmove',function (e) {
        // 移动进度条，获取当前百分比，放到百分比函数中
        var x = e.changedTouches[0].clientX
        var percent = (x - left) / width 
        if(percent >= 1 || percent <= 0 ) {
            percent = 0
        }
        proccess.upDate(percent)
    }).on('touchend',function (e) {
        //离开进度条，获取当前百分比，用百分比算当前时间，将其在当前时间播放
        var x = e.changedTouches[0].clientX
        var percent = (x - left) / width 
        if(percent >= 1 || percent <= 0 ) {
            percent = 0
        }
        proccess.upDate(percent)
        var index = control.index 
        var curDuration = songList[index].duration
        var curTime = curDuration * percent
        audio.jumpToPlay(curTime) //播放函数
        proccess.start()
        $scope.find('.play-btn').addClass('playing')
    })
}
function bindClick() {
    // 列表按钮点击事件
    $scope.find('.list-btn').on('click',function () {
        playList.show(control)
    })
    
    // 给播放按钮添加暂停和播放功能
    $scope.on('click','.play-btn',function () {
        if(audio.status == 'play') {
            audio.pause()
            proccess.stop()
            $(this).removeClass('playing')  //改变图片
        }else{
            audio.play()
            proccess.start()
            $(this).addClass('playing')
        }
        // 可以写成$(this).toggleClass('playing')  意思是有这个class名就消除，没有就添加
    })
    // 下一首
    $scope.find('.next-btn').on('click',function () {
        // if(index >= songList.length - 1) {
        //     index = 0
        // }else{
        //     index++
        // }
        var index = control.next()
        $scope.trigger('player:change',index)
    })
    // 上一首
    $scope.find('.prev-btn').on('click',function () {
        // if(index <= 0) {
        //     index = songList.length - 1
        // }else{
        //     index--
        // }
        // root.rander(songList[index])
        var index = control.prev()
        $scope.trigger('player:change',index)
    })
}
// 自定义事件
$scope.on('player:change',function (e,index,flag) {
    // flag与playlist.js的点击事件有关
    root.rander(songList[index]) 
    audio.changeSource(songList[index].audio )   // 将音频的src传入 
    if (audio.status == 'play' || flag) {
        proccess.start()
        audio.play() 
    }  // 播放状态下切换仍继续播放
    proccess.randerAllTime(songList[index].duration ) //将歌曲时间导入
    proccess.upDate(0)
})
function getData(url) {
    // 获取歌曲信息
    $.ajax({
        type:'GET',
        url:url,
        success:successFn
    })
}
// 成功的回掉函数
function successFn(data) {
    // 从getData函数中获取的数据放到成功的回掉函数中，用来执行函数
    songList = data  //数据在外部可以试用
    $scope.trigger('player:change',0)  //执行rander函数
    bindClick() //执行点击函数
    bindTouch() // 进度条函数
    control = new root.controlManager(data.length) //执行index函数，上一首下一首函数
    playList.randerPlayList(data)
}
getData("./mock/data.json") 