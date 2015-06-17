var e = [109, 104, 97, 110, 99, 111, 99, 107, 64, 109, 97, 116, 104, 46, 102, 115, 117, 46, 101, 100, 117];

get_email = function() {
    var ee = document.getElementById('email');
    var es = e.map( function(n) { return String.fromCharCode(n) } ).join("");
    ee.innerHTML = es;
    ee.setAttribute('href', 'mailto:'+es);
    ee.removeAttribute('onclick')
    return false;
}
