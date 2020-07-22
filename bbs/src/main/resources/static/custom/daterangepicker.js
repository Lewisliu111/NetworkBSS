$(function() {

	// 获取URL参数
	var getUrlParameter = function getUrlParameter(sParam) {
		var sPageURL = decodeURIComponent(window.location.search.substring(1)),
		sURLVariables = sPageURL.split('&'),
		sParameterName,
		var i;
		
		for (i = 0; i < sURLVariables.length; i++) {
			sParameterName = sURLVariables[i].split('=');
			
			if (sParameterName[0] === sParam) {
				return sParameterName[1] === undefined ? true : sParameterName[1];
			}
		}
	};

	// 判断daterangepicker是否有start-end
	var hasParam = getUrlParameter("start") !=null && getUrlParameter("end") != null;

	// 帮助函数 转换格式s
	var momentObj = function momentObj(timeStr) {
		var obj = moment(timeStr, 'YYYY-MM-DD');
		return obj;
	}

	// 获取开始date
	function getStartDate(){
		if ( hasParam ) {
			var startObj = momentObj(getUrlParameter("start"));
			return startObj;
		}
		return moment().subtract(6, 'days');
	}

	// 获取终止date
	function getEndDate() {
		if ( hasParam ) {
			var endObj = momentObj(getUrlParameter("end"));
			return endObj;
		}
		return moment();
	}
	
	var start = getStartDate();
	var end = getEndDate();
 
    
    init();
    // 初始化时间和格式
    function init() {
    		$('#reportrange span').html(start.format('YYYY-MM-DD') + ' - ' + end.format('YYYY-MM-DD'));
    }

    // 设置daterangepicker
    $('#reportrange').daterangepicker({
        startDate: start,
        endDate: end,
        ranges: {
           '今天': [moment(), moment()],
           '昨天': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
           '过去7天': [moment().subtract(6, 'days'), moment()],
           '过去30天': [moment().subtract(29, 'days'), moment()],
           '这个月': [moment().startOf('month'), moment().endOf('month')],
           '上个月': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        }
    });


    // on apply event
    $('#reportrange').on('apply.daterangepicker', function(ev, picker) {
    		console.log("onChange()");
    		var startDate = picker.startDate.format('YYYY-MM-DD');
    		var endDate = picker.endDate.format('YYYY-MM-DD');
	    	window.location.href = "/dashboard?tab=posts&start=" + startDate + "&end=" + endDate;
    	});
    
});