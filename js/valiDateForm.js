//title:文本框验证表达式
//auto:hailun
//time:2017-3-15

(function(window,doc){
    
    validate = function (){
      this.tip="";
	  this.idcardReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; //身份证
	  this.phone =  /^((1[3,5,8])|(14)|(17))\d{9}$/; //手机号
	  this.email = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/; //邮箱
	  this.number=/^[0-9]*$/; //只能输入数字
	  this.inputReg();
    }
   

   validate.prototype = {
	   
	    inputReg:function(){
			
			var that = this;
			var inputLists=[].slice.call(document.querySelectorAll('input[reg]'));  //找出文本框后面带有reg  验证标识的 
            inputLists.forEach(function(value,index){
            var reg = value.getAttribute("reg") || null;
            value.addEventListener("keyup", function(event){
				
			  switch (reg) {
				case  "number"  :
				value.value = event.target.value.replace(/[^\d]/g,'');  // 如果不匹配数字 ，则清空输入的文字
			    }	 	
				
             // if(reg){
//                  that[reg].test(value.value) ? "" : value.value = "" ;
//              }
            }, false)
          
          
          
     })
		},
	    showTip:function(text,cb){
          /* if (g_tips) {
		   window.clearTimeout(g_tips);
		   $(".showtips").remove();
		   g_tips = false;
	      }*/
	      var newTips = $("<div>");
	      $("body").append(newTips);
          newTips.addClass('showtips');
	      newTips.text(text);
	      window.setTimeout(function() {
		      newTips.addClass('active');
	      }, 10);
	      g_tips = window.setTimeout(function() {
		  $(".showtips").remove();
		  if(cb){
			cb();
		  }
	      }, 3000);	
			
		},
	    isValEmpty: function(e,text) { //text 跟 文本框属性 tip 必须选填一个；
			var that = this;
			that.tip = text == null ? e.attr("tip"):text; //以text 为主
            return ((e.val()=="")||(e.val()==" ")) ? (text == null ? (that.showTip(that.tip+"不能为空哦"),e.focus(),0):that.showTip(text)) : !0;
        },
        isPhone: function(e) {
            var that = this,r = $.trim(e.val())
              , t=that.phone; 
            if(this.isValEmpty(e)){
				return t.test(e.val()) ? !0 : (that.showTip("手机号码格式不正确"),e.focus(),0);
			}
			else 
			{
			   return 0;
			}
			
        },
		isEmail: function(e) {
            var that = this,r = $.trim(e.val())
              , t=that.email; 
            if(this.isValEmpty(e)){
				return t.test(e.val()) ? !0 : (that.showTip("邮箱输入格式不正确"),e.focus(),0);
			}
			else 
			{
			   return 0;
			}
			
        },
		length:function(e,opt){
			var that = this;
			this.minw = opt.minw == null ? 1:opt.minw;
			this.maxw = opt.maxw == null ? 50:opt.maxw;
			//this.text = opt.text == null ? "":opt.text;
			
			if(e.val().length<this.minw || e.val().length>this.maxw)
			{
			    that.showTip(that.tip+"字数必须在"+this.minw +"到"+this.maxw+"之间哦");e.focus();return 0;	
			}  
			
			return !0;  
			 
		},
		name:function(e,text){  //text 跟 文本框属性 tip 必须选填一个；
			 var that = this,r = $.trim(e.val());
			 if(this.isValEmpty(e)){
				return that.length(e,{minw:2,maxw:10});
			 }
			 else{
				 return 0; 
		     }
		},
		idCard:function(e){
			var that = this;
			if(this.isValEmpty(e)){
				 return that.idcardReg.test(e.val()) ? !0 : (that.showTip(that.tip+"格式不正确"),e.focus(),0);
			}
			return 0;
		},
        checkPswdLen: function(e) {
            return e.length < 6 || e.length > 16 ? !1 : !0
        }
   }
	
})(window,document)
