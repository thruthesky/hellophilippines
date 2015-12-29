/**
 * ============================== AJAX Loading Function ========================
 *
 *
 *
 * @param url       - must be GET URI
 * @param callback
 * @param option
 *          - if it is true, it just return data without parsing.
 *          - if it is object
 *              -- if check_error is false, then it does not error check.
 */
function ajax_load(url, callback, option) {

    console.log(option);

    if ( url.indexOf('?') == -1 ) url += '?';
    else url += '&';
    if ( member.login() ) {
        url += 'idx_member=' + member.id + '&session_id=' + member.session_id + '&';
    }
    url +=  'page=' + app.getCurrentPage() + '&mobile=' + app.isMobile() + '&platform=' + app.platform();

    trace(url);

    $.ajax({
        url:url,
        cache: false,
        success: function(data) {
            //trace(data);
            if ( option === true ) return callback(data);
            var re;
            try {
                re = $.parseJSON(data);
            }
            catch ( e ) {
                note.post("Ajax_load() : caught an error : " + e.message);
                console.log(data);
                return;
            }
            /**
             * It must be here. It must not be in try {}
             */
            if ( re.code ) {
                if ( option && option['error_check'] === false ) {

                }
                else return alert(re.message);
            }

            callback(re);
        },
        error: function(xhr, type) {
            return note.post("Ajax load error : " + type);
            trace(type);
            trace(xhr);
        }
    });
}
/**
 *                      ----- Ajax submit in POST method -----
 * @param url
 * @param data
 * @param success_callback
 * @param error_callback
 */
function ajax_load_post(url, data, success_callback, error_callback) {
    trace(debug.url(url, data));
    $.ajax({
        url: url,
        type: 'POST',
        data: data,
        success: function(data){
            var re;
            //trace(data);
            try {
                re = $.parseJSON(data);
            }
            catch ( e ) {
                trace(e);
                return note.post("Ajax_load_post() : caught an error : " + e.message);
            }
            if ( re['code'] ) {
                trace(re);
                alert(re['message']);
                error_callback(re);
            }
            else success_callback(re);
        },
        error: function(xhr, type){
            return note.post("Ajax load error : " + type);
            trace(type);
            trace(xhr);
        }
    });
}