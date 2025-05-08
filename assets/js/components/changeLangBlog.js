export function changeLangBlog(element) {
    var current_language = gt_get_cookie('googtrans').split('/').pop();

// W3 Schools: https://www.w3schools.com/js/js_cookies.asp
    function gt_get_cookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }
}