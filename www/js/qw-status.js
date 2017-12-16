
function updateSysChart(id, chart_data) {
	var ctxL = document.getElementById(id).getContext('2d');
	var myLineChart = new Chart(ctxL, {
		type: 'line',
		data: {
			labels: chart_data.labels,
			datasets: [
				{
					label: "Free",
					backgroundColor: "rgba(151,205,169,0.2)",
					borderWidth: 2,
					borderColor: "rgba(151,205,169,1)",
					pointBackgroundColor: "rgba(151,205,169,1)",
					pointBorderColor: "#fff",
					pointBorderWidth: 1,
					pointRadius: 4,
					pointHoverBackgroundColor: "#fff",
					pointHoverBorderColor: "rgba(151,205,169,1)",
					data: chart_data.sys_free
				},
				{
					label: "Used",
					backgroundColor: "rgba(205,151,187,0.2)",
					borderWidth: 2,
					borderColor: "rgba(205,151,187,1)",
					pointBackgroundColor: "rgba(205,151,187,1)",
					pointBorderColor: "#fff",
					pointBorderWidth: 1,
					pointRadius: 4,
					pointHoverBackgroundColor: "#fff",
					pointHoverBorderColor: "rgba(205,151,187,1)",
					data: chart_data.sys_used
				},
				{
					label: "Total",
					backgroundColor: "rgba(220,220,220,0.2)",
					borderWidth: 2,
					borderColor: "rgba(220,220,220,1)",
					pointBackgroundColor: "rgba(220,220,220,1)",
					pointBorderColor: "#fff",
					pointBorderWidth: 1,
					pointRadius: 4,
					pointHoverBackgroundColor: "#fff",
					pointHoverBorderColor: "rgba(220,220,220,1)",
					data: chart_data.sys_sum
				}
			]
		},
		options: {
			responsive: true
		}
	});
};

function updateSrvChart(id, chart_data) {
	var ctxL = document.getElementById(id).getContext('2d');
	var myLineChart = new Chart(ctxL, {
		type: 'line',
		data: {
			labels: chart_data.labels,
			datasets: [
				{
					label: "Free",
					backgroundColor: "rgba(151,205,169,0.2)",
					borderWidth: 2,
					borderColor: "rgba(151,205,169,1)",
					pointBackgroundColor: "rgba(151,205,169,1)",
					pointBorderColor: "#fff",
					pointBorderWidth: 1,
					pointRadius: 4,
					pointHoverBackgroundColor: "#fff",
					pointHoverBorderColor: "rgba(151,205,169,1)",
					data: chart_data.srv_free
				},
				{
					label: "Used",
					backgroundColor: "rgba(205,151,187,0.2)",
					borderWidth: 2,
					borderColor: "rgba(205,151,187,1)",
					pointBackgroundColor: "rgba(205,151,187,1)",
					pointBorderColor: "#fff",
					pointBorderWidth: 1,
					pointRadius: 4,
					pointHoverBackgroundColor: "#fff",
					pointHoverBorderColor: "rgba(205,151,187,1)",
					data: chart_data.srv_used
				},
				{
					label: "Allocated",
					backgroundColor: "rgba(220,220,220,0.2)",
					borderWidth: 2,
					borderColor: "rgba(220,220,220,1)",
					pointBackgroundColor: "rgba(220,220,220,1)",
					pointBorderColor: "#fff",
					pointBorderWidth: 1,
					pointRadius: 4,
					pointHoverBackgroundColor: "#fff",
					pointHoverBorderColor: "rgba(220,220,220,1)",
					data: chart_data.srv_alc
				}
			]
		},
		options: {
			responsive: true
		}
	});
};

String.prototype.temp = function (obj) {
	return this.replace(/\$\w+\$/gi, function (matches) {
		var ret = obj[matches.replace(/\$/g, "")];
		if (ret === "") {
			ret = "N/A";
		}
		return (ret + "") === "undefined" ? matches : ret;
	});
}

var applist = [];

function reqAppList() {
	$.ajax({
		url: 'http://47.88.77.157:10021/api/gm/server/applist',
		type: 'GET',
		success: loadAppList,
		error: function () { }
	});
}

function loadAppList(obj) {
	if (obj && obj.retcode == 0) {
		applist = obj.data;
		for (var i = 0; i < applist.length; i++) {
			reqAppData(applist[i]);
		}
	}
}

function reqAppData(app_name) {
	$.ajax({
		url: `http://47.88.77.157:10021/api/gm/server2/?app_name=${app_name}&limit=20`,
		type: 'GET',
		success: function (data) {
			loadAppData(app_name, data);
		},
		error: function () { }
	});
}

function loadAppData(app_name, obj) {
	if (obj && obj.retcode == 0) {
		var data = obj.data,
			chart_data = {};
		chart_data.labels = [];

		chart_data.sys_sum = [];
		chart_data.sys_free = [];
		chart_data.sys_used = [];

		chart_data.srv_alc = [];
		chart_data.srv_free = [];
		chart_data.srv_used = [];

		for (var i = 0; i < data.length; ++i) {
			var time = /\d\d:\d\d/.exec(data[i].time)[0],
				sys_sum = data[i].sys_sum / 1000 || 0,
				sys_free = data[i].sys_free / 1000 || 0,
				srv_alc = data[i].srv_alc / 1000 || 0,
				srv_free = data[i].srv_free / 1000 || 0;

			chart_data.labels.push(time);

			chart_data.sys_sum.push(sys_sum);
			chart_data.sys_free.push(sys_free);
			chart_data.sys_used.push(sys_sum - sys_free);

			chart_data.srv_alc.push(srv_alc);
			chart_data.srv_free.push(srv_free);
			chart_data.srv_used.push(srv_alc - srv_free);
		}

		chart_data.labels.reverse();
		chart_data.sys_free.reverse();
		chart_data.sys_used.reverse();
		chart_data.sys_sum.reverse();
		chart_data.srv_alc.reverse();
		chart_data.srv_free.reverse();

		console.log(chart_data.srv_alc);
		console.log(chart_data.srv_free);

		updateSysChart(`${app_name}-sys-mem`, chart_data);
		updateSrvChart(`${app_name}-srv-mem`, chart_data);

		/*
		// reference to Feli's code
		var tempInfoHtml = $('#info-temp').html();

		var resObj = {};
		resObj.app_name = app_name;
		resObj.srv_alc = data[0].srv_alc;
		resObj.srv_free = data[0].srv_free;
		resObj.sys_free = data[0].sys_free;
		resObj.sys_sum = data[0].sys_sum;
		resObj.srv_usage = Math.round(data[0].srv_alc / (data[0].srv_alc + data[0].srv_free) * 100);
		resObj.sys_usage = Math.round((1 - data[0].sys_free / data[0].sys_sum) * 100);
		resObj.err_time = data[0].err_time || '无';
		if (data[0].err_info) {
			resObj.err_info = '<br>' + data[0].err_info.replace(new RegExp('\n', 'g'), '<br>');
		} else {
			resObj.err_info = '无';
		}
		resObj.test_time = data[0].test_time || '无';
		resObj.test_msg = data[0].test_msg || '无';
		var resHtml = tempInfoHtml.temp(resObj),
			myElem = document.getElementById(app_name);
		if (myElem === null) {
			$("#info").append(`<div id='${app_name}'>${resHtml}</div>`);
		} else {
			myElem.innerHTML = resHtml;
		}
		*/
	}
}
// reqAppList();
// setInterval(reqAppList, 5000);

reqAppData('joke-api');
