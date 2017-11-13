/**
 * created by zhudan 2017/11/13
 * a  calendar plugins
 */
var Calendar = (function() {
    // 存储HTML结构和样式
    var domStr = '<div class="title">' +
        '<h1 class="green" id="calendar-month">Month</h1>' +
        '<h2 class="green small" id="calendar-year">Year</h2>' +
        '<a href="#" class="pre lightgrey" id="m-prev">&lt;</a>' +
        '<a href="#" class="next lightgrey" id="m-next">&gt;</a>' +
        '<a href="#" class="y-pre lightgrey" id="y-prev">&lt;&lt;</a>' +
        '<a href="#" class="y-next lightgrey" id="y-next">&gt;&gt;</a>' +
        '</div>' +
        '<div class="body">' +
        '<div class="lightgrey body-list">' +
        '<ul id="calendar-title">' +
        '<li>MON</li>' +
        '<li>TUE</li>' +
        '<li>WEN</li>' +
        '<li>THU</li>' +
        '<li>FRI</li>' +
        '<li>SAT</li>' +
        '<li>SUN</li>' +
        '</ul>' +
        '<div class="darkgrey body-list">' +
        '<ul id="days">' +
        '</ul>' +
        '</div>' +
        '</div>' +
        '<style>' +
        'a {' +
        '  text-decoration: none;' +
        '}' +
        '.calendar {' +
        '  position: absolute;' +
        '  top: 0;' +
        '  left: 0;' +
        '  width: 350px;' +
        '  height: 300px;' +
        '  background: #fff;' +
        '  border: 1px solid #a8a8a8;' +
        '}' +
        '.title {' +
        '  position: relative;' +
        '  padding: 3px 0;' +
        '  text-align: center;' +
        '  border-bottom: 1px solid #ccc;' +
        '}' +
        '.title h1 {' +
        '  font-size: 20px;' +
        '}' +
        '.title h2 {' +
        '  font-size: 14px;' +
        '}' +
        '.pre,' +
        '.next,' +
        '.y-pre,' +
        '.y-next {' +
        '  position: absolute;' +
        '  top: 50%;' +
        '  transform: translateY(-50%);' +
        '  -webkit-transform: translateY(-50%);' +
        '  -moz-transform: translateY(-50%);' +
        '  -ms-transform: translateY(-50%);' +
        '  -o-transform: translateY(-50%);' +
        '  font-size: 18px;' +
        '}' +
        '.pre {' +
        '  left: 10px;' +
        '}' +
        '.next {' +
        '  right: 10px;' +
        '}' +
        '.y-pre {' +
        '  left: 30px;' +
        '}' +
        '.y-next {' +
        '  right: 30px;' +
        '}' +
        '.body-list ul {' +
        '  width: 100%;' +
        '  font-family: arial;' +
        '  font-weight: bold;' +
        '  font-size: 14px;' +
        '}' +
        '.body-list ul li {' +
        '  display: block;' +
        '  width: 14.28%;' +
        '  height: 36px;' +
        '  line-height: 36px;' +
        '  list-style: none;' +
        '  box-sizing: border-box;' +
        '  float: left;' +
        '  text-align: center;' +
        '}' +
        '.lightgrey {' +
        '  color: #a8a8a8;' +
        '}' +
        '.darkgrey {' +
        '  color: #565656;' +
        '}' +
        '.green {' +
        '  color: #6ac13c;' +
        '}' +
        '.pointer {' +
        '  cursor: pointer;' +
        '}' +
        '.not-allow {' +
        '  cursor: not-allowed;' +
        '}' +
        '.greenbox {' +
        '  border: 1px solid #6ac13c;' +
        '  background: #e9f8df;' +
        '}' +
        '</style>';

    var month_olympic = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // 闰年的每个月的天数
    var month_normal = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // 平年每个月的天数
    var month_name = ['January', 'Febrary', 'March', 'April', 'May', 'June', 'July', 'Auguest', 'September', 'October', 'November', 'December']; // 英文的每个月的名称
    var month_name_ch_zn = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']; // 中文的每个月的名称
    var day_name = ['MON', 'TUE', 'WEN', 'THU', 'FRI', 'SAT', 'SUN']; // 英文的1个星期名称
    var day_name_ch_zn = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']; // 中文的一个星期的名称
    
    // 动态添加日历组件到页面
    var body = document.getElementsByTagName("body")[0];
    var calendarEl = document.createElement("div");
    calendarEl.className = 'calendar';
    calendarEl.id = 'calendar';
    calendarEl.innerHTML = domStr;
    body.appendChild(calendarEl);
    calendarEl.style.display = "none";

    // 存储一些全局变量
    var holder = document.getElementById("days");
    var title = document.getElementById('calendar-title');
    var month = document.getElementById("calendar-month");
    var year = document.getElementById("calendar-year");
    var m_prev = document.getElementById('m-prev');
    var m_next = document.getElementById('m-next');
    var y_prev = document.getElementById('y-prev');
    var y_next = document.getElementById('y-next');
    var my_date = new Date();
    var my_year = my_date.getFullYear();
    var my_month = my_date.getMonth();
    var my_day = my_date.getDate();

    /**
     * [hasClass 判断元素中是否含有某个类]
     * @param  {[type]}  el        [元素]
     * @param  {[type]}  className [类名]
     * @return {Boolean}           [description]
     */
    function hasClass(el, className) {
        var reg = new RegExp('(^|\\s+)' + className + '($|\\s+)');
        return reg.test(el.className);
    }
    /**
     * [autoZero 位数不够补零]
     * @param  {[type]} num    [原数字]
     * @param  {[type]} length [保留数字长度]
     * @return {[type]}        [description]
     */
    function autoZero(num, length) {
        return ('00000' + num).substr(-length);
    }
    /**
     * [dayStart 获取给定日期所在月的某一天对应的星期]
     * @param  {[type]} month [月份]
     * @param  {[type]} year  [年]
     * @param  {[type]} day   [某一天]
     * @return {[type]}       [description]
     */
    function dayStart(month, year, day) {
        var temDate = new Date(year, month, day);
        return temDate.getDay();
    }
    
    /**
     * [dayMonth 根据年份和月份获取对应月的天数]
     * @param  {[type]} month [月]
     * @param  {[type]} year  [年]
     * @return {[type]}       [description]
     */
    function dayMonth(month, year) {
        var temp = year % 4;
        if (temp === 0) {
            return month_olympic[month];
        } else {
            return month_normal[month]
        }
    }
    
    /**
     * [toggleShow 切换日期插件显示]
     * @return {[type]} [description]
     */
    function toggleShow() {
        if (calendarEl.style.display == "none") {
            calendarEl.style.display = "block";
        } else {
            calendarEl.style.display = "none";
        }
    }
    // 初始化日历的样式
    function init(options) {
        var options = options || {};
        var lang = options.lang || 'zh-cn';
        var type = options.type || 'inline'; // inline || center
        var str = '';
        if (lang == 'en') {
            for (var i = 0; i < day_name.length; i++) {
                str += '<li>' + day_name[i] + '</li>';
            }
        } else {
            for (var i = 0; i < day_name_ch_zn.length; i++) {
                str += '<li>' + day_name_ch_zn[i] + '</li>';
            }
        }
        if (type != 'inline') {
            calendarEl.style.top = '50%';
            calendarEl.style.left = '50%';
            calendarEl.style.marginLeft = '-175px';
            calendarEl.style.marginTop = '-150px';
        } else {
            if (options.target) {
                var distance = options.target.getBoundingClientRect();
                calendarEl.style.top = distance.top + options.target.offsetHeight + 'px';
                calendarEl.style.left = distance.left + 'px';
            }
        }
        title.innerHTML = str;
        toggleShow();
        refreshDate(options);
    }
    // 重新加载数据
    function refreshDate(options) {
        var options = options || {};
        var lang = options.lang || 'zh-cn'; //zh-cn | en
        var cb = options.cb || '';
        var minDate = options.minDate;
        var maxDate = options.maxDate;
        var str = '';
        var totalDay = dayMonth(my_month, my_year);
        var firstDay = dayStart(my_month, my_year, 1);
        var myclass = '';
        for (var i = 0; i < firstDay; i++) {
            str += '<li></li>';
        }
        for (var j = 1; j <= totalDay; j++) {
            // 判断在最大日期和最小日期的区间内是否可以点击
            var currentTime = new Date(my_year + "-" + (my_month + 1) + "-" + j).getTime();
            if (minDate && !maxDate) {
                var newDate = new Date(minDate);
                if (currentTime < newDate.getTime()) {
                    myclass = 'not-allow';
                } else {
                    myclass = 'pointer';
                }
            } else if (!minDate && maxDate) {
                var newDate = new Date(maxDate);
                if (currentTime > newDate.getTime()) {
                    myclass = 'not-allow';
                } else {
                    myclass = 'pointer';
                }
            } else if (minDate && maxDate) {
                var newDateMin = new Date(minDate),
                    newDateMax = new Date(maxDate);
                if (currentTime >= newDateMin.getTime() && currentTime <= newDateMax.getTime()) {
                    myclass = 'pointer';
                } else {
                    myclass = 'not-allow';
                }
            } else {
                myclass = 'pointer';
            }
            // 显示样式
            if ((j < my_day && my_year == my_date.getFullYear() && my_month == my_date.getMonth()) || my_year < my_date.getFullYear() || (my_year == my_date.getFullYear() && my_month < my_date.getMonth())) {
                myclass += ' lightgrey'; // 小于当日的样式
            } else if (j == my_day && my_year == my_date.getFullYear() && my_month == my_date.getMonth()) {
                myclass += ' green greenbox'; // 当前选中样式
            } else {
                myclass += ' darkgrey'; // 大于当前的样式
            }
            str += '<li class="' + myclass + '">' + j + '</li>';
        }
        holder.innerHTML = str;
        month.innerHTML = lang == 'en' ? month_name[my_month] : month_name_ch_zn[my_month];
        year.innerHTML = my_year;


        // 选择某个日期
        holder.onclick = function(e) {
            if (e && e.preventDefault) {
                e.preventDefault();
            }
            e = e || window.event;
            var target = e.target || e.srcElement;
            if (hasClass(target, 'pointer') && cb && typeof cb == 'function') {
                calendarEl.style.display = "none";
                cb(my_year + '-' + autoZero(my_month, 2) + '-' + autoZero(target.innerHTML, 2));
            }
            return false;
        }
        // 点击上一个月
        m_prev.onclick = function(e) {
            if (e && e.preventDefault) {
                e.preventDefault();
            }
            my_month--;
            if (my_month < 0) {
                my_year--;
                my_month = 11;
            }
            refreshDate(options);
            return false;
        }
        // 点击下一个月
        m_next.onclick = function(e) {
            if (e && e.preventDefault) {
                e.preventDefault();
            }
            my_month++;
            if (my_month > 11) {
                my_year++;
                my_month = 0;
            }
            refreshDate(options);
            return false;
        }
        // 点击上一年
        y_prev.onclick = function(e) {
            if (e && e.preventDefault) {
                e.preventDefault();
            }
            my_year--;
            refreshDate(options);
            return false;
        }
        // 点击下一年
        y_next.onclick = function(e) {
            if (e && e.preventDefault) {
                e.preventDefault();
            }
            my_year++;
            refreshDate(options);
            return false;
        }
    }
    // 对外接口
    return {
        dayStart: dayStart,
        dayMonth: dayMonth,
        autoZero: autoZero,
        hasClass: hasClass,
        loadCalendar: function(options) {
            init(options);
        }
    }
})();
