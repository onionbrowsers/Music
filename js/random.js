//渲染歌曲信息
(function ($,root) {
    // 用$scope来代替body
    var $scope =  $(document.body)
    // 动态生成歌曲信息的描述
    function randerInfo(info) {
        var html = '<div class="song-name">'+info.song+'</div>' +
        '<div class="singer-name">'+info.singer+'</div>' +
        '<div class="album-name">'+info.album+'</div>'
        $scope.find('.song-info').html(html)
    }
    // 动态生成图片信息
    function randerImg(url) {
        var img = new Image();
        img.onload = function () {
            $scope.find('.song-img img').attr('src',url)
            root.blurImg(img,$scope)
        }
        img.src = url
    }
    // 将立即执行函数的接口暴露到外部
    root.rander = function (data) {
        randerInfo(data);
        randerImg(data.image);
    }
})(window.Zepto,window.player)