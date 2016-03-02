/*** BitLonger v.1.0 ***/

var elements = $('a');
var invisibleSpans = $('span.invisible');
var ellipsisSpans = $('span.tco-ellipsis');

function showHiddenSpans() {
  invisibleSpans.removeClass('invisible');
}

function removeEllipsis() {
  ellipsisSpans.remove();
}

function fullTwitterShortenedLinks () {
  showHiddenSpans();
  removeEllipsis();
}

fullTwitterShortenedLinks();



for (var i = 0; i < elements.length; i++) {

  var element = elements[i];
  if (element.innerHTML.indexOf('bit.ly') != -1 || element.innerHTML.indexOf('bitly.is') != -1 ||
    element.innerHTML.indexOf('ow.ly') != -1 ||
    element.innerHTML.indexOf('is.gd') != -1 ||
    element.innerHTML.indexOf('buff.ly') != -1)  {
  var pageContent = getContentByUrl(element.href, false, null);
  var matches = pageContent.match(/URL=(.*?)"/);
  var firstUrl = matches[1];
  var secondUrl = getContentByUrl("https://bitlonger.herokuapp.com", false, 'url=' + encodeURIComponent(firstUrl));
  if (secondUrl.indexOf('http') != -1) {
    element.innerHTML = secondUrl;
  }
}
}

function getContentByUrl(url, synch_request, params) {
  var urlToGet = url.replace('http://', 'https://');
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("POST", urlToGet, synch_request); // false for synchronous request
  xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlHttp.send(params);
  return xmlHttp.responseText;
}
