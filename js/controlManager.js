// 将index打包为一个模块，外界无法随意更改

(function ($,root) {
    // 将data.length传进参数，以便于后面getindex函数试用
    function controlManager(length) {
        this.index = 0;
        this.length = length;
    }
    // 将方法写在原型上去以构造函数方法调用
    controlManager.prototype = {
        // 下一首
        next:function () {
            return this.getIndex(1)
        },
        // 上一首
        prev:function () {
            return this.getIndex(-1)
        },
        // 获取index
        getIndex : function (n) {
            var index = this.index
            var length = this.length
            var curIndex = (index + n + length) % length //算法
            this.index = curIndex
            return curIndex
        }
    }
    // 暴漏接口
    root.controlManager = controlManager
})(window.Zepto,window.player)