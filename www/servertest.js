$('.servertest_btn').ready(function () {
    sp_check();
    $('.servertest_btn > div').on('click', function () {
        var code = $(this).attr('data-code');
        sp_query(code, this);
    });
});

function sp_check(callback) {
  if (typeof (callback) !== 'undefined') {
    callback();
  }
}

function gen_usg_color(usg) {
  if (usg <= 50)
    return 'green'
  if (usg >= 80)
    return 'red'
  return 'black'
}

var server_test_result = {}

function sp_query(code) {
  sp_check(function () {
      if (server_test_result[code] == undefined) {
        server_test_result[code] = {
          success : 0,
          total : 0
        }
      }
      //$(btn).fadeOut();
      var test_data = code2server[code].url

      var div_msg = '#servertest_msg_' + code;
      var div_result = '#servertest_result_' + code
      $(div_msg).html('Querying...');
      server_test_result[code].total++

      $.ajax(test_data + '/api/gm/server?_=' + new Date().getTime(),{
        success: function (data) {
          var svrusg = ((parseInt(data['srv_alc']) - parseInt(data['srv_free'])) * 100 / parseInt(data['srv_alc'])).toFixed(2)
          var fontcolor = gen_usg_color(svrusg)
          data['srv_usg'] = '<font color=\"' + fontcolor + '\">' + svrusg + '%<font>'

          var sysusg = ((parseInt(data['sys_sum']) - parseInt(data['sys_free'])) * 100 / parseInt(data['sys_sum'])).toFixed(2)
          var fontcolor = gen_usg_color(sysusg)
          data['sys_usg'] = '<font color=\"' + fontcolor + '\">' + sysusg + '%<font>'

          for (var key in data) {
            if (!data.hasOwnProperty(key)) continue;
            if ((key+'').indexOf('usg') > -1) {
              $('.' + key + "_" + code).find('.controls').html(data[key])
            } else {
              $('.' + key + "_" + code).find('.controls').html((parseInt(data[key])/1024).toFixed(2) + "MB")
            }
          }

          var div_bar = '#servertest_' + code;
          if (!code2server[code].fold)
            $(div_bar).slideDown();
          $('.btn_status_'+code).removeClass('btn-danger').addClass('btn-success')
          $(div_msg).html('');

          server_test_result[code].success++
          $(div_result).html(server_test_result[code].success + ' / ' + server_test_result[code].total)
        },
        error: function() {
            $('.btn_status_'+code).removeClass('btn-success').addClass('btn-danger')
            $(div_msg).html('Failed');
            $(div_result).html(server_test_result[code].success + ' / ' + server_test_result[code].total)
        }
      }, 1000)
    })
}
