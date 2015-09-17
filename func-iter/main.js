generate_rand_color_scheme = function(n) {
	color_scheme = [];
	for ( i=1; i <= n; i += 1 ) {
		color_scheme[i] = 'rgb('+String( Math.floor( Math.random()*255 ))+','+String( Math.floor( Math.random()*255 ))+','+String( Math.floor( Math.random()*255 ))+')';
	}
	return color_scheme;
}

color = function( colors, points ) {
	for( i=0; i < points.length; i+=1 ) {
		for( j=0; j < points[0].length; j+=1 ) {
			c.fillStyle = colors[ points[i][ points[0].length-1-j ] ];
			c.fillRect(i,j,1,1);
		}
	}
}

var g_func = "x*x - y*y + 0.285";
var h_func = "2*x*y + 0.01";

var stop = false; 
update_frac = function() {
	frac.con_limit = parseInt( $('#convergence_limit').val() );
	frac.div_limit = parseInt( $('#divergence_limit').val() );
	
	if ( isNaN($('#canvas_width').val()) ) { stop = true; return false; }
	else { $('#js-frac')[0].width = parseInt( $('#canvas_width').val() ); }
	if ( isNaN($('#canvas_height').val()) ) { stop = true; return false; }
	else { $('#js-frac')[0].height = parseInt( $('#canvas_height').val() ); }

	frac.width = parseInt( $('#js-frac').width() );
	frac.height = parseInt( $('#js-frac').height() );

	frac.xMin = parseFloat( $('#frac-table input.xMin:first').val() );
	frac.xMax = parseFloat( $('#frac-table input.xMax:first').val() );
	frac.yMin = parseFloat( $('#frac-table input.yMin:first').val() );
	frac.yMax = parseFloat( $('#frac-table input.yMax:first').val() );
	
	frac.xStep = ( frac.xMax - frac.xMin ) / (frac.width - 1);
	frac.yStep = ( frac.yMax - frac.yMin ) / (frac.height - 1);
	
	f = "( function(x) { return [";
	f += $('#g_func').val().replace(/x/g,'x[0]').replace(/y/g,'x[1]').replace(/ex\[0\]p/g,'exp') + ",";
	f += $('#h_func').val().replace(/x/g,'x[0]').replace(/y/g,'x[1]').replace(/ex\[0\]p/g,'exp');
	f += "]; } )";
	stop = false;
	try {
		eval( f )([0,0]);
	} catch ( e ) {
		if ( e instanceof SyntaxError ) alert( "There was a syntax error in one of the functions." );
		if ( e instanceof ReferenceError ) alert( "There was a reference error in one of the functions. Did you forget \"Math.\" before a math function?" );
		stop = true;
	}
	if ( !stop ) frac.f = f; 
}

var points = "points";

c = document.getElementById('js-frac').getContext('2d');

frac = {
	f: "( function(x) { return [x[0]*x[0]-x[1]*x[1] + 0.285, 2* x[0]*x[1] + 0.01 ] }  )",
	con_limit: 100,
	div_limit: 100,
	
	width: document.getElementById('js-frac').width,
	height: document.getElementById('js-frac').height,
	
	xMin: -1.0,
	xMax: 1.0,
	xStep: 2.0 / (document.getElementById('js-frac').width-1),

	yMin: -1.0,
	yMax: 1.0,
	yStep: 2.0 / (document.getElementById('js-frac').height-1)
};

var worker = "";
function makeWorker() {
	worker = new Worker('./make-frac.js');
	worker.addEventListener('message', function(e) {
		if ( isNaN( e.data ) ) {
			points = e.data;
			color( generate_rand_color_scheme( frac.con_limit ), e.data );
			$('#frac-loading').html("Done.");
		}
		else { 
			$('#frac-loading').html( Math.round( ((e.data+1) / frac.width)*100 ) +"%" );
		}
    }, false);
};

makeWorker();
worker.postMessage( JSON.stringify(frac) );

$(function() {
	$('input.xMin').val( frac.xMin );
	$('input.xMax').val( frac.xMax );
	$('input.yMin').val( frac.yMin );
	$('input.yMax').val( frac.yMax );

    $('#g_func').val( g_func );
    $('#h_func').val( h_func );
	
	$('#convergence_limit').val( frac.con_limit );
	$('#divergence_limit').val( frac.div_limit );
	
	$('#canvas_width').val( frac.width );
	$('#canvas_height').val( frac.height );
	
	$('body').on('change', '#frac-table input', function() {
		if ( isNaN( $(this).val() ) ) return;
		$('.'+$(this).attr('class')).val( $(this).val() );
	});
});
