(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.Calendar = factory());
}(this, (function () { 'use strict';

function noop() {}





function extend(to, _from) {
  for (var key in _from) {
    _from[key] !== undefined && (to[key] = _from[key]);
  }
  return to;
}

function zeroPadding(_num) {
  var num = +_num;
  if (num < 10) {
    num = '0' + num;
  }
  return num;
}

function isLeapYear(year) {
  return !(year % (year % 100 ? 4 : 400));
}

var getCurTime = function getCurTime(_date) {
  var date = _date || new Date();
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate()
  };
};

function format$1(date, fmt) {
  var o = {
    'y+': date.getFullYear(),
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    'S+': date.getMilliseconds()
  };
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      if (k === 'y+') {
        fmt = fmt.replace(RegExp.$1, ('' + o[k]).substr(4 - RegExp.$1.length));
      } else if (k === 'S+') {
        var lens = RegExp.$1.length;
        lens = lens === 1 ? 3 : lens;
        fmt = fmt.replace(RegExp.$1, ('00' + o[k]).substr(('' + o[k]).length - 1, lens));
      } else {
        fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
      }
    }
  }
  return fmt;
}

var header = function header() {
  return '<ul class="calendar-bar"><li>\u65E5</li><li>\u4E00</li><li>\u4E8C</li><li>\u4E09</li><li>\u56DB</li><li>\u4E94</li><li>\u516D</li></ul>';
};

var monthTitle = function monthTitle(title) {
  return '<h1 class="calendar-title">' + title + '</h1>';
};

var dayItem = function dayItem(type, text) {
  var remark = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var value = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
  var index = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '';

  if (!text) return '<li class="' + type + '"></li>';
  return '<li data-index="' + index + '" data-date="' + value + '" class="' + type + '"><span class="calendar-text">' + text + '</span><span class="calendar-remark">' + remark + '</span></li>';
};

var daySelect = function daySelect(day, type, typeText) {
  return '<div class="calendar-day-select select-' + type + '"><span class="day">' + day + '</span><span class="text">' + typeText + '</span><div class="elem-proxy"></div></div>';
};

var jan = {
  days: 31,
  fest: { 1: '元旦', 5: '腊八', 20: '小年', 27: '除夕', 28: '春节' },
  holidays: { 1: true, 2: true, 27: true, 28: true, 29: true, 30: true, 31: true },
  workdays: { 22: true }
};

var feb = {
  days: isLeapYear(new Date().getFullYear()) ? 29 : 28,
  fest: { 11: '元宵节', 14: '情人节' },
  holidays: { 1: true, 2: true },
  workdays: { 4: true }
};

var mar = {
  days: 31,
  fest: { 8: '妇女节' },
  holidays: {},
  workdays: {}
};

var apr = {
  days: 30,
  fest: { 4: '清明节' },
  holidays: { 2: true, 3: true, 4: true, 29: true, 30: true },
  workdays: { 1: true }
};

var may = {
  days: 31,
  fest: { 1: '劳动节', 14: '母亲节', 30: '端午节' },
  holidays: { 1: true, 28: true, 29: true, 30: true },
  workdays: { 27: true }
};

var jun = {
  days: 30,
  fest: { 1: '儿童节', 18: '父亲节' },
  holidays: {},
  workdays: {}
};

var jul = {
  days: 31,
  fest: { 1: '建党节' },
  holidays: {},
  workdays: {}
};

var aug = {
  days: 31,
  fest: { 1: '建军节', 28: '七夕节' },
  holidays: {},
  workdays: {}
};

var sep = {
  days: 30,
  fest: { 5: '中元节', 10: '教师节' },
  holidays: {},
  workdays: { 30: true }
};

var oct = {
  days: 31,
  fest: { 1: '国庆节', 4: '中秋节', 28: '重阳节', 31: '万圣节' },
  holidays: { 1: true, 2: true, 3: true, 4: true, 5: true, 6: true, 7: true, 8: true },
  workdays: {}
};

var nov = {
  days: 30,
  fest: { 23: '感恩节' },
  holidays: {},
  workdays: {}
};

var dec = {
  days: 31,
  fest: { 24: '平安夜', 25: '圣诞节' },
  holidays: {},
  workdays: {}
};

var data = [jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec];

var _getCurTime = getCurTime();
var year = _getCurTime.year;
var month = _getCurTime.month;
var day = _getCurTime.day;

function getEnd(_month) {
  var months = 12;
  var endMonth = month + _month;
  var date = new Date();
  if (endMonth > months) {
      year = date.getFullYear() + 1 ;
      endMonth = endMonth - 12;
  }
  var endDay = data[endMonth - 1].days;
  return year + '-' + zeroPadding(endMonth) + '-' + zeroPadding(endDay);
}

function getDefaultOptions() {
  return {
    data: data,
    el: document.body,
    start: year + '-' + zeroPadding(month) + '-' + zeroPadding(day),
    end: getEnd(5),
    startCallback: noop,
    endCallback: noop,
    selectDate: {},
    maxDays: false,
    maxCallback: noop
  };
}

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

















var set = function set(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
};

var Calendar = function () {
  function Calendar(options) {
    classCallCheck(this, Calendar);

    this.options = extend(getDefaultOptions(), options);
    this.props = {
      holidayText: '休',
      workdayText: '班',
      startText: (this.options.multiple==false||this.options.multiple==null) ? '预约' : '开始',
      endText:  this.options.endText==null? '结束' : this.options.endText, 
      singleText :  this.options.singleText==null ? '预约' : this.options.singleText, 
    };
    this.el = this.options.el;
    this.startDate = new Date(this.options.start);
    this.endDate = new Date(this.options.end);
    this.multiple = this.options.multiple == null ? false : this.options.multiple;
    this.data = this.options.data;


    this.isMoving = false;
    this.touchStartTime = null;
    this.start = {};
    this.end = {};
    this.selectDayElems = [];
  }

  createClass(Calendar, [{
    key: 'init',
    value: function init() {
      var _this = this;

      var html = this.create();
      this.render(html);
      setTimeout(function () {
        _this.attachEvent();
        var _options$selectDate = _this.options.selectDate,
            start = _options$selectDate.start,
            end = _options$selectDate.start;

        if (start && end) {
          _this.selectDate(start, end);
        }
      }, 10);
    }
  }, {
    key: 'create',
    value: function create() {
      var months = this.createMonths();
      var haeder = header();
      return '\n      ' + haeder + '\n      <div class="calendar-items">\n        ' + months + '\n      </div>\n    ';
    }
  }, {
    key: 'createMonths',
    value: function createMonths() {
      var _this2 = this;

      var year = this.startDate.getFullYear();
      var endyear = this.endDate.getFullYear();
      var startMonth = this.startDate.getMonth() + 1;
      var endMonth = this.endDate.getMonth() + 1;
      var monthsHtml = "";
      var isyears = endyear - year;

      for(var i=0;i< isyears+1;i++){
                
                // 遍历月期
                var months = this.data.map(function (item, index) {
                var month = index + 1;

               
                if(isyears>=1){

                    if(i==0){
                      if (!item.days || startMonth > month ) return '';
                    }
                    else if(i==isyears){
                      if (!item.days || endMonth < month ) return '';
                    }
                }
                else{

                    if (!item.days || startMonth > month || endMonth < month) return '';

                }    

 



                // 标题
                var title = monthTitle((year+i) + '\u5E74' + zeroPadding(month) + '\u6708');
                // 天
                var days = _this2.createDays(year+i, month);
                    return '<section class="calendar-month">' + title + '<ul class="calendar-days">' + days + '</ul></section>';
                });
               
                monthsHtml= monthsHtml + months.join('');
              
      }
     
      return monthsHtml;
    }
  }, {
    key: 'createDays',
    value: function createDays(year, month) {
      var date = new Date(year, month - 1, 1);
      var curMonthData = this.data[month - 1];
      var preDayCount = date.getDay();
      var isStartMonth = this.monthType('start', month);
      var isEndMonth = this.monthType('end', month);
      var preDayCounter = preDayCount;
      var days = [];
      var startyear = this.startDate.getFullYear();
      var endyear = this.endDate.getFullYear();
      // 记录每月开始前的补齐数量
      this.data[month - 1].preDayCount = preDayCount;
      // 补齐当前月开始前的日期
      while (preDayCounter-- > 0) {
        days.push(dayItem('disabled', '', ''));
      } // 当前日
      var day = 1;
      // 日期循环
      while (day <= curMonthData.days) {
        var value = year + '-' + zeroPadding(month) + '-' + zeroPadding(day);
        var type = this.dayType(year, month, day);
        var text = curMonthData.fest[day] || day;
        // 禁用日期

        
var isyears = endyear - startyear;



    if(isyears==0){
        if (isStartMonth && day < this.startDate.getDate() || isEndMonth && day > this.endDate.getDate()) {
          type += ' disabled';
        } else if (this.isToday(year, month, day)) {
          type += ' today';
          text = '今天';
        }
    }else {

        if(endyear==year){

                if (isEndMonth && day > this.endDate.getDate()) {
                  type += ' disabled';
                } else if (this.isToday(year, month, day)) {
                  type += ' today';
                  text = '今天';
                }  
         }
         else{

               if (this.isToday(year, month, day)) {
                  type += ' today';
                  text = '今天';
                }    
         }  

    }

        var remark = this.isHoliday(month, day) ? this.props.holidayText : this.isWorkDay(month, day) ? this.props.workdayText : '';
        var index = day + preDayCount - 1;
        days.push(dayItem(type.trim(), text, remark, value, index));
        day++;
      }
      return days.join('');
    }
  }, {
    key: 'render',
    value: function render(html) {
      var content = document.createElement('div');
      content.className = 'calendar-content';
      content.innerHTML = html;
      this.contentEl = content;
      this.el.appendChild(content);
    }
  }, {
    key: 'attachEvent',
    value: function attachEvent() {
      this.contentEl.addEventListener('touchstart', this, false);
      this.contentEl.addEventListener('touchmove', this, false);
      this.contentEl.addEventListener('touchend', this, false);
    }
  }, {
    key: 'handleEvent',
    value: function handleEvent(e) {
      var calendar = this;
      switch (e.type) {
        case 'touchstart':
          calendar.touchstart(e);
          break;
        case 'touchmove':
          calendar.touchmove(e);
          break;
        case 'touchend':
          calendar.touchend(e);
          break;
      }
    }
  }, {
    key: 'touchstart',
    value: function touchstart(e) {
      this.touchStartTime = Date.now();
    }
  }, {
    key: 'touchmove',
    value: function touchmove(e) {
      // 置0防止拖动的时候选中日期
      this.touchStartTime = 0;
    }
  }, {
    key: 'touchend',
    value: function touchend(e) {
      var time = Date.now() - this.touchStartTime;
      if (time > 500) return;
      var targetEl = e.target;
      var targetAttr = targetEl.getAttribute('data-date');
      if (targetAttr) {
        this.chooseDay(targetEl, targetAttr);
      } else {
        var parent = Calendar.getParent(targetEl);
        var parentAttr = parent.getAttribute('data-date');
        if (parentAttr) {
          this.chooseDay(parent, parentAttr);
        } else {
          var dayElem = Calendar.getParent(parent);
          var dayAttr = dayElem.getAttribute('data-date');
          if (dayAttr) {
            this.chooseDay(dayElem, dayAttr);
          }
        }
      }
    }
  }, {
    key: 'chooseDay',
    value: function chooseDay(el, dateStr) {
      if (el.className.indexOf('disabled') !== -1) return;
      // 已选择入住和离店，则重置状态

      if(this.multiple&&this.start.html&&this.end.html){
         this.reset();
      }
      if (!this.multiple&&this.start.html) {
        this.reset();
      }
      var index = +el.getAttribute('data-index');
      var date = new Date(dateStr);

      var month = date.getMonth() + 1;
      if (this.start.index === index) {
        // 取消选择入住时间
        this.reset();
      } else if (!this.start.html) {
        // 选择入住时间


        
               this.setDayState(el, 'start', index);
          

   
        // 入住回调
        this.options.startCallback.call(this, date);
      } else {


         


        var startyears = this.start.date.getFullYear(); 
        var endyears = date.getFullYear();

     

       // 选择离店时间
        var startMonth = this.start.date.getMonth() + 1;
        // 当前日期所在的月份节点
        var curMonthElem = Calendar.getParent(el);
        // 当前选择的月份所有日期节点
        var daysElems = curMonthElem.getElementsByTagName('li');
       // if (month !== startMonth || startyears!=endyears) {
          // 跨月选择
          // 离店日期小于入住日期则不做任何操作, 因为是跨月选择，所以这里用月份判断
         /* if (month < startMonth) return false;
          if (!this.isValidMaxDays(this.start.date, date)) {
            this.options.maxCallback.call(this, this.start.date, date);
            return false;
          }
          // 第一个月份节点
          var startMonthElem = Calendar.getParent(this.start.el);
          var startDaysElems = startMonthElem.getElementsByTagName('li');
          // 设置离店样式*/
           if(date<this.start.date){return ;}
           else{this.setDayState(el, 'end', index);}
           
          /*// 找出第一个月选择的日期节点
          this.findSelectDayElems(startDaysElems, this.start.index, startDaysElems.length - 1);
          // 找出中间月份的的日期节点
          var curTime = getCurTime();
          var monthCount = month - startMonth;
          var monthsElems = this.el.querySelectorAll('.calendar-days');
          for (var i = 1; i < monthCount; i++) {
            var elems = monthsElems[startMonth - curTime.month + i].getElementsByTagName('li');
            this.findSelectDayElems(elems, 0, elems.length - 1);
          }
          // 找出结束的节点*/
          //this.findSelectDayElems(daysElems, 0, index);
          // 给选中的日期节点添加class
          //this.selectDayStyle({ type: 'add', className: 'active' });
       /* } else {
          // 同月选择
          // 离店日期小于入住日期则不做任何操作
          if (this.start.index > index) return false;
          if (!this.isValidMaxDays(this.start.date, date)) {
            this.options.maxCallback.call(this, this.start.date, date);
            return false;
          }
          // 设置离店样式
          this.setDayState(el, 'end', index);*/
         /* // 找出开始到结束选中的日期节点
          this.findSelectDayElems(daysElems, this.start.index, index);
          // 给选中的日期节点添加class
          this.selectDayStyle({ type: 'add', className: 'active' });*/
        //}
        // 离店回调
        this.options.endCallback.call(this, date, this.getSelectNumberOfDays(this.start.date, date));
      }
    }

    // 是否有超过最大天数

  }, {
    key: 'isValidMaxDays',
    value: function isValidMaxDays(startDate, endDate) {
      if (typeof this.options.maxDays === 'boolean') return true;
      return this.getSelectNumberOfDays(startDate, endDate) < this.options.maxDays;
    }

    // 获取选择的天数

  }, {
    key: 'getSelectNumberOfDays',
    value: function getSelectNumberOfDays(startDate, endDate) {
      var startTime = getCurTime(startDate);
      var startMonth = startTime.month;
      var startDay = startTime.day;
      var endTime = getCurTime(endDate);
      var endMonth = endTime.month;
      var endDay = endTime.day;
      return startMonth === endMonth ? endDay - startDay : this.data[startMonth - 1].days - startDay + endDay;
    }
  }, {
    key: 'selectDate',
    value: function selectDate(startDateStr, endDateStr) {
      if (this.start.html) {
         this.reset();
      }
      var firstMonth = this.startDate.getMonth() + 1;
      var monthsElems = this.el.querySelectorAll('.calendar-days');
      // 入住时间
      var startDate = new Date(startDateStr);
      var startMonth = startDate.getMonth() + 1;
      var startDay = startDate.getDate();
      var startIndex = startDay + this.data[startMonth - 1].preDayCount - 1;
      var startDaysElems = monthsElems[startMonth - firstMonth].getElementsByTagName('li');

      // 离店时间
      var endDate = new Date(endDateStr);
      var endMonth = endDate.getMonth() + 1;
      var endDay = endDate.getDate();
      var endIndex = endDay + this.data[endMonth - 1].preDayCount - 1;

      var startElem = startDaysElems[startIndex];
      var endElem = null;
      // 跨月
      if (startMonth !== endMonth) {
        var endDaysElems = monthsElems[endMonth - firstMonth].getElementsByTagName('li');
        var monthCount = endMonth - startMonth;
        endElem = endDaysElems[endIndex];
        // 当前住店的月期
        this.findSelectDayElems(startDaysElems, startIndex, startDaysElems.length - 1);
        for (var i = 1; i < monthCount; i++) {
          var elems = monthsElems[startMonth - firstMonth + i].getElementsByTagName('li');
          this.findSelectDayElems(elems, 0, elems.length - 1);
        }
        // 当前离店的月期
        this.findSelectDayElems(endDaysElems, 0, endIndex);
      } else {
        endElem = startDaysElems[endIndex];
        this.findSelectDayElems(startDaysElems, startIndex, endIndex);
      }
      this.selectDayStyle({ type: 'add', className: 'active' });
      this.setDayState(startElem, 'start', startIndex);
     
    }
  }, {
    key: 'reset',
    value: function reset() {
      this.start.el.innerHTML = this.start.html;
      this.end.html && (this.end.el.innerHTML = this.end.html);
      this.start = {};
      this.end = {};
      this.selectDayStyle({ type: 'remove', className: 'active' });
      this.selectDayElems = [];
    }
  }, {
    key: 'findSelectDayElems',
    value: function findSelectDayElems(daysElems, startIndex, endIndex) {
      var _this3 = this;

      Calendar.forEach(daysElems, function (elem, elemIndex) {
        if (elemIndex > endIndex) return false;
        if (elemIndex >= startIndex && elemIndex <= endIndex) {
          _this3.selectDayElems.push(elem);
        }
        return true;
      });
    }

    // 给选中的日期添加class

  }, {
    key: 'selectDayStyle',
    value: function selectDayStyle(state) {
      Calendar.forEach(this.selectDayElems, function (elem, elemIndex, elemLength) {
        if (elemIndex !== 0 && elemIndex !== elemLength - 1) {
          elem.classList[state.type](state.className);
        }
        return true;
      });
    }

    // 设置入住和离店显示状态

  }, {
    key: 'setDayState',
    value: function setDayState(el, type, index) {
      var date = new Date(el.getAttribute('data-date'));
      var day = date.getDate();
      this[type] = { html: el.innerHTML, date: date, index: index, el: el };
      el.innerHTML = daySelect(day, type, this.props[type + 'Text']);
    }
  }, {
    key: 'dayType',
    value: function dayType(year, month, day) {
      var type = [];
      this.isHoliday(month, day) && type.push('holiday');
      this.isFest(month, day) && type.push('fest');
      this.isWeekend(year, month, day) && type.push('weekend');
      this.isWorkDay(month, day) && type.push('workday');
      return type.join(' ');
    }
  }, {
    key: 'monthType',
    value: function monthType(name, month) {
      var date = this[name + 'Date'];
      return date.getMonth() + 1 === month;
    }

    // 是否休息日

  }, {
    key: 'isHoliday',
    value: function isHoliday(month, day) {
      return this.data[month - 1].holidays[day];
    }
    // 是否工作日

  }, {
    key: 'isWorkDay',
    value: function isWorkDay(month, day) {
      return this.data[month - 1].workdays[day];
    }
    // 是否节日

  }, {
    key: 'isFest',
    value: function isFest(month, day) {
      return this.data[month - 1].fest[day];
    }
    // 是否是周末

  }, {
    key: 'isWeekend',
    value: function isWeekend(year, month, day) {
      var curMonth = month - 1;
      var date = new Date(year, zeroPadding(curMonth), zeroPadding(day));
      var curDay = date.getDay();
      return curDay === 0 || curDay === 6;
    }
    // 是否是当前月

  }, {
    key: 'isCurMonth',
    value: function isCurMonth(_year, _month) {
      var _getCurTime = getCurTime(),
          year = _getCurTime.year,
          month = _getCurTime.month;

      return _year === year && _month === month;
    }
    // 是否是今天

  }, {
    key: 'isToday',
    value: function isToday(_year, _month, _day) {
      var _getCurTime2 = getCurTime(),
          year = _getCurTime2.year,
          month = _getCurTime2.month,
          day = _getCurTime2.day;

      return _year === year && _month === month && _day === day;
    }
  }], [{
    key: 'getParent',
    value: function getParent(el) {
      var parent = el.parentNode;
      if (parent && parent.nodeType !== 11) {
        return parent;
      }
      return false;
    }
  }, {
    key: 'forEach',
    value: function forEach(obj, callback) {
      var i = 0;
      var length = obj.length;
      for (i; i < length; i++) {
        if (!callback(obj[i], i, length)) break;
      }
    }
  }, {
    key: 'format',
    value: function format(date, tpl) {
      return format$1(date, tpl);
    }
  }]);
  return Calendar;
}();

return Calendar;

})));
