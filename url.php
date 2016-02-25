<?php

/* Lives on www.bitlonger.com, gets redirected URL */

function downloadURL($URL) {
 if(!function_exists('curl_init')) {
 die ("Curl PHP package not installedn");
 }

 /*Initializing CURL*/
 $curlHandle = curl_init();

 /*The URL to be downloaded is set*/
 curl_setopt($curlHandle, CURLOPT_URL, $URL);
 /*Return the HTTP headers*/
 curl_setopt($curlHandle, CURLOPT_HEADER, true);
 /*Now execute the CURL, download the URL specified*/
 $response = curl_exec($curlHandle);
 return $response;
}

ob_start();
$urlResponse = downloadURL($_GET['url']);
$ob = ob_get_clean();

$responseHeaders = array();

foreach(explode("\r\n",$ob) as $line) {
        $matches = explode(":",$line,2);
        $responseHeaders[trim($matches[0])] = trim($matches[1]);

}

echo (empty($responseHeaders['Location']) ? 'FAILED' : $responseHeaders['Location']);

