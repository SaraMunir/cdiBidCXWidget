var templates = {
	widgetTemplate :
    '<!-- .section-header--> \
    <style> .slick-prev:before, .slick-next:before { color:{{{secondaryColor}}}; } \
    .cd-ondemand-container { background-color: {{{background}}} }</style>\
    <h1 class="cd-ondemand-title" style="color:{{{primaryColor}}}"  >{{{titleWidget}}}</h1>\
    <div class="cdo-slick" > \
	  	{{#each items}} \
        <div class="cdo-list-item" id="item-{{id}}"> \
          <div class="cdo-list-item__image"> \
            <a target="_blank" href="{{url}}"><img src="{{imgMedium}}" alt="{{{title}}}"></a> \
          </div> \
          <div class="cdo-list-item__body"> \
            <h1 class="cdo-list-item__title" ><a style="color:{{{primaryColor}}}"   target="_blank" href="{{url}}">{{{title}}}</a></h1> \
            <ul class="cdo-list-item__details"> \
              <li class="cdo-closes" style="color:{{{secondaryColor}}}" data-time-left="{{timeLeft}}">Closes in <strong>{{daysLeft}}d, {{hoursLeft}}h, {{minutesLeft}}m</strong></li> \
              <li style="color:{{{primaryColor}}}" class="cdo-current-bid">{{currentBidTitle}}: <strong  class="cdo-current-bid-value">${{currentBid}}</strong></li> \
	            <!--<li class="cdo-num-bids"><span   class="cdo-bid-count-value">BIDS: {{bidCount}}</span></li>--> \
            </ul> \
            <div class="cdo-action"><a style="background:{{{secondaryColor}}};color:{{{background}}}" class="cdo-btn cdo-btn--action cdo-bid-link" target="_blank" href="{{url}}">{{actionTitle}}</a></div> \
          </div> \
        </div> \
      {{/each}} \
    </div>'
};