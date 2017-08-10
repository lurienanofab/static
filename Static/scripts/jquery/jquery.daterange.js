jQuery.daterange = {
    today: function () {
        var d = new Date();
        var sd = (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear();
        var ed = sd;
        return { start: sd, end: ed };
    },
    yesterday: function () {
        var d = new Date();
        d.setDate(d.getDate() - 1);
        var sd = (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear();
        var ed = sd;
        return { start: sd, end: ed };
    },
    thisWeek: function () {
        var d = new Date();
        var dBegin = new Date();
        var dEnd = new Date();
        var wd = d.getDay();
        dBegin.setDate(d.getDate() - wd);
        dEnd.setDate(d.getDate() + 6 - wd);
        var sd = (dBegin.getMonth() + 1) + '/' + dBegin.getDate() + '/' + dBegin.getFullYear();
        var ed = (dEnd.getMonth() + 1) + '/' + dEnd.getDate() + '/' + dEnd.getFullYear();
        return { start: sd, end: ed };
    },
    lastWeek: function () {
        var d = new Date();
        var dBegin = new Date();
        var dEnd = new Date();
        var wd = d.getDay();
        dBegin.setDate(d.getDate() - 7 - wd);
        dEnd.setDate(dBegin.getDate() + 6);
        var sd = (dBegin.getMonth() + 1) + '/' + dBegin.getDate() + '/' + dBegin.getFullYear();
        var ed = (dEnd.getMonth() + 1) + '/' + dEnd.getDate() + '/' + dEnd.getFullYear();
        return { start: sd, end: ed };
    },
    thisMonth: function () {
        var d = new Date();
        var dBegin = new Date(d.getFullYear(), d.getMonth(), 1);
        var dEnd = new Date(d.getFullYear(), d.getMonth() + 1, 1);
        dEnd.setDate(dEnd.getDate() - 1);
        var sd = (dBegin.getMonth() + 1) + '/' + dBegin.getDate() + '/' + dBegin.getFullYear();
        var ed = (dEnd.getMonth() + 1) + '/' + dEnd.getDate() + '/' + dEnd.getFullYear();
        return { start: sd, end: ed };
    },
    lastMonth: function () {
        var d = new Date();
        var dBegin = new Date(d.getFullYear(), d.getMonth() - 1, 1);
        var dEnd = new Date(d.getFullYear(), d.getMonth(), 1);
        dEnd.setDate(dEnd.getDate() - 1);
        var sd = (dBegin.getMonth() + 1) + '/' + dBegin.getDate() + '/' + dBegin.getFullYear();
        var ed = (dEnd.getMonth() + 1) + '/' + dEnd.getDate() + '/' + dEnd.getFullYear();
        return { start: sd, end: ed };
    },
    thisYear: function () {
        var d = new Date();
        var dBegin = new Date(d.getFullYear(), 0, 1);
        var dEnd = new Date(d.getFullYear() + 1, 0, 1);
        dEnd.setDate(dEnd.getDate() - 1);
        var sd = (dBegin.getMonth() + 1) + '/' + dBegin.getDate() + '/' + dBegin.getFullYear();
        var ed = (dEnd.getMonth() + 1) + '/' + dEnd.getDate() + '/' + dEnd.getFullYear();
        return { start: sd, end: ed };
    },
    lastYear: function () {
        var d = new Date();
        var dBegin = new Date(d.getFullYear() - 1, 0, 1);
        var dEnd = new Date(d.getFullYear(), 0, 1);
        dEnd.setDate(dEnd.getDate() - 1);
        var sd = (dBegin.getMonth() + 1) + '/' + dBegin.getDate() + '/' + dBegin.getFullYear();
        var ed = (dEnd.getMonth() + 1) + '/' + dEnd.getDate() + '/' + dEnd.getFullYear();
        return { start: sd, end: ed };
    },
    getRange: function (preset) {
        switch (preset) {
            case 'today':
                return this.today();
                break;
            case 'yesterday':
                return this.yesterday();
                break;
            case 'this-week':
                return this.thisWeek();
                break;
            case 'last-week':
                return this.lastWeek();
                break;
            case 'this-month':
                return this.thisMonth();
                break;
            case 'last-month':
                return this.lastMonth();
                break;
            case 'this-year':
                return this.thisYear();
                break;
            case 'last-year':
                return this.lastYear();
                break;
            default:
                return { start: '', end: '' };
                break;
        }
    },
	 format: function(date_string, format){
		 var dd = 0;
		 var mm = 0;
		 var yy = 0;
		 var hh = 0;
		 var mi = 0;
		 var ss = 0;
		 
		 var d = new Date(date_string);
		 console.log(d);
		 if (!isNaN(d.getDate())){
			 dd = d.getDate();
			 mm = d.getMonth();
			 yy = d.getFullYear();
			 hh = d.getHours();
			 mi = d.getMinutes();
			 ss = d.getSeconds();
		 }
		 else{
			 var splitter = date_string.split(' ');
			 var date_part = '';
			 var time_part = '';
			 if (splitter.length > 0){
				 date_part = splitter[0];
				 time_part = splitter[1];
			 }
			 else{
				 date_part = date_string;
			 }
			 splitter = date_part.split('-');
			 if (splitter.length == 3){
				 yy = splitter[0];
				 mm = splitter[1];
				 dd = splitter[2];
			 }
			 splitter = time_part.split(':');
			 if (splitter.length == 3){
				 hh = splitter[0];
				 mi = splitter[1];
				 ss = splitter[2];
			 }
		 }
		 
		 var result = format;
		 result = result.replace('dd', dd);
		 result = result.replace('MM', mm);
		 result = result.replace('yyyy', yy);
		 result = result.replace('hh', hh);
		 result = result.replace('mm', mi);
		 result = result.replace('ss', ss);
		 return result;
	 }
}