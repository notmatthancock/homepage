generate_rand_color_scheme = function(n) {
	color_scheme = new Array(n);
	for (var i=0; i < n; i += 1) {
		color_scheme[i] = new Array(3);
        for (var j=0; j < 3; j+=1)
            color_scheme[i][j] = Math.floor( Math.random()*255 )
	}

	return color_scheme;
}

self.onmessage = function(msg) {
	var frac = JSON.parse( msg.data );
	frac.f = eval( frac.f );

    var colors = generate_rand_color_scheme( frac.con_limit );
    var img_data = new Uint8ClampedArray(4*frac.width*frac.height);

    for( var i=0; i < frac.width; i+=1 ) {
        for( var j=0; j < frac.height; j+=1 ) {
            var ip = i*frac.height + j
            if ( !frac.color_only ) {
                // This is the point to be iterated.
                var p = [ frac.xMin + j*frac.xStep, frac.yMax - i*frac.yStep ];
                
                // While the norm of the current iterate is less than
                // the divergence limit, keep iterating.
                var k = 0;
                while ( Math.sqrt(p[0]*p[0] + p[1]*p[1]) < frac.div_limit ) {
                    p = frac.f( p ); k += 1;
                    if ( k >= frac.con_limit ) break;
                }
            
                frac.points[ip] = k;
            }

            for (var l=0; l<3; l+=1)
                 // we have to offset by 1 because every point survices at least one iteration
                img_data[4*ip+l] = colors[frac.points[ip]-1][l];
            img_data[4*ip+3] = 255
        }
        if ( !frac.color_only ) self.postMessage({topic: 'testing', iter: i});
    }
    
    // Send back the frac object
    if ( frac.color_only ) frac.color_only = false;
    self.postMessage({topic: 'frac', frac: JSON.stringify(frac)});

    // Finally we send back the image data
    self.postMessage({topic: 'image_data', image_data: img_data})

}//, false );
