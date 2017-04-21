// JavaScript Document
var date = new Date();
if(date.getHours()>19){  //如果当前时间大于晚上21点后 ，让客户预约到明天
    date.setDate(date.getDate()+1);
}




var options = {
  el: document.getElementById("datehtml"),
  // 开始月期（默认开始日期是从当前月开始）
  start: Calendar.format(date, 'yyyy-MM-dd'),
  // 结束月期（默认是显示8个月）
  /*end: new Date(),
*/  //回调
  selectDate:{start:Calendar.format(date, 'yyyy-MM-dd')},
  startCallback: function (dateselect) {
    document.getElementById("dateTImes").value = Calendar.format(dateselect, 'yyyy-MM-dd');
    showBtna(dateselect);
  },
  // 离店点击回调
  /*endCallback: function (date) {
    const endDate = Calendar.format(date, 'yyyy年MM月dd日')
    console.log('离店时间', endDate)
  }*/
}
var calendar = new Calendar(options)
calendar.init();


var arrBtnAlink, btnAlinks = Array.prototype.slice.call(document.querySelectorAll("#dateTimesBox a")); 
btnAlinks.forEach(function(value,index){
   value.onclick=function(e){
       if(e.target.className=="active"){
        
       }else{
        [].forEach.call(document.querySelectorAll('#dateTimesBox .active'),el=>el.classList.remove('active'));
        e.target.classList.add("active");
        document.getElementById("timeHours").value = e.target.innerHTML;
        //Array.prototype.forEach.call(document.querySelectorAll('#dateTimesBox .active'),el=>el.classList.remove('active'));
       }
  
   }
})



onload = function(){
    document.getElementById("dateTImes").value = Calendar.format(date, 'yyyy-MM-dd');
    showBtna(date); 
}
function showBtna(dateselect){
    
    [].forEach.call(document.querySelectorAll('#dateTimesBox .active'),el=>el.classList.remove('active'));
    if(date.getHours()>=19||Calendar.format(dateselect,'yyyy,MM,dd')!=Calendar.format(date,'yyyy,MM,dd')){

        btnAlinks.forEach(function(value,index){
               value.setAttribute("show","block");
               value.style.display="block";
        })

    }
    else{
       
         btnAlinks.forEach(function(value,index){
            if(date.getHours()>=value.getAttribute("data-id")){
               value.setAttribute("show","hide");
               value.style.display="none";
            }
         })

    }
   




 /*   btnAlinks.forEach(function(value,index){
      if(date.getHours()>=19||Calendar.format(dateselect,'yyyy,MM,dd')!=Calendar.format(date,'yyyy,MM,dd')){
          value.style.display="block";
          value.setAttribute("show","block");
      }
      else{
        if(date.getHours()>=value.getAttribute("data-id")){
          value.setAttribute("show","hide");
          value.style.display="none";
        }
      }
    });*/

    document.querySelectorAll("#dateTimesBox a[show=block]")[0].classList.add("active");
    document.getElementById("timeHours").value = document.querySelectorAll("#dateTimesBox a[show=block]")[0].innerHTML; 
}
