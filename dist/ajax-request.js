var newinterval;
var rc= 6;
var requesturl= "https://auction-nflstg1.c1.vigoratedeals.com/iSynApp/allAuction.action?sid=1100782&viewType=api";


function htmlRequest(){
	//console.log('Request sent');
	$.ajax({
		type: 'GET',
		url: 'https://auction-nflstg1.c1.vigoratedeals.com/iSynApp/allAuction.action?sid=1100782&rc=20',
		success: function(html) {
			//console.log(html)
		}
	});
}

function mainHandler(){
	 $.ajax({
	   type: 'GET',
	   url: requesturl+"&rc="+rc,
	   success: function(html){
	   	var itemsObject = $.parseJSON(html);
	   	var content="";
				if (itemsObject.items.length > 0) {
					for (var i = 0; i < itemsObject.items.length; i++) {
						itemsObject.items[i].title = itemsObject.items[i].title.replace(/&quot;/g, "\"");
						itemsObject.items[i].title = itemsObject.items[i].title.replace(/&#39;/g, "\'");
						 var content = content + "<div class='s-12 m-6 l-4'>\
						    <img style='max-height: 110px !important;' class='auction-image-${i}' src='" + itemsObject.items[i].imgMedium + "'>\
						    <p class='margin-bottom'><strong><span class='auction-title-${i}'>" + itemsObject.items[i].title + "</span></strong> | $<span class='current-bid-${i}'>" + itemsObject.items[i].currentBid + "</span></p>\
						    <p>" + itemsObject.items[i].daysLeft + " Days " + itemsObject.items[i].hoursLeft + " Hours  " + itemsObject.items[i].minutesLeft + " Min " + itemsObject.items[i].secondsLeft + " Sec</p>\
						    <div class='s-12 margin-bottom2x'><a data-href='" + itemsObject.items[i].apiurl + "' data-name='" + itemsObject.items[i].title + "' class='auc-display-bind'><button class='button rounded-btn submit-btn s-12' type='submit'>" + itemsObject.items[i].actionTitle + "</button></a></div>\
	    				</div>"
					}
	   			}
		var categories="";
			if(itemsObject.categories.length>0){
				for (var i = 0; i < itemsObject.categories.length; i++) {
				 categories = categories + "<li class='aside-submenu'>\
			 	<a data-href='" + itemsObject.categories[i].teamurl + "' data-name='" + itemsObject.categories[i].teamname + "' class='category' >" + itemsObject.categories[i].teamname + "</a></li>"
				}
			}
			  console.log('currentPage: ' + itemsObject.currentPage);
				console.log('maxPage: ' + itemsObject.maxPage);
				console.log('pageNumList: ' + itemsObject.pageNumList);
				console.log('pageNumList: ' + itemsObject.currentRS);
				

		var pagination ="";
		var rs,j,page_class;
		var noofpages = itemsObject.maxPage;
		if(noofpages > 1){
			for (var i=0; i<noofpages; i++){
				rs = i*rc;
				j=i+1;

				if(j== itemsObject.currentPage){
					page_class = "page-num-focus";				
				}else{
					page_class = "page-num";	
				}

				pagination = pagination + "<a  class='"+page_class+"' data-href="+requesturl+"&rs="+rs+"\
				<span >"+j+"</span></a>";
			}
		}
		$('.pagination').html(pagination);
	    $('.content').html(content);
	    $('.categories-load').html(categories);
	    $(".title_main").html("All Auctions")
	    //console.log(itemsObject.items.length);

	  }
	});
}

$(document).ready(function(){

 mainHandler();

 $(".home").on("click", function(e){
 	clearInterval(newinterval);
 	mainHandler();
 	newinterval = setInterval(function() {mainHandler()}, 5000);
 });

$(".categories-load").on('click','.category', function (e) {

	clearInterval(newinterval);
	newinterval = 0 ;
	var param = $(this).attr("data-href");
	sorturl(param, 1);
	$(".title_main").html($(this).attr("data-name"))
	newinterval = setInterval(function() {sorturl(param, 0)}, 5000);
})

$(".pagination").on('click','.page-num', function (e) {

	clearInterval(newinterval);
	newinterval = 0 ;
	var param = $(this).attr("data-href");
	sorturl(param, 1);
	//$(".title_main").html($(this).attr("data-name"))
	newinterval = setInterval(function() {sorturl(param, 0)}, 5000);
})

$(".content").on('click','.auc-display-bind', function (e) {

	clearInterval(newinterval);
	newinterval = 0 ;
	var param = $(this).attr("data-href");
	displayproduct(param, 1);
	$(".title_main").html($(this).attr("data-name"))
	newinterval = setInterval(function() {sorturl(param, 0)}, 5000);
})


$(".sort-control").on('change', function(){
	var selected = $(this).find('option:selected');
	clearInterval(newinterval);
	newinterval = 0 ;
	var param = selected.data('href');
	param=param[0];
	sorturl(param, 1);
	newinterval = setInterval(function() {sorturl(param, 0)}, 5000);
})

});

function sorturl(param, load){
		if(load>0)
		{
			$('.content').html("");
			$('.loader').show();
		}
		var href = param+"&rc="+rc;
		console.log(href);
	    $.ajax({
	        url: href,
	        type: "GET",
	        success: function(html){
		   	var itemsObject = $.parseJSON(html);
		   	var content="";
					if (itemsObject.items.length > 0) {
						for (var i = 0; i < itemsObject.items.length; i++) {
							itemsObject.items[i].title = itemsObject.items[i].title.replace(/&quot;/g, "\"");
							itemsObject.items[i].title = itemsObject.items[i].title.replace(/&#39;/g, "\'");
							 content = content + "<div class='s-12 m-6 l-4'>\
							    <img style='max-height: 110px !important;' class='auction-image-${i}' src='" + itemsObject.items[i].imgMedium + "'>\
							    <p class='margin-bottom'><strong><span class='auction-title-${i}'>" + itemsObject.items[i].title + "</span></strong> | $<span class='current-bid-${i}'>" + itemsObject.items[i].currentBid + "</span></p>\
							    <p>" + itemsObject.items[i].daysLeft + " Days " + itemsObject.items[i].hoursLeft + " Hours  " + itemsObject.items[i].minutesLeft + " Min " + itemsObject.items[i].secondsLeft + " Sec</p>\
							    <div class='s-12 margin-bottom2x'><a data-href='" + itemsObject.items[i].apiurl + "' data-name='" + itemsObject.items[i].title + "' class='auc-display-bind'><button class='button rounded-btn submit-btn s-12' type='submit'>" + itemsObject.items[i].actionTitle + "</button></a></div>\
		    				</div>"
						}
		   			}
		   	console.log('currentPage: ' + itemsObject.currentPage);
				console.log('maxPage: ' + itemsObject.maxPage);
				console.log('pageNumList: ' + itemsObject.pageNumList);
				console.log('pageNumList: ' + itemsObject.currentRS);
				
		   	var pagination ="";
			var rs,j;
			var noofpages = itemsObject.maxPage;
			if(noofpages > 1){
				for (var i=0; i<noofpages; i++){
					rs = i*rc;
					j=i+1;
					if(j== itemsObject.currentPage){
					page_class = "page-num-focus";				
				}else{
					page_class = "page-num";	
				}

					pagination = pagination + "<a class='"+page_class+"' data-href="+requesturl+"&rs="+rs+"\
					<span>"+j+"</span></a>";
				}
			}
		$('.pagination').html(pagination);
		    $('.content').html(content);
		    $('.loader').hide();
		    //console.log("url");
		    //console.log(itemsObject.items.length);
		  },
	      error: function() {
	         //console.log("error");
	      }
	    });
	}



function displayproduct(param, load){
		if(load>0)
		{
			$('.content').html("");
			$('.loader').show();
		}
		var href = param;
		console.log(href);
	    $.ajax({
	        url: href,
	        type: "GET",
	        success: function(html){
		   	var itemsObject = $.parseJSON(html);
		   	var content="";
					if (itemsObject.items.length > 0) {
						for (var i = 0; i < itemsObject.items.length; i++) {
							itemsObject.items[i].title = itemsObject.items[i].title.replace(/&quot;/g, "\"");
							itemsObject.items[i].title = itemsObject.items[i].title.replace(/&#39;/g, "\'");
							if(itemsObject.items[i].multi == "Y"){
								var optionsqty = "";
								for (var k=0; k<itemsObject.items[i].requestedQty; k++){
									optionsqty= optionsqty + "<option></option>";
								}
								var qtyselect = "<label for='requestedQty'>Bid quantity:\
                                    <select class='form-control' id='bidRequestedQty' name='requestedQty'></select>" +optionsqty;
								}else{
									qtyselect = "<input type='hidden' name='requestedQty' value='1' />";
								}

								console.log(itemsObject);
								console.log(getCookie("isynsession"));
								if(getCookie("isynsession")== null){
									var bidbtnarea = "<a data-toggle='modal' href='#login-bid'><button class='button rounded-btn submit-btn s-12' type='button' >" + itemsObject.items[i].actionTitle + "</button></a>"

								}else{

									var bidbtnarea = "<button class='button rounded-btn submit-btn s-12' type='submit'>" + itemsObject.items[i].actionTitle + "</button>"

								}

							 	content = content + "<div class='s-12 m-12 l-12'>\
							    <img   src='" + itemsObject.items[i].imgFull + "'>\
							    <p class='margin-bottom'><strong><span class='auction-title-${i}'>" + itemsObject.items[i].title + "</span></strong> | $<span >" + itemsObject.items[i].currentBid + "</span></p>\
							    <form id='jsBidForm' action='http://auction-nflstg1.c1.vigoratedeals.com/iSynApp/manageBid!jsPlaceBid.action' method='POST'>\
		                          <input type='hidden' name='noDefAddrShip' value= 'allow'>\
		                          <input type='hidden' id='appuserID' value='$!appUser.name' />\
		                          <input type='hidden' id='qtyAvailable' value='$!auction.availableQuantity'/>\
		                          <input type='hidden' name='aucBidHist' value= '10'>\
		                          <input type='hidden' name='jsRespDateFormat' value= 'MMM dd, yyyy hh:mm:ss a z'>\
		                          <input type='hidden' name='aucRef' value= '$!{itemIdPrefix}'>\
			                      <input type='hidden' name='sid' value= '$site.id' />\
			                      <input type='hidden' name='aucId' value= '$auction.id' />\
		                          <input type='hidden' name='ssoAttempt' value='Y'>\
		                          <input type='hidden' name='iSynRetUrl' value= '$currentHost/iSynApp/auctionDisplay.action?auctionId=$auctionId&sid=$site.id' />\
			                      <input type='hidden' name='binRequest' value= 'Y' />\
			                      <input type='hidden' name='bidAmount' value= '$auction.binAmt' />\
                                  </label>" + qtyselect +
							      "<div class='s-12 margin-bottom2x'>" + bidbtnarea + "</div>\
		    				</div></form>";
						}
		   			}

		    $('.content').html(content);
		    $('.loader').hide();
		    console.log("url");
		    $('.pagination').html("");
		    console.log(itemsObject.items.length);
		  },
	      error: function() {
	         console.log("error");
	      }
	    });
	}


	function getCookie(cname) {
            var name = cname + "=";
            var decodedCookie = decodeURIComponent(document.cookie);
            var ca = decodedCookie.split(';');
            for(var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return null;
        }