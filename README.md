**此页面集合日历，仿iosselect，各种弹窗（居中，右向左滑，全屏等），form表单的多个验证等js效果**

# - # **## 请在手机上访问 效果更佳！**

预览地址：https://hialun5210.github.io/2016project-Buu/

 <img src="https://github.com/hialun5210/2016project-Buu/blob/master/demo.png?raw=true" style="margin-left:30px" />

1.弹窗的调用方法：
     
` 
```
workerAddCard = new AddWorkerInfo(boxid,{
showType: 2,  // //弹窗的方式（1.居中弹窗；2：右边向左边滑出；3：底部向上滑出; 4:全屏弹窗
addClassNanme:"swipeLeft-block",
selectType:true,
selectBtn:"#sureBtn",
endCallback: function(e){
//回调函数
}
```


2.form表单js验证

`validate = new validate();`
```
validate.isValEmpty()//验证是否为空
validate.length(e,{minw:2,maxw:10}) //输入的文字必须在 2-10 之间  参数可以自己设置
validate.isEmail 代表验证邮箱格式

**文本框属性说明**

<input type="tel" maxlength="11"   placeholder="请填写手机号码" reg="number" tip="手机号码"/>

# _文本框属性详细说明

// “reg=number”  代表只能输入数字，输入其他则自动删除
//tip=“手机号不能为空”    代表文本框验证不通过所提示的信息
```

3.图片预览

```  
imageViewerOpition({className:".img-list"});
```
.img-list  可以自己定义样式设置，设置后将会以此样式为单位相册预览
```

4.日历
5.select仿ios，滑动多选
