self.addEventListener('message', function( msg ) {
	var frac = JSON.parse( msg.data );
	frac.f = eval( frac.f );
	
	var points = [];
	var k=0;
	for( var i=0; i < frac.width; i+=1 ) {
		points[i] = [];
		for( j=0; j < frac.height; j+=1 ) {
			
			k = 0;
			var p = [ frac.xMin + i*frac.xStep, frac.yMin + j*frac.yStep ];
			
			while ( Math.sqrt(p[0]*p[0] + p[1]*p[1]) < frac.div_limit ) {
				p = frac.f( p );
				k += 1;
				if ( k >= frac.con_limit ) break;
			}
		
			points[i][j] = k;
		}
		self.postMessage( i );
	}
	
	self.postMessage( points );
}, false );
