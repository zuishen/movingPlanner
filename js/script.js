
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
        $.each( json.response.docs, function( i, item ) {
            $("#nytimes-articles").append("<li class='article'><a href='"+item.web_url+"'>"+item.headline.main+"</a><p>"+item.lead_paragraph+"</p></li>");
        });

    })
    .error(function() {
        $nytHeaderElem.text('New York Times Articles Could Not Be Loaded');
    });

    var wikiRequestTimeout = setTimeout(function() {
        $wikiElem.text("failed to get wikipedia resources");
    }, 8000);

    $.ajax({
        url: "https://en.wikipedia.org/w/api.php?action=opensearch&search="+city+"&prop=revisions&rvprop=content&format=json&callback=jsonP",
        //if jsonp, add parameter callback=
        dataType: "jsonp",
        //jsonp: "callback",
        success: function(response) {
            console.log(response);
            for (var i = 0; i < 10; i++) {
                $wikiElem.append("<li><a href='"+response[3][i]+"'>"+response[1][i]+"</a></li>");
            }
        }
    });
    return false;
};

$('#form-container').submit(loadData);
