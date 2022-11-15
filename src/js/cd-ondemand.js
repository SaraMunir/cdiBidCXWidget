/* 
global Handlebars: true, templates: true, console: true 
*/

// @codekit-prepend "lib-min.js";

;(function($) {

	$.fn.ondemand = function(options) {

		var defaults = {
			url: "",
			site: "",
			siteId: "",
			titleWidget: "Live from auctions",
			primaryColor: "#000",
			secondaryColor: "#ccc",
			background: "#fff",
			parameters: "",
			rc: "10",
			utmString: "",
			rotationSpeed: 5000,
			template: 'source',
			sslImg: false,
			carousel: true, // Don't change - carousel only fires if needed, so this is redundant
			items: 5,
			liveUpdate: false, // Don't use - in dev
			dev: false,
			verbose: false,
			allItemsAction: "allAuction.action",
			getItemAction: "auctionDisplay.action",
			countdown: true
		};

		options = $.extend({}, defaults, options);

		if (window.location.hostname === 'localhost') {
			console.log('Dev mode. Using ' + options.devRoot + " as a middleman.");
			options.dev = true;
		}


		// Functions

		// Date plays nice with jQuery Countown
		var formatDate = function(dateToFormat) {
			var y = (dateToFormat.getFullYear());
			var mo = (dateToFormat.getMonth() + 1);
			var d = (dateToFormat.getDate());
			var h = (dateToFormat.getHours());
			var mi = (dateToFormat.getMinutes());
			var s = (dateToFormat.getSeconds());
			var formattedDate = y + "/" + mo + "/" + d + "/" + " " + h + ":" + mi + ":" + s;
			return formattedDate;
		};

		// Not used in current version - deprecate?
		var insertItem = function(i, destination, itemsArray, template) {
			var item = itemsArray[i];
			var html = template(item);
			$(destination).addClass('cd-ondemand--active').html(html);
			$(".cdo-closes")
			.countdown(item.timeLeft, function(event) {
				$(this).html(
					event.strftime('<strong>Time left:</strong> %D days %H:%M:%S')
				);
			});
			i++;
			i = i % itemsArray.length;
			if (itemsArray.length > 1) {
				setTimeout(function() {
					insertItem(i, destination, itemsArray, template);
				}, options.rotationSpeed);
			}
		};

		// Plugin-wide vars
		var destination = $(this);
		var apiArgs = '?sid=' + options.siteId + '&rc=' + options.items + '&viewType=api' + '&' + options.parameters + '&pgmode1=' + options.sslImg;
		var apiUrl = options.dev ? options.devRoot + '/getItems.php' + apiArgs : options.site + '/iSynApp/' + options.allItemsAction + apiArgs;
		var itemUrl = options.dev ? options.devRoot + '/getAuctionItem.php?auctionId=' : options.site + '/iSynApp/' + options.getItemAction + '?viewType=api&auctionId=';

		if (options.verbose) {
			console.log(apiUrl);
		}

		$.get(apiUrl, function(data) {
			if (options.dev) {
				console.log(apiUrl);
				console.log(data);
			}

			var itemsObject = $.parseJSON(data);
			if (itemsObject.items.length > 0) {
				for (var i = 0; i < itemsObject.items.length; i++) {
					itemsObject.items[i].title = itemsObject.items[i].title.replace(/&quot;/g, "\"");
					itemsObject.items[i].title = itemsObject.items[i].title.replace(/&#39;/g, "\'");
					itemsObject.items[i].url = itemsObject.items[i].url + options.utmString;
					itemsObject.items[i].secondaryColor = options.secondaryColor;
					itemsObject.items[i].primaryColor = options.primaryColor;
					if (typeof(itemsObject.items[i].closeTime) !== "undefined") {
						var closeDate = new Date(itemsObject.items[i].closeTime);
						itemsObject.items[i].timeLeft = formatDate(closeDate);
					}
				}

				
				Handlebars.registerHelper('primaryColor', function() {
				  return options.primaryColor;
				});

				Handlebars.registerHelper('secondaryColor', function() {
				  return options.secondaryColor;
				});

				Handlebars.registerHelper('background', function() {
				  return options.background;
				});


				Handlebars.registerHelper('titleWidget', function() {
				  return options.titleWidget;
				});
				var template = Handlebars.compile(templates[options.template]);


				if (options.carousel) {
					var html = template(itemsObject);
					$(destination)
						.addClass('cd-ondemand--active')
						.html(html)
						.find('.cdo-slick').slick({
							autoplay: true,
							autoplaySpeed: options.rotationSpeed,
							slidesToShow: 3,
							arrows: true,
							responsive: [
							    {
							      breakpoint: 1170,
							      settings: {
							        slidesToShow: 2,
							        slidesToScroll: 2,
							        infinite: true,
							        dots: true
							      }
							    },
							    {
							      breakpoint: 768,
							      settings: {
							        slidesToShow: 1,
							        slidesToScroll: 1,
									infinite: true,
							        dots: true
							      }
							    }
							  ],
							arrows: true
					}).on('afterChange', function(event, slick, currentSlide){
						var nextSlide = (currentSlide + 1) % itemsObject.items.length;
					  var queryUrl = itemUrl + itemsObject.items[nextSlide].id;
					  if (options.liveUpdate) {
						  $.get(queryUrl, function(data) {
						  	console.log(data);
						  	var itemObject = $.parseJSON(data);
							  if (itemObject.bidCount !== itemsObject.items[nextSlide].bidCount) {
								  var itemContainer = '#item-' + itemsObject.items[nextSlide].id;
							  	console.log("Bid on auction " + itemsObject.items[nextSlide].id);
							  	// updateValues(itemsObject, itemObject, ['currentBid', 'bidCount']);
								  itemsObject.items[nextSlide].currentBid = itemObject.currentBid;
								  itemsObject.items[nextSlide].bidCount = itemObject.bidCount;
								  $(itemContainer).find('.cdo-current-bid-value').html(itemsObject.items[nextSlide].currentBid);
								  $(itemContainer).find('.cdo-bid-count-value').html(itemsObject.items[nextSlide].bidCount);
								}
						  });
						}
					});
					if (options.countdown) {
						$(".cdo-closes").each(function() {
							$(this).countdown($(this).data('time-left'), function(event) {
								$(this).html(
									event.strftime('<strong>Closes in</strong> %D days %H:%M:%S')
								);
							});
						});
					}
				} else {
					var currentItem = 0;
					insertItem(currentItem, $(destination), itemsObject.items, template);
				}

			} else {
				$(destination).remove();
			}

		});
	};
})( jQuery );