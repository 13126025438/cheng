
function calculateDiffTime(startTime, endTime, type) {
	if(startTime == null){
		return '* *';
	}
    var startTime = parseInt(startTime);
	var date = new Date(startTime * 1000);
	var atMonth = date.getMonth() + 1;
	var atDay = date.getDay();
	var runTime = parseInt(endTime - startTime)
	var year = Math.floor(runTime / 86400 / 365)
	runTime = runTime % (86400 * 365)
	var month = Math.floor(runTime / 86400 / 30)
	runTime = runTime % (86400 * 30)
	var day = Math.floor(runTime / 86400)
	runTime = runTime % 86400
	var hour = Math.floor(runTime / 3600)
	runTime = runTime % 3600
	var minute = Math.floor(runTime / 60)
	runTime = runTime % 60
	var second = runTime
	if (type === 1) { // 返回相差年数
		return year + '年'
	} else if (type === 2) { // 返回相差年数月数
		return year + '年' + month + '月'
	} else if (type === 3) { // 返回相差年数月数天数
		return year + '年' + month + '月' + day + '日'
	} else if(type === 4){
        let days = (year*365) + (month * 30) + day;
        return   days + ' 天';
    }else if(type === 5){
		let Y = year < 1 ? (year + 1) : year;
		return Y + '年'
    }else if(type === 6){
		// 2个月前 (10-14)
		if(year >= 1){
		return year + '年前' + '(' + atMonth + '-' + atMonth + ')' 

		}// 8 -21
		if(month < 1){
			return  '1 周前' + '(' + atMonth + '-' + atDay + ')' 
		}
		return month + '个月前' + '(' + atMonth + '-' + atDay + ')' 
    }
    else { // 返回相差年数月数天数时分秒
		return year + '年' + month + '月' + day + '日' + hour + '时' + minute + '分' + second + '秒'
	}
}

module.exports={
    calculateDiffTime
}