
// 列表函数

(function ($,root) {
    var $scope = $(document.body)
    var controlManager  //读取index
    // 歌曲列表
    var $playList = $("<div class='play-list'>"+
        "<div class='list-header'>播放列表</div>"+
        "<ul class='list-wrapper'></ul>" + 
        "<div class='close-btn'>关闭</div>"+
    '</div>')
    // 放置歌曲和名字
    function randerPlayList(data) {
        var html = ''
        for(var i = 0 ;i < data.length; i++) {
            html += "<li><h3>"+data[i].song+"-<span>"+data[i].singer+"</span></h3></li>"
        }
        $playList.find('ul').html(html)
        $scope.append($playList)
        bindEvent()
    }
    // 标记当前歌曲为红色，显示列表
    function show(control) {
        controlManager = control
        var index = controlManager.index
        $playList.addClass('show')
        signRed(index)
    }
    // 给当前歌曲添加class名称
    function signRed(index){
        $scope.find('.sign').removeClass('sign')
        $scope.find('li').eq(index).addClass('sign')
    }
    // 关闭按钮点击，点击当前li播放歌曲，并将列表隐藏
    function bindEvent() {
        $playList.find('.close-btn').on('click',function () {
            $playList.removeClass('show')
        })
        $playList.find('li').on('click',function () {
            var index = $(this).index()
            signRed(index)
            $scope.trigger('player:change',[index,true]) //true的作用是播放当前点击的歌曲
            controlManager.index = index
            setTimeout(function () {
                $playList.removeClass('show')
            },500)
            $scope.find('.play-btn').addClass('playing')
        })
    }
    root.playList = {
        randerPlayList:randerPlayList,
        show:show
    }
})(window.Zepto,window.player)