<?php
header("Access-Control-Allow-Origin: *");
?>

<?php
/**
getItems.php
For local development - start a server and hit this instead of hitting the main site directly to avoid cross-domain issues.
**/
?>

<?php
$rc = $_GET["rc"];
$viewType = $_GET["viewType"];
$sid = $_GET["sid"];
$url = "http://auctions.nba.com/iSynApp/allAuction.action?pgmode1=collectionsearch&pgcust1=finals2016&pgcust3=panname_collectionname_s&qt[0].type=fieldmatch&qt[0].name=panname_collectionname_s&qt[0].value1=finals2016";
$url .= "&rc=";
$url .= $rc;
$url .= "&viewType=api";
$url .= "&sid=1101461";
$data = file_get_contents($url);
echo("HI");
// echo $data;
// echo $url;
?>