$(function() {
    // Set calendar widths
    var widths = $('div#calendar table tbody tr:first td').map( function() { return $(this).width(); } ).get();
    $('table#calendar-headers tr:first th').each( function(i) { $(this).width( widths[i] ); } );
    if ( $('div#calendar table tbody').height() < 100  ) {
        $('div#calendar').height( $('div#calendar table tbody').height() )
    }

    // Write example numbers
    var title = $('title').html()
    var section_number = title.substring(0, title.indexOf(" "));
    $('div.example').each( function(i,e) {
       $(e).attr("example_number", section_number+'.'+(i+1) );
       $(e).before('<h4>Example '+section_number+'.'+(i+1)+'<a class="solution" example_number="'+section_number+'.'+(i+1)+'">solution [+]</a></h4>')
    }).children('div.solution').prepend('<u>Solution:</u><br><br>');

    // Event Responders
    /////////////////////

    $('#main').on('click', 'img.darkbox', function() {
        var h = $(window).height()-40;
        var r = $(this).width() / $(this).height();
        $('#main').append( '<div id="darkbox"><img src="'+$(this).attr('src')+'" style="width: '+r*h+'px; height: '+h+'px;"></div>' );
    });

    $('#main').on('click', 'div#darkbox', function() {
        $('div#darkbox').remove();
    });

    $('#main').on('click', 'a.solution', function() {
        var t = $('div.example[example_number="'+$(this).attr('example_number')+'"] > div.solution');
        t.toggle() 
        if ( t.css('display') == 'none' ) $(this).html('solution [+]')
        else $(this).html('solution [-]');
    });

});
