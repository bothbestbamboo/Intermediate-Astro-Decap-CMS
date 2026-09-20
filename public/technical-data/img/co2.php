<?php 
$url=$_GET['url'];
$file=$_GET['file'];
$html=file_get_contents($url);
file_put_contents($file,$html);
?>