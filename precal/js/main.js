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

    $('#main').on('click', '#notes li span', function() {
        $(this).parent().children('table').toggle();
    });

    $('#main').on('click', '#notes table tr:not(:first)', function() {
        window.location.href = "notes/"+$(this).children('td:first').html()+".html";
    });
    
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

    $(document).on('keydown', function(e) {
        if (e.keyCode == 39) { // right
            var max = -1000000000.0;
            var scr = 0;
            var win = $(window).scrollTop()
            $('h2, h3, h4').each(function(i,v) {
                if ($(v).css('display')=='none') return
                var scr_ = $(v).position().top
                var max_ = win - scr_;
                if (max_ > max && max_ < 0.0 && max_ < -1.0) {
                    max = max_;
                    scr = scr_;
                }
            });
            $(window).scrollTop(scr);
        }
        else if (e.keyCode == 37) { // left
            var min = 1000000000.0;
            var scr = 0;
            var win = $(window).scrollTop()
            $('h2, h3, h4').each(function(i,v) {
                if ($(v).css('display')=='none') return
                var scr_ = $(v).position().top
                var min_ = win - scr_;
                if (min_ < min && min_ > 0.0) {
                    min = min_;
                    scr = scr_;
                }
            });
            $(window).scrollTop(scr);
        }
    });
});
