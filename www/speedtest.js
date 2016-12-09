$('.speedtest_btn').ready(function () {
    sp_check();
    $('.speedtest-check-msg').on('click', function () {
        sp_check();
    });
    $('.speedtest_btn > div').on('click', function () {
        var code = $(this).attr('data-code');
        sp_download(code, this);
    });
});

function sp_check(callback) {
  if (typeof (callback) !== 'undefined') {
    callback();
  }
}

//Speedtest
function sp_download(code, btn) {
    sp_check(function () {
        //$(btn).fadeOut();
        var test_data = code2server[code].speed_api;
        var test_file = '10mb.test';

        var div_msg = '#speedtest_msg_' + code;
        var div_bar = '#speedtest_progressbar_' + code;
        var div_bar_pros = '#speedtest_progressbar_' + code + ' > div';
        $('.speedtest_btn > div').addClass('disabled');
        $(div_bar).slideDown();
        //Pre-link,create an stable tunnel.
        $.get(test_data + '?_=' + new Date().getTime(), function () {
            setTimeout(function () {
                var dtStart = new Date();
                var dtFirst = null;
                var intFileSize = 0;
                $.ajax({
                    xhr: function () {
                        var xhr = new window.XMLHttpRequest();
                        //xhr.channel.loadFlags |= Components.interfaces.nsIRequest.LOAD_BYPASS_CACHE;
                        //Download progress
                        xhr.addEventListener("progress", function (evt) {
                            if (dtFirst === null) {
                                dtFirst = new Date();
                            }
                            if (evt.lengthComputable) {
                                intFileSize = evt.loaded;
                                var percentComplete = (evt.loaded / evt.total) * 100;
                                //Do something with download progress
                                $(div_msg).html('Downloading...');
                                $(div_bar_pros).css('width', percentComplete + '%');
                            }
                        }, false);
                        return xhr;
                    },
                    cache: false,
                    type: 'GET',
                    url: test_data + test_file,
                    data: {},
                    success: function () {
                        //draw
                        var echo = '';
                        var dtEnd = new Date();
                        var dtProcess = dtEnd - dtStart;
                        var dtPingRaw = dtFirst.getTime() - dtStart.getTime();
                        // var dtPing = 3000 - (dtFirst.getTime() - dtStart.getTime());
                        var intSpeed = Math.round(intFileSize) / dtProcess;

                        if ((intSpeed / 1024) > 1) {
                            echo = echo + ", Download speed:" + (intSpeed / 1024).toFixed(1) + " MB/s, PING " + dtPingRaw;
                        } else {
                            echo = echo + ", Download speed:" + intSpeed.toFixed(1) + " KB/s, PING " + dtPingRaw;
                        }
                        ;
                        $(div_msg).html(echo);
                        $('.speedtest_btn  > div').removeClass('disabled');
                        $(div_bar).slideUp();
                    }
                });
            }, 1000);
        });
    });

}
