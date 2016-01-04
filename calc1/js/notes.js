$(function() {

	// Enumerate definitions.
	$('.definition').each(function(n) {
		$(this).html( '<b><u>Definition '+(n+1)+'</u></b>: ' + $(this).html() )
	})

	// Enumerate examples.
	$('.example').each(function(n) {
		$(this).html( '<b><u>Example '+(n+1)+'</u></b>: ' + $(this).html() )
	})	
})