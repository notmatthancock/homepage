var func = document.getElementById('func')
var a = document.getElementById('a')
var b = document.getElementById('b')
var sum_type = document.getElementById('sum-type')

get_func = function() {
    // var fstr = "(function(x) {with(Math) { return "+func.value+"; }})";
    // var f = eval(fstr);
    var ps = Parser.parse(func.value);
    var f = function(t) { return ps.evaluate({x: t}); };
    return f;
}

get_a = function() { return parseFloat(a.value); }
get_b = function() { return parseFloat(b.value); }

get_sum_type = function() { return sum_type.value; }

main = function() {
    if (typeof variable !== 'undefined') {
        JXG.JSXGraph.freeBoard(board)
    }

    var board = JXG.JSXGraph.initBoard('plot', {boundingbox: [-8, 5, 8, -5], axis: true})
    var f = get_func()

    var n = board.create('slider', [[1,3],[5,3],[1,10,100]], {name:'n', snapWidth:1});

    board.create('functiongraph', [f, get_a, get_b,],
                 {strokeWidth: 2, strokeColor: 'red'});
    board.create('riemannsum', [f, function() { return n.Value(); }, get_sum_type, get_a, get_b],
                 {fillColor: '#0a0fe0', fillOpacity: 0.3});

    board.create('text', [3, 4, function(){
        var sum = JXG.Math.Numerics.riemann(f, n.Value(), get_sum_type(), get_a(), get_b())[2];
        return "Sum = " + sum.toFixed(7);
    }], {fontSize: 20});
}

inputs = document.getElementsByTagName('input');

for(var i=0; i < inputs.length; i+=1) {
    inputs[i].addEventListener('keydown', function(e) {
        if (e.keyCode == 13) { main(); }
    });
    inputs[i].addEventListener('focusout', main);
}

document.getElementById('sum-type').addEventListener('change', main)


main()
