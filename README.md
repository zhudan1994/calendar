# calendar
a calendar plugin
案列：
```
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>日期插件</title>
    <style type="text/css">
    * {
        padding: 0;
        margin: 0;
    }
    </style>
</head>

<body>
	<input type="text" name="" id="btn">
	<script type="text/javascript" src="calendar.js"></script>
    <script type="text/javascript">
    document.getElementById('btn').onclick = function (e) {
    	var target = (e && e.target) || window.event.srcElement;
    	Calendar.loadCalendar({
    		target: target,
    		type: 'inline', // center|inline
    		lang: 'zh-cn', //zh-cn||en
    		minDate: '2017-10-10', // 可传可不传
    		maxDate: '2017-12-01',
    		cb: function (date) {
    			target.value = date;
    		}
    	})
    }
    </script>
</body>

</html>
```
用法： 
```
Calendar.loadCalendar({
    		target: target, // 点击目标元素，例如input（必须传，其他参数可传可不传）
    		type: 'inline', // center（居中显示）|inline（内联）
    		lang: 'zh-cn', //zh-cn（中文）||en（英文）
    		minDate: '2017-10-10', // （最小日期）
    		maxDate: '2017-12-01', // 最大日期  		
        cb: function (date) { // 回调函数，可以拿到对应的日期
    			target.value = date;
    		}
})
```
