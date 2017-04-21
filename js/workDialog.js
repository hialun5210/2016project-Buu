//author hailun
//creattime 2017/2/28
(function(window,doc){
    
    AddWorkerInfo = function (boxname,options){
        var that = this;
        that.objId = boxname;
        that.obj = typeof boxname == 'object' ? boxname : document.querySelector(boxname);
        //可选参数
        that.options = {
            showType : options.showType || 1, //弹窗的方式（1.居中弹窗；2：右边向左边滑出；3：底部向上滑出; 4:全屏弹窗）
            addClassNanme : options.addClassNanme || 'on', // 给浮动过来的div添加样式
            selectType : options.selectType || false , //是否多选
            modalBox : options.modalBox || "#leftmask", //遮罩层div
            closeBtn : options.closeBtn || "#floatDiv_closeWrap", //正常弹窗关闭按钮
            selectBtn : options.selectBtn || null, //弹出后点击按钮 进行回调函数
            endCallback : options.endCallback || null, //点击完回调函数
            disableBtn : options.disableBtn || false //是否隐藏关闭按钮及禁止关闭弹窗
		}
        that._init();
        
    }

    AddWorkerInfo.prototype = {
        //初始化
        _init:function(){
            var that = this;
            that._modaldialog();
            that._show();
			
        },
        //遮罩层div弹窗
        _modaldialog:function(){
            var that = this;
            var showModalClassName = that.options.showType == 2 ? "leftmask" : "leftmaskNoarr"; //如果是右边向左滑动的则会带》符号
            var box = $('<div class="'+ showModalClassName + '" style="z-index: 998;" id="leftmask" ></div>').appendTo(document.body);
			//$("body").css({"overflow-y":"hidden","height":"100%"});//弹窗后禁止body滚动
			$("body").addClass("ios-select-body-class"); 
            return box;

        },
        //显示需要弹窗的内容body
        _show:function(){
            var that = this;
            //that.obj.style.display = 'block';
			
            switch (that.options.showType) {
                case 1:
                var top = ($(window).height() > $(that.objId).height()) ?  ($(window).height() - $(that.objId).height())/2 + $("body").scrollTop() : 60;
				$(that.objId).css({"top":top});
				that.options.disableBtn == true ? " " : (that._addCloseBtn()); 
                break;
                case 2:
                that.options.addClassNanme =  that.options.addClassNanme == " " ? 'swipeLeft-block' : that.options.addClassNanme;
                break;
                case 3:
                that.options.addClassNanme =  that.options.addClassNanme == " " ? 'swipeTop-block' : that.options.addClassNanme;
				case 4:
				that.options.addClassNanme =  that.options.addClassNanme == " " ? 'Fullscreena-block' : that.options.addClassNanme;
                break;
            }
            that._clickCloseBtn();
            that.obj.classList.add(that.options.addClassNanme); //浮动div出来添加样式
            that._clickSelectDom(); // 添加点击事件

        },
        _hide:function(){
            var that = this;
            that.obj.classList.remove(that.options.addClassNanme); //删除弹窗的浮动样式
            //that.obj.style.display = "none"; //隐藏弹窗box
            $(that.options.modalBox).remove(); //删除遮罩层div
            if(that.options.closeBtn) //如果有关闭按钮 也一起删除
            {
                 $(that.options.closeBtn).remove();
            }
			//$("body").css({"overflow-y":"auto","height":"auto"});
			$("body").removeClass("ios-select-body-class"); 

        },
        _addCloseBtn:function(){
             var that = this;
             var closeBtnbox = $('<div id="floatDiv_closeWrap" style="display:block"><em id="floatDiv_closeWrap_a">&nbsp;</em><em id="floatDiv_closeWrap_b">&nbsp;</em></div>').appendTo(document.body);

             $('#floatDiv_closeWrap').on('click',function(){
                 that._hide();
             })
             return closeBtnbox;

        },
        _clickCloseBtn:function(){
            var that = this;
            that.obj.onclick = function(e){
                e.stopPropagation();
            }
            document.querySelector(that.options.modalBox).onclick=function(){
              that.options.disableBtn == true ? "": that._hide();
            }
            that.options.closeBtn.onclick=function(){
                that._hide();
            }
        },
        _clickSelectDom:function(){
			var that = this;
            var btnClickDom = null;
            if(that.options.selectBtn){//如果设置了点击按钮或者不是居中方式弹窗的
            //如果是多选，直接返回按钮点击； 如果是单选则返回点击单个a标签返回回调函数
                btnClickDom = that.options.selectType||that.options.showType==1 ?  $(that.objId).find(that.options.selectBtn):$(that.objId).find('ul li a');

                btnClickDom.bind("click",function(e){
                var $this = $(this);
				if(that.options.selectType==false)
				$this.hasClass("active") ? " ":$this.addClass("active").parent().siblings().find("a").removeClass("active");
                if(that.options.endCallback && typeof(that.options.endCallback) === "function" ){
                     that.options.endCallback($this); //返回当前选择的事件
                }
               
                })

			}

        }

  }
})(window,document)
