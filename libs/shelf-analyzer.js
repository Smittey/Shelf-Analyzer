$(document).ready(function() {


	var url = "https://www.goodreads.com/review/list/19586630.xml?key=YO76RlffdCgh2u7MZBBkhA&per_page=200&v=2";
	
	$.get("http://query.yahooapis.com/v1/public/yql",
    {
        q: "select * from xml where url=\""+url+"\"",
        format: "json"
    },
    function(json){       
		
		console.log(json);
		
		$.each(json.query.results.GoodreadsResponse.reviews.review, function(i, item) {
		
			console.log(i + " - isbn:" + item.book.isbn + ", isbn13: " + item.book.isbn13 + ", title: " + item.book.title);
		
		
			/*$.getJSON("https://openlibrary.org/api/books?bibkeys=ISBN:" + item.book.isbn + "&jscmd=details&format=json", function(json) {
			
				console(json);
			
				$.each(json.topartists.artist, function(i, item) {
				
				}
			});*/
			
			$.ajax({
				type: "POST",
				dataType: 'text',
				url: "https://openlibrary.org/api/books?bibkeys=ISBN:" + item.book.isbn + "&jscmd=details&format=json",
				crossDomain : true,
				dataType: 'jsonp',
			})
				.done(function( data ) {
					console.log("done");
				})
				.fail( function(xhr, textStatus, errorThrown) {
					console.log(xhr.responseText);
					console.log(textStatus);
				});
			
		});
		
		
		
    }
);

});