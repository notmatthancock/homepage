$(function() {
    $('table').height( 
        $('body').height()-$('h1').outerHeight(includeMargin=true)-4*parseFloat($('#main').css('padding-top'))-10 
    );
    $.getJSON('roster.json', function(r) {
        seats = '';
        for(var i=0; i<r.length; i+=1) {
            seats += "<tr>";
            for(var k=0; k<6; k+=1){
                seats += "<td class='student' empty='"+(r[i][k]=="")+"'>"+r[i][k]+"</td>";
                if (k==1) seats += "<td class='aisle'></td>";
            }
            seats += "</tr>";
        }
        $('table#lab-seating').append(seats)
    });

    $(window).resize(function() {
        $('table').height( 
            $('body').height()-$('h1').outerHeight(includeMargin=true)-4*parseFloat($('#main').css('padding-top'))-10 
        );
    });
});
