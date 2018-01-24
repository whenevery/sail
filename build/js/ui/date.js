$.fn.datetimepicker.dates['en'] = {
    days: ["周日","周一", "周二", "周三", "周四", "周五", "周六", "周日"],
    daysShort: ["日", "一", "二", "三", "四", "五", "六", "日"],
    daysMin: ["日", "一", "二", "三", "四", "五", "六", "日"],
    months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
    monthsShort: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"],
    today: "今天",
    meridiem:['上午','下午'],
    suffix:$.fn.datetimepicker.dates['en'].suffix,
    clear:'清除'
};
$.fn.rangeTimeSelect = function(options){
    return this.each(function(){
        var $start = $(this).find('.start-time');
        var $end = $(this).find('.end-time');
        $start.datetimepicker({
            format:options.format || $start.attr('format') || 'yyyy-mm-dd hh:ii:ss',
            autoclose:true,
            minView:options.minView || $start.attr('min-view'),
            todayBtn:'linked',
            todayHighlight:true,
        }).on('changeDate',function(e){
            $end.datetimepicker('setStartDate',  useCommon.parseDate(e.date,'Y-m-d'));
            $start.datetimepicker('hide');
        });
        $end.datetimepicker({
            format:options.format || $start.attr('format') || 'yyyy-mm-dd hh:ii:ss',
            autoclose:true,
            minView:options.minView || $start.attr('min-view'),
            todayBtn:'linked',
            todayHighlight:true,
        }).on('changeDate',function(e){
            $start.datetimepicker('setEndDate', useCommon.parseDate(e.date,'Y-m-d'));
            $end.datetimepicker('hide');
        });
    });
};
$.fn.oneDatetimePicker = function(options){
    return this.each(function(){
        var dateOptions = {
            format:$(this).attr('format') || 'yyyy-mm-dd hh:ii:ss',
            autoclose:true,
            minView:$(this).attr('min-view'),
            todayBtn:'linked',
            todayHighlight:true,
        };
        var startDate = $(this).attr('start-date');
        if(startDate)dateOptions.startDate = startDate;
        var endDate = $(this).attr('end-date');
        if(endDate)dateOptions.endDate = endDate;
        $(this).datetimepicker(dateOptions);
    });
};