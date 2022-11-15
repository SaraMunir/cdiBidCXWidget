<?php
header("Access-Control-Allow-Origin: *");
?>

<?php
/**
getAuctionItem.php
For local development - start a server and hit this instead of hitting the main site directly to avoid cross-domain issues.
**/
?>

<?php
$id = $_GET["auctionId"];
$url = "http://auctions.nba.com/iSynApp/auctionDisplay.action?viewType=api&auctionId=";
$url .= $id;
$data = file_get_contents($url);
echo $data;
?>