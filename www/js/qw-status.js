// var host = '47.88.77.157',
var host = 'localhost',
	port = '10021',
	app_list = [];

function updateApiChart(app_name, chart_data) {
		var ctxB = document.getElementById(`${app_name}-api-time-chart`).getContext('2d'),
		color_bg_enum = [
			'rgba(255, 99, 132, 0.2)',
			'rgba(54, 162, 235, 0.2)',
			'rgba(255, 206, 86, 0.2)',
			'rgba(75, 192, 192, 0.2)',
			'rgba(153, 102, 255, 0.2)',
			'rgba(255, 159, 64, 0.2)'
		],
		color_bd_enum = [
			'rgba(255,99,132,1)',
			'rgba(54, 162, 235, 1)',
			'rgba(255, 206, 86, 1)',
			'rgba(75, 192, 192, 1)',
			'rgba(153, 102, 255, 1)',
			'rgba(255, 159, 64, 1)'
		],
		color_bg = [],
		color_bd = [];

		chart_data= ['','','','','','',''];

		for (var i = 0; i < chart_data.length; i++) {
			color_bg.push(color_bg_enum[i % 6]);
			color_bd.push(color_bd_enum[i % 6]);
		}
		var myBarChart = new Chart(ctxB, {
			type: 'bar',
			data: {
				labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange", "h"],
				datasets: [{
					label: 'Time of Api Request (ms)',
					data: [12, 19, 3, 5, 2, 3, 9],
					backgroundColor: color_bg,
					borderColor: color_bd,
					borderWidth: 1
				}]
			},
			options: {
				animation: false,
				scales: {
					yAxes: [{
						ticks: {
							beginAtZero:true
						}
					}]
				}
			}
		});
	};

function updateSysChart(app_name, chart_data) {
	var ctxL = document.getElementById(`${app_name}-sys-mem`).getContext('2d');
	var myLineChart = new Chart(ctxL, {
		type: 'line',
		data: {
			labels: chart_data.labels,
			datasets: [
				{
					label: 'Free',
					backgroundColor: 'rgba(151,205,169,0.2)',
					borderWidth: 2,
					borderColor: 'rgba(151,205,169,1)',
					pointBackgroundColor: 'rgba(151,205,169,1)',
					pointBorderColor: '#fff',
					pointBorderWidth: 1,
					pointRadius: 4,
					pointHoverBackgroundColor: '#fff',
					pointHoverBorderColor: 'rgba(151,205,169,1)',
					data: chart_data.sys_free
				},
				{
					label: 'Used',
					backgroundColor: 'rgba(205,151,187,0.2)',
					borderWidth: 2,
					borderColor: 'rgba(205,151,187,1)',
					pointBackgroundColor: 'rgba(205,151,187,1)',
					pointBorderColor: '#fff',
					pointBorderWidth: 1,
					pointRadius: 4,
					pointHoverBackgroundColor: '#fff',
					pointHoverBorderColor: 'rgba(205,151,187,1)',
					data: chart_data.sys_used
				},
				{
					label: 'Total',
					backgroundColor: 'rgba(220,220,220,0.2)',
					borderWidth: 2,
					borderColor: 'rgba(220,220,220,1)',
					pointBackgroundColor: 'rgba(220,220,220,1)',
					pointBorderColor: '#fff',
					pointBorderWidth: 1,
					pointRadius: 4,
					pointHoverBackgroundColor: '#fff',
					pointHoverBorderColor: 'rgba(220,220,220,1)',
					data: chart_data.sys_sum
				}
			]
		},
		options: {
			responsive: true,
			animation: false
		}
	});
};

function updateSrvChart(app_name, chart_data) {
	var ctxL = document.getElementById(`${app_name}-srv-mem`).getContext('2d');
	var myLineChart = new Chart(ctxL, {
		type: 'line',
		data: {
			labels: chart_data.labels,
			datasets: [
				{
					label: 'Free',
					backgroundColor: 'rgba(187,205,151,0.2)',
					borderWidth: 2,
					borderColor: 'rgba(187,205,151,1)',
					pointBackgroundColor: 'rgba(187,205,151,1)',
					pointBorderColor: '#fff',
					pointBorderWidth: 1,
					pointRadius: 4,
					pointHoverBackgroundColor: '#fff',
					pointHoverBorderColor: 'rgba(187,205,151,1)',
					data: chart_data.srv_free
				},
				{
					label: 'Used',
					backgroundColor: 'rgba(169,151,205,0.2)',
					borderWidth: 2,
					borderColor: 'rgba(169,151,205,1)',
					pointBackgroundColor: 'rgba(169,151,205,1)',
					pointBorderColor: '#fff',
					pointBorderWidth: 1,
					pointRadius: 4,
					pointHoverBackgroundColor: '#fff',
					pointHoverBorderColor: 'rgba(169,151,205,1)',
					data: chart_data.srv_used
				},
				{
					label: 'Allocated',
					backgroundColor: 'rgba(220,220,220,0.2)',
					borderWidth: 2,
					borderColor: 'rgba(220,220,220,1)',
					pointBackgroundColor: 'rgba(220,220,220,1)',
					pointBorderColor: '#fff',
					pointBorderWidth: 1,
					pointRadius: 4,
					pointHoverBackgroundColor: '#fff',
					pointHoverBorderColor: 'rgba(220,220,220,1)',
					data: chart_data.srv_alc
				}
			]
		},
		options: {
			responsive: true,
			animation: false
		}
	});
};

function updateSysTable(app_name, data) {
	var sum = document.getElementById(`${app_name}-sys-sum`),
		used = document.getElementById(`${app_name}-sys-used`),
		free = document.getElementById(`${app_name}-sys-free`),
		percent = document.getElementById(`${app_name}-sys-percent`);
	sum.innerHTML = data.sys_sum + ' MB';
	used.innerHTML = data.sys_used + ' MB';
	free.innerHTML = data.sys_free + ' MB';
	percent.innerHTML = data.sys_percent + ' %';
}

function updateSrvTable(app_name, data) {
	var sum = document.getElementById(`${app_name}-srv-sum`),
		used = document.getElementById(`${app_name}-srv-used`),
		free = document.getElementById(`${app_name}-srv-free`),
		percent = document.getElementById(`${app_name}-srv-percent`);
	sum.innerHTML = data.srv_sum + ' MB';
	used.innerHTML = data.srv_used + ' MB';
	free.innerHTML = data.srv_free + ' MB';
	percent.innerHTML = data.srv_percent + ' %';
}

function updateStatus(app_name, status) {
	id = `#${app_name}-status`;
	$(id).removeClass('red green');
	if (status == 'running') {
		$(id).addClass('green')
	} else {
		$(id).addClass('red');
	}
	$(id).html(status);
}

String.prototype.temp = function (obj) {
	return this.replace(/\$\w+\$/gi, function (matches) {
		var ret = obj[matches.replace(/\$/g, '')];
		if (ret === '') {
			ret = 'N/A';
		}
		return (ret + "") === "undefined" ? matches : ret;
	});
}

function reqAppList() {
	$.ajax({
		url: `http://${host}:${port}/api/gm/applist`,
		type: 'GET',
		success: loadAppList,
		error: function (err) {
			console.log(`[ERR] req app list failed. ${err}`);
		}
	});
}

function loadAppList(obj) {
	if (obj && obj.retcode == 0) {
		applist = obj.data;

		for (var i = 0; i < applist.length; i++) {
			var tempInfoHtml = $('#info-temp').html();
			var resObj = {},
				app_name = applist[i].name;
			status = applist[i].status;
			resObj.app_name = app_name;
			resObj.app_status = status;
			var resHtml = tempInfoHtml.temp(resObj),
				myElem = document.getElementById(app_name);
			if (myElem === null) {
				$("#info").append(`<div id='${app_name}'>${resHtml}</div>`);
				$("#navbar-app-list-items").append(`<a class="dropdown-item" href="#${app_name}">${app_name}</a>`)
			}
			updateStatus(app_name, status);
			reqSysData(app_name);
			reqErrData(app_name);
			reqTestData(app_name);
			reqApiPath(app_name);
		}
	}
}

function reqSysData(app_name, limit) {
	if (!limit) {
		limit = 20;
	}
	$.ajax({
		url: `http://${host}:${port}/api/gm/server-info/?app_name=${app_name}&limit=${limit}`,
		type: 'GET',
		success: (obj) => {
			loadSysData(app_name, obj);
		},
		error: (err) => {
			console.log(`request ${app_name} data failed`)
		}
	});
}

function loadSysData(app_name, obj) {
	if (obj && obj.retcode == 0) {
		var data = obj.data,
			chart_data = {},
			time, sys_sum, sys_free, srv_alc, srv_free;

		chart_data.labels = [];

		chart_data.sys_sum = [];
		chart_data.sys_free = [];
		chart_data.sys_used = [];

		chart_data.srv_alc = [];
		chart_data.srv_free = [];
		chart_data.srv_used = [];

		for (var i = 0; i < data.length; ++i) {
			time = /\d\d:\d\d/.exec(data[i].time)[0];
			sys_sum = data[i].sys_sum / 1000 || 0;
			sys_free = data[i].sys_free / 1000 || 0;
			srv_alc = data[i].srv_alc / 1000 || 0;
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

		updateSysTable(app_name, {
			sys_sum: Math.round(sys_sum),
			sys_used: Math.round(sys_sum - sys_free),
			sys_free: Math.round(sys_free),
			sys_percent: Math.round(10000 - sys_free / sys_sum * 10000) / 100
		})

		updateSrvTable(app_name, {
			srv_sum: Math.round(srv_alc),
			srv_used: Math.round(srv_alc - srv_free),
			srv_free: Math.round(srv_free),
			srv_percent: Math.round(10000 - srv_free / srv_alc * 10000) / 100
		})
		updateSysChart(app_name, chart_data);
		updateSrvChart(app_name, chart_data);
	} else {
		console.log(obj);
	}
}

function reqTestData(app_name, limit) {
	if (!limit) {
		limit = 5;
	}
	$.ajax({
		url: `http://${host}:${port}/api/gm/test-info/?app_name=${app_name}&limit=${limit}`,
		type: 'GET',
		success: function (obj) {
			loadTestData(app_name, obj);
		},
		error: function (err) {
			console.log(`[ERR] req ${app_name} test data failed. ${err}`);
		}
	});
}

function loadTestData(app_name, obj) {
	var table_id = `#${app_name}-test-table`;
	if (obj.retcode == 0) {
		data = obj.data;
		$(table_id).html('');
		for (var i = 0; i < data.length; i++) {
			var date = data[i].time.split('T')[0],
				time = data[i].time.split('T')[1].split('.')[0],
				test_res = data[i].msg,
				test_html =
					`<tr>
			        <th scope="row">${i + 1}</th>
			        <td>${date}</td>
			        <td>${time}</td>
			        <td>${test_res}</td>
			        </tr>`;
			$(table_id).append(test_html);
		}
	} else {
		console.log(`Load ${app_name} test records failed.`)
	}
}

function reqErrData(app_name, limit) {
	if (!limit) {
		limit = 5;
	}
	$.ajax({
		url: `http://${host}:${port}/api/gm/catch-err/?app_name=${app_name}&limit=${limit}`,
		type: 'GET',
		success: function (obj) {
			loadErrData(app_name, obj);
		},
		error: function (err) {
			console.log(`[ERR] req ${app_name} err data failed. ${err}`);
		}
	});
}

function loadErrData(app_name, obj) {
	var table_id = `#${app_name}-error-table`;
	if (obj.retcode == 0) {
		data = obj.data;
		$(table_id).html('');
		var index = 1,
			prev_err = '';
		for (var i = 0; i < data.length; i++) {
			var date = data[i].time.split('T')[0],
				time = data[i].time.split('T')[1].split('.')[0],
				err = data[i].err;
			if (prev_err != err) {
				var err_fmt = err.replace(/\n/g, '<br>');
				var err_html =
					`<tr>
			        <th scope="row">${index}</th>
			        <td>${date}</td>
			        <td>${time}</td>
			        <td>${err_fmt}</td>
			        </tr>`;
				$(table_id).append(err_html);
				index++;
				prev_err = err;
			}

		}
	} else {
		console.log(`Load ${app_name} error records failed.`)
	}
}

function reqApiPath(app_name) {
	if (!app_name) {
		return;
	}
	$.ajax({
		url: `http://${host}:${port}/api/gm/api-path/?app_name=${app_name}`,
		type: 'GET',
		success: function (obj) {
			loadApiPath(app_name, obj);
		},
		error: function (err) {
			console.log(`[ERR] req ${app_name} api path failed. ${err}`);
		}
	});
}

function loadApiPath(app_name, obj) {
	var id = `#${app_name}-api-time`,
		id_r = `#${app_name}-api-paths`,
		obj = JSON.parse(obj);

	if (obj.retcode == 0) {
		var paths = obj.data;
		if (paths && paths.length > 0) {
			$(id).removeClass('collapse');
			$(id_r).html('');
			for (var i = 0; i < paths.length; i++) {
				$(id_r).append(`<h5>${paths[i]}</h5><hr>`);
			}
		} else {
			$(id).addClass('collapse');
		}

	} else {
		console.log(`Load ${app_name} api pathes failed.`)
	}
}

reqAppList();
setInterval(reqAppList, 10 * 1000);

