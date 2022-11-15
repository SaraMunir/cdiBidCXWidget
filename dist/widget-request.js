



;(function($) {

	var newinterval;
	var newinterval2;

 	$.fn.advancedWidget = function(options){

 		var defaults = {
			url: "https://auction-nflstg1.c1.vigoratedeals.com",
			sid: "1100782",
			title: "NFL Auctions Advanced Widget",
			rc:8,
			listaction: "allAuction.action",
			displayaction: "auctionDisplay.action",
			defaultSort: "timeleft_asc",
			sorting: "true",
			destination: $(this)
		};

		options = $.extend({}, defaults, options);


		clearInterval(newinterval);
		newinterval = 0 ;
		var rs=0;
		var defaultSort = options.defaultSort;
		widgetCall(options,defaultSort,rs);
		newinterval = setInterval(function() {widgetCall(options,defaultSort,rs)}, 20000);
		sortingCall(options);

		$(".aw-home-link").on("click", function(e){
			clearInterval(newinterval);
			newinterval = 0 ;
			widgetCall(options,defaultSort,rs);
			newinterval = setInterval(function() {widgetCall(options,defaultSort,rs)}, 20000);
			sortingCall(options);
		});

		$(".aw-pagination").on('click','.aw-page-num', function (e) {
			clearInterval(newinterval);
			newinterval = 0 ;
			var rs = $(this).attr("data-href");
			var currSort = $(".aw-sort-select").val();
			widgetCall(options,currSort,rs);
			//$(".title_main").html($(this).attr("data-name"))
			newinterval = setInterval(function() {widgetCall(options,currSort,rs)}, 20000);
		});

		$(".aw-sort").on('change','.aw-sort-select', function (e) {
			clearInterval(newinterval);
			newinterval = 0 ;
			var sort = $(this).val();
			widgetCall(options,sort,rs);
			//$(".title_main").html($(this).attr("data-name"))
			newinterval = setInterval(function() {widgetCall(options,sort,rs)}, 20000);
		})

		$(".aw-content").on('click','.aw-bid-btn', function (e) {
			clearInterval(newinterval);
			newinterval = 0 ;
			var pid = $(this).attr("data-pid");
			productCall(options,pid);
			newinterval = setInterval(function() {productCall(options,pid)}, 20000);
		})

		$(".aw-widget-toggle").on("click", function(e){
 		$(".aw-main").removeClass("aw-trans-main");
		 });

		 $(".aw-close").on("click", function(e){
		 		$(".aw-main").addClass("aw-trans-main");
		 });

 	}

 	$.fn.createCountDown = function () {
	    // Set the date we're counting down to
	    var timeinsec = $(this).data('time');
	    var element = $(this);
	    // Update the count down every 1 second
	    newinterval2 = setInterval(function () {
	    	timeinsec = timeinsec - 1;
	        // Time calculations for days, hours, minutes and seconds
	        var days = Math.floor((timeinsec % (86400 * 30)) / 86400) ;
	        var hours = Math.floor((timeinsec % 86400) / 3600);
	        var minutes = Math.floor((timeinsec % 3600) / 60);
	        var seconds = Math.floor(timeinsec % 60);
	        var output = days + " Days " + hours + " Hours " + minutes + " Min " + seconds + " Sec ";
	        element.html(output) ;
	        // If the count down is finished, write some text 
	        if (timeinsec <= 0) {
	            clearInterval(newinterval2);
	            element.html("closed") ;
	        }
	    }, 1000);
	}
 	

	function widgetCall(options,sort,rs){
		   var source = options.url;
		   var action = options.listaction;
		   var sid = options.sid;
		   var title = options.title;
		   var rc = options.rc;
		   var destination = options.destination;
		   $.ajax({
		   type: 'GET',
		   url: source + "/iSynApp/" + action + "?sid=" +sid+ "&viewType=api&rc="+rc+"&rs="+rs+"&sort="+sort,
		   success: function(html){
		   	var itemsObject = $.parseJSON(html);
		   	var content="";
					if (itemsObject.items.length > 0) {
						content = content + "<div class='aw-row'>"
						for (var i = 0; i < itemsObject.items.length; i++) {
							itemsObject.items[i].title = itemsObject.items[i].title.replace(/&quot;/g, "\"");
							itemsObject.items[i].title = itemsObject.items[i].title.replace(/&#39;/g, "\'");
							  content = content + "\
							  <div class='aw-xs-12 aw-sm-6 aw-lg-3'>\
							  	<div class='aw-bid-img text-center'>\
							    	<img style='max-height: 110px !important;' class='auction-image-${i}' src='" + itemsObject.items[i].imgMedium + "'>\
							    </div>\
							    <div class='aw-bid-title'>\
							    	<p><span class='aw-auction-title'><b>" + itemsObject.items[i].title + "</b></span>\
							    </div>\
							    	$<span class='aw-current-bid'>" + itemsObject.items[i].currentBid + "</span></p>\
							    	<div class='aw-countDown' data-time='" + itemsObject.items[i].totalSecondsLeft + "'>" + itemsObject.items[i].daysLeft + " Days " + itemsObject.items[i].hoursLeft + " Hours  " + itemsObject.items[i].minutesLeft + " Min " + itemsObject.items[i].secondsLeft + " Sec</div>\
								    <p><a data-href='" + itemsObject.items[i].apiurl + "' data-name='" + itemsObject.items[i].title + "' class='auc-display-bind'><button data-pid='"+itemsObject.items[i].id+"' class='aw-bid-btn' type='submit'>" + itemsObject.items[i].actionTitle + "</button></a>\
								    </p>\
		    				</div>"
						}
						content = content + "</div>"
		   			}
			var categories="";
				if(itemsObject.categories.length>0){
					for (var i = 0; i < itemsObject.categories.length; i++) {
					 categories = categories + "<li class='aside-submenu'>\
				 	<a data-href='" + itemsObject.categories[i].teamurl + "' data-name='" + itemsObject.categories[i].teamname + "' class='category' >" + itemsObject.categories[i].teamname + "</a></li>"
					}
				}
				  //console.log('currentPage: ' + itemsObject.currentPage);
					//console.log('maxPage: ' + itemsObject.maxPage);
					//console.log('pageNumList: ' + itemsObject.pageNumList);
					//console.log('pageNumList: ' + itemsObject.currentRS);

			

			var pagination ="";
			var rs,j,page_class;
			var noofpages = itemsObject.maxPage;
			var currentPageNum = itemsObject.currentPage;
			var startPage; 
			var endPage;
			if (noofpages > 5){
                        if (currentPageNum >= (noofpages - 2)){
                            endPage = noofpages;
                            startPage = noofpages - 4;
                    	}else if (currentPageNum <= (noofpages - 2) && currentPageNum > 3){
                            endPage = parseInt(currentPageNum) + 2;
                            startPage = currentPageNum - 2;
                        }else if (currentPageNum <= 3){
                            endPage = 5;
                            startPage = 1;
                        }else{
                        	endPage = noofpages;
                        	startPage = 1;
              		   	}
            }else{
            	endPage = noofpages
            	startPage = 1;
            }

            	pagination = pagination + "<ul>";

            if(currentPageNum > 1){
            	var numFactor = options.rc;
            	var prevrs = ((currentPageNum-1)*numFactor)-numFactor;
	            pagination = pagination + "<li class='aw-page-num' data-href='"+prevrs+"'><a >Prev</a></li>";
            }

			if(noofpages > 1){
				for (var i=startPage-1; i<endPage; i++){
					rs = i*rc;
					j=i+1;
					if(j== itemsObject.currentPage){
						page_class = "aw-page-num-focus active";	
						var nextrs = rs+rc;			
					}else{
						page_class = "aw-page-num";	
					}
					pagination = pagination + "<li  class='"+page_class+"' data-href='"+rs+"'><a >\
					"+j+"</a></li>";
				}
			}

			if(parseInt(currentPageNum) < noofpages){
				pagination = pagination + "<li class='"+page_class+"' data-href='"+nextrs+"'><a >Next</a></li>";
		    }
		    	pagination = pagination + "</ul>";

			$(destination).find(".aw-pagination").html(pagination);
		    $(destination).find(".aw-content").html(content);
		    //$('.categories-load').html(categories);
		    $(destination).find(".aw-title").html(title);
		    //console.log(itemsObject.items.length);

		    clearInterval(newinterval2);
			newinterval2 = 0 ;
		    $(".aw-countDown").each(function() {
				$(this).createCountDown();
			});
		  }

		});

		console.log("refresh");
		var now = new Date();
		console.log(now)
	}

	function productCall(options,pid){
		   var source = options.url;
		   var action = options.displayaction;
		   var sid = options.sid;
		   var destination = options.destination;
		   $.ajax({
		   type: 'GET',
		   url: source + "/iSynApp/" + action + "?sid=" +sid+ "&viewType=api&auctionId="+pid,
		   success: function(html){
		   			var itemsObject = $.parseJSON(html);
		   	var content="";
					if (itemsObject.items.length > 0) {
						content = content + "<div class='aw-row'>"
						for (var i = 0; i < itemsObject.items.length; i++) {
							itemsObject.items[i].title = itemsObject.items[i].title.replace(/&quot;/g, "\"");
							itemsObject.items[i].title = itemsObject.items[i].title.replace(/&#39;/g, "\'");
							  content = content + "\
							  <div class='aw-xs-12 aw-sm-6'>\
							  	<div class='aw-bid-img text-center'>\
							    	<img style='max-width: 100% !important;' class='aw-auction-image' src='" + itemsObject.items[i].imgFull + "'>\
							    </div>\
							  </div>\
							  <div class='aw-xs-12 aw-sm-6'>\
							    <div class='aw-bid-title'>\
							    	<p><span><b>" + itemsObject.items[i].title + "</b></span>\
							    </div>\
							    	$<span class='aw-current-bid'>" + itemsObject.items[i].currentBid + "</span></p>\
							    	<div class='aw-countDown' data-time='" + itemsObject.items[i].totalSecondsLeft + "'>" + itemsObject.items[i].daysLeft + " Days " + itemsObject.items[i].hoursLeft + " Hours  " + itemsObject.items[i].minutesLeft + " Min " + itemsObject.items[i].secondsLeft + " Sec</div>\
								    <p><a data-href='" + itemsObject.items[i].apiurl + "' data-name='" + itemsObject.items[i].title + "' class='auc-display-bind'><button data-pid='"+itemsObject.items[i].id+"' class='aw-bid-btn' type='submit'>" + itemsObject.items[i].actionTitle + "</button></a>\
								    </p>\
		    				</div>"
						}
						content = content + "</div>"
		   			}

		   		$(destination).find(".aw-content").html(content);
		   		$(destination).find(".aw-pagination").html("");
		   		$(destination).find(".aw-sort").html("");
		   		clearInterval(newinterval2);
				newinterval2 = 0 ;
			    $(".aw-countDown").each(function() {
					$(this).createCountDown();
				});
		   }
		});
	}

	function sortingCall(options){
		var destination = options.destination;
		if(options.sorting == "true"){
			var sorting = "";
				sorting = sorting + "<div class='aw-row'><div class='aw-xs-12 text-right'>\
									<select class='aw-sort-select'>\
										<option value='timeleft_asc'>Time left: least to most</option>\
			                            <option value='timeleft_desc'>Time left: most to least</option>\
										<option  value='bidcount_desc'>Bid count: highest to lowest</option>\
			                            <option value='bidcount_asc'>Bid count: lowest to highest</option>\
			                            <option value='curbid_desc'>Current bid: highest to lowest</option>\
			                            <option value='curbid_asc'>Current bid: lowest to highest</option>\
									</select>\
									</div></div>";
			$(destination).find('.aw-sort').html(sorting);
		}
	}

	

 })( jQuery );