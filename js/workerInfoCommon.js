// JavaScript Document
var workerAddCard;
window.addEventListener("hashchange", function(){  //地址栏 向前 向后
   	var hash =  window.location.hash;
	hash =  ( hash.replace("#","")) ? "" : workerAddCard._hide();
	
},false);

var workerCommon ={
	areaList:[],//选择接单区域存放json
	workTypeList:[],//选择从业工种存放json
    mapApiPosition:function(id){
		//创建地图map
	    var html = $('<iframe id="mapPage" width="100%" height="100%" frameborder="0"  src="https://apis.map.qq.com/tools/locpicker?search=1&type=1&key=GOABZ-FLE33-DEG36-362YE-75EYJ-77B5Z&referer&referer=myapp"></iframe>').appendTo($(id));	
		   
	    window.addEventListener('message', function(event) {
        // 接收位置信息，用户选择确认位置点后选点组件会触发该事件，回传用户的位置信息
        var loc = event.data;
        if (loc && loc.module == 'locationPicker') {//防止其他应用也会向该页面post信息，需判断module是否为'locationPicker'
          document.getElementById("mapvalue").value=loc["poiaddress"];
		  document.getElementById("mapvalue").dataset['id']=loc["latlng"]['lat']+","+loc["latlng"]['lng']; 
          $("#selectCoor").html(loc["poiaddress"]);
		  workerAddCard._hide();
          return;
        }                                
    }, false); 	   
	},
	forTopHtml:function(opt){
		            var html="",idlist="";
					for(var i=0;i<opt.List.length;i++)
					{   
						html = i == (opt.List.length-1) ? html + opt.List[i]['name'] : html + opt.List[i]['name'] + ",";
						idlist = i == (opt.List.length-1) ? idlist + opt.List[i]['id'] : idlist + opt.List[i]['id'] + ",";
					}
					$(opt.inputid).val(idlist);
					return html;
	},
	select_AerList:function(boxId,List){
		$(boxId + " ul").on("click","li a",function(){
			var $this = $(this);
			var $index = $(boxId + " ul").find("a").index($this);
			if($this.hasClass("active")){
				 $this.removeClass("active");
				 for(var i=0;i<List.length;i++){
				 if(List[i]["id"]==$this.data("value"))
				    List.splice(i,1);
				 }
			}
			else{
				 $this.addClass("active");
				 List.push({"id":$this.data("value"),"name":$this.html()});
				 
			}
				
		})
	},
	select_Address:function(number){
	       
		  
	       var selectContactDom = $('#select_AreaInfo');
           var Select_province_name = $('#Select_province_name');
           var Select_city_name = $('#Select_city_name');
           var Select_district_name = $('#Select_district_name'); 
		   var nums = number == null ? 3:number;
           selectContactDom.bind('click', function () {
           var iosSelect = new IosSelect(nums, 
            [iosProvinces, iosCitys, iosCountys],
            {
                title: '所在地区选择',
                itemHeight: 30,
                relation: [1, 1, 0, 0],
                oneLevelId: Select_province_name.attr('data-id'),
                twoLevelId: Select_city_name.attr('data-id'),
                threeLevelId: Select_district_name.attr('data-id'),
                callback: function (selectOneObj, selectTwoObj, selectThreeObj) {
					Select_province_name.val(selectOneObj.value);
					Select_city_name.val(selectTwoObj.value);
					Select_district_name.val(selectThreeObj.value);
					Select_province_name.attr("data-id",selectOneObj.id);
					Select_city_name.attr("data-id",selectTwoObj.id);
					Select_district_name.attr("data-id",selectThreeObj.id);
					var strhtml = number == null ? selectThreeObj.value:"";
                    selectContactDom.html(selectOneObj.value + ' ' + selectTwoObj.value + ' ' + strhtml);
                }
             });
          });
	   	
	     },
		 areaListSelectShow:function(obj,boxid,List,inputid){
			 
		  workerAddCard = new AddWorkerInfo(boxid,{
		  showType: 2,
		  addClassNanme:"swipeLeft-block",
		  selectType:true,
		  selectBtn:"#sureBtn",
		  endCallback: function(e){
					obj.target.innerHTML=workerCommon.forTopHtml({List:List,inputid:inputid});
			  		workerAddCard._hide();	
		  }
		  });		  
	},
	goBackUrlShow:function(boxid){  // 弹窗注册协议，并且在地址栏后面动态加上#boxid,支持浏览器 返回 取消弹窗。

		 window.location.hash = boxid;
	   	 workerAddCard = new AddWorkerInfo("#"+boxid,{
		  showType: 4,
		  addClassNanme:"Fullscreena-block",
		  selectType:true,
		  selectBtn:"#sureBtn",
		  endCallback: function(e){
			  		workerAddCard._hide();
					window.location.hash = "";
		  }
		  });		  
	},
	btnDisable:function(e){  //数据提交后，按钮灰掉
		          e.target.disabled = "disabled";
                  e.target.value = '正在提交中...';
                  e.target.style.background='#ccc';
	}
		 
	
		
}
$(function(){
//选择坐标弹窗
$("#selectCoor").on("click",function(){
	   var bolMap =$("#mapBox");
	   if(bolMap.find("iframe").length==0){workerCommon.mapApiPosition("#mapBox");}else{}
	   workerAddCard = new AddWorkerInfo("#mapBox",{showType: 1});
})
//区域弹窗后选择
workerCommon.select_AerList("#select_AreaListBox",workerCommon.areaList);
//工种弹窗后选择
workerCommon.select_AerList("#select_WorkTypeListBox",workerCommon.workTypeList);
////选择接单区域弹窗
//$("#select_AerList").on("click",function(){
//	  
//	  
//	  
//	  var $this = $(this);
//        workerAddCard = new AddWorkerInfo("#select_AreaListBox",{
//		  showType: 2,
//		  addClassNanme:"swipeLeft-block",
//		  selectType:true,
//		  selectBtn:"#sureBtn",
//		  endCallback: function(e){
//					$this.html(workerCommon.forTopHtml({List:workerCommon.areaList,inputid:"#select_AerList_input"}));
//			  		workerAddCard._hide();	
//		  }
//		  });		  
//})

////选择工种类别弹窗
//$("#select_WorktypeList").on("click",function(){
//	  
//	  
//	  
//	  
//	  var $this = $(this);
//      workerAddCard = new AddWorkerInfo("#select_WorkTypeListBox",{
//		  showType: 2,
//		  addClassNanme:"swipeLeft-block",
//		  selectType:true,
//		  selectBtn:"#sureBtn",
//		  endCallback: function(e){
//					$this.html(workerCommon.forTopHtml({List:workerCommon.workTypeList,inputid:"#worktypeInput"}));
//			  		workerAddCard._hide();	
//		  }
//		  });		  
//})



})

