
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview

    // YOUR CODE GOES HERE!
    var city = $('#city').val();
    var street = $('#street').val();
    var location = street + ', ' + city;
    $greeting.text('So, you want to live at ' + location + '?');
    $body.append('<img class="bgimg" src="http://maps.googleapis.com/maps/api/streetview?size=600x300&location='+
        location+'">');

    var q = "https://api.nytimes.com/svc/search/v2/articlesearch.json?" 
        + $.param({'api-key' : "c55d633d4efb4126b56d8eee62d24a34",
                    'q' : city
                });
    
    $.getJSON(q, function(json) {
        var items = [];
        $.each( json.response.docs, function( i, item ) {
            $("#nytimes-articles").append("<li class='article'><a href='"+item.web_url+"'>"+item.headline.main+"</a><p>"+item.lead_paragraph+"</p></li>");
        });

    });
    return false;
};

$('#form-container').submit(loadData);
