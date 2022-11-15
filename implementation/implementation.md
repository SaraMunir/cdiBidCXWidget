<link rel="stylesheet" href="implementation.css">

# On Demand Auctions Implementation

## CBS Sports Auction sites

### Notes

1. You'll likely have to edit the path to the cd-ondemand directory when you include css and js files.
2. Most of the following should work out-of-the-box, with minimal configuration. What you need to know:

    - The target auction site URL e.g. `https://bidcx.com/` *included in the parameters when launching the plugin*
    - The target auction site id e.g. `1104483` *included in the parameters when launching the plugin*
    - Your site’s main branding colour (as in CSS), used for heading and button backgrounds *applied to `cd-ondemand-title` elements and included in the parameters when launching the plugin*

Include the ondemand CSS in your `<head>`:

    <!-- Add ondemand CSS after main file so we can use that as a base -->
    <link rel="stylesheet" href="cd-ondemand/dist/cd-ondemand.css">

Add the following code where you want to place the plugin. **Note: include the brand background color either in your CSS or as an inline style as indicated here:**

    <div class="cd-ondemand-container">
      <h1 class="cd-ondemand-title" style="background-color: [brand-background-color]">HOT ITEMS</h1>
      <div class="cd-ondemand" id="cd-ondemand-hotItems"></div>
    </div>
    <div class="cd-ondemand-container">
      <h1 class="cd-ondemand-title" style="background-color: [brand-background-color]">CLOSING SOON</h1>
      <div class="cd-ondemand" id="cd-ondemand-closingSoon"></div>
    </div>

Before the closing `<body>` tag, include the on-demand scripts:

    <!-- cd-ondemand scripts -->
    <script src="cd-ondemand/dist/cd-ondemand-min.js"></script>
    <script src="cd-ondemand/dist/cd-ondemand-templates-min.js"></script>

... then launch on-demand:

    <script>
    (function($) {

      $('#cd-ondemand-hotItems').ondemand({
        site: '[auction site URL (no trailing /)]',
        siteId: [auction site id],
        brandColor: '[brand color]',
        parameters: 'sort=bidcount_desc',
        items: 3,
        liveUpdate: false,
        utmString: '&utm_source=osuStore&utm_medium=ondemand&utm_campaign=cbsOndemand',
        template: 'cbsCarousel',
        countdown: false
      });

      $('#cd-ondemand-closingSoon').ondemand({
        site: '[auction site URL (no trailing /)]',
        siteId: [auction site id],
        brandColor: '[brand color]',
        parameters: 'sort=sort=timeleft_asc',
        items: 3,
        liveUpdate: false,
        utmString: '&utm_source=osuStore&utm_medium=ondemand&utm_campaign=cbsOndemand',
        template: 'cbsCarousel',
        countdown: false
      });

    })( jQuery );

    </script>

Example:

    <script>
    (function($) {

      $('#cd-ondemand-hotItems').ondemand({
        site: 'https://bidcx.com',
        siteId: 1104483,
        brandColor: 'black',
        secondaryColor: "#f56a05",
        background: "white",
        parameters: 'sort=bidcount_desc',
        titleWidget: "Live from BIDCX auctions",
        items: 3,
        liveUpdate: false,
        utmString: '&utm_source=osuStore&utm_medium=ondemand&utm_campaign=cbsOndemand',
        template: 'cbsCarousel',
        countdown: false
      });

      $('#cd-ondemand-closingSoon').ondemand({
        site: 'https://bidcx.com/',
        siteId: 1104483,
        brandColor: '#a40f0c',
        parameters: 'sort=sort=timeleft_asc',
        items: 3,
        liveUpdate: false,
        utmString: '&utm_source=osuStore&utm_medium=ondemand&utm_campaign=cbsOndemand',
        template: 'cbsCarousel',
        countdown: false
      });

    })( jQuery );

    </script>