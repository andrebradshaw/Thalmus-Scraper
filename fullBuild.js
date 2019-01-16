//test build. must run on https://www.thalamus.co/ad_partners//utility functions
function checker(elm, type) {  if (elm != undefined) {    if (type == 'src') {     return elm.getAttribute('src');    }	if (type == 'click') {     elm.click();    }	if (type == 'href') {      return elm.href;    }    if (type == 'text') {      return elm.innerText.trim().replace(/,/g, '');    }    if (type == 'next') {      return elm;    }  } else {    return '';  }}
function reg(elm, n){if(elm != null){return elm[n];}else{return '';}}
function unq(arrgh){	return arrgh.filter((elm,pos,arr) =>{	return arr.indexOf(elm) == pos;});}
var cn = (ob, nm) => {    return ob.getElementsByClassName(nm)  };
var tn = (ob, nm) => {    return ob.getElementsByTagName(nm)  };

function parseRow(obj, path) {
function r(s){return s.replace(/,/g,'')}
  var person = checker(cn(obj, 'item__name')[0], 'text');
  var geo = checker(cn(obj, 'item__location')[0], 'text');
  var role = checker(cn(obj, 'item__role')[0], 'text');
  var contact = checker(cn(obj, 'item__info')[0], 'text');
  var email = reg(/\S+@\S+(?=\n)/.exec(contact), 0);
  var phone = reg(/(?<=\n\W+)\d+.+/.exec(contact), 0);
  return [path, r(geo), r(person), r(role), r(email), r(phone)];
}

var pages = parseInt(checker(tn(cn(document, 'pagination')[0], 'a')[tn(cn(document, 'pagination')[0], 'a').length - 2], 'text'));

function converter(arr){
  var dl_output = arr.map(itm=>{	return itm.toString().replace(/$/, '\r'); }).toString().replace(/\r,/g, '\r');
  function dl(filename, text) {
    var elmi = document.createElement('a');
    elmi.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    elmi.setAttribute('download', filename);
    elmi.style.display = 'none';
    document.body.appendChild(elmi);
    elmi.click();
    document.body.removeChild(elmi);
  }
  dl('thalmus_dl.csv', dl_output);
}

var containArr = [];

function getContactPages(lnk,d){
var rando = Math.round(Math.random() * 100);
  setTimeout(() => {
	var arr = [];
    fetch("https://www.thalamus.co/ad_partners/" + lnk + "/contacts", {
        "credentials": "include",
        "headers": {
          "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
          "accept-language": "en-US,en;q=0.9",
          "cache-control": "max-age=0",
          "if-none-match": "W/\"6251d0eac14f59c7c1f18bf5813b0c80\"",
          "upgrade-insecure-requests": "1"
        },
        "referrer": "https://www.thalamus.co/ad_partners/",
        "referrerPolicy": "no-referrer-when-downgrade",
        "body": null,
        "method": "GET",
        "mode": "cors"
      })
      .then(response => response.text()).then(text => {
        return text;
      })
      .then(html => {
        var parser = new DOMParser();
        var doc = parser.parseFromString(html, "text/html");
		var pg = parseInt(checker(tn(cn(doc, 'pagination')[0], 'a')[tn(cn(doc, 'pagination')[0], 'a').length - 2], 'text'));
		pushcontacts(doc,lnk)
		for(i=1; i<=pg; i++){
			getContacts(lnk,i)
		}
		})
  }, ((d + 1) * 10010) + rando)
}

function pushcontacts(obj,lk){
	var rows = cn(obj, 'item__person');
	console.log(lk + ' has ' + rows.length + ' contacts');
    for (r = 1; r < rows.length; r++) {
    	var row = parseRow(rows[r].parentElement, lk);
    	containArr.push(row);
	}
}

function getContacts(link, n) {
  var rando = Math.round(Math.random() * 100);
  setTimeout(() => {
    fetch("https://www.thalamus.co/ad_partners/" + link + "/contacts?page="+n, {
        "credentials": "include",
        "headers": {
          "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
          "accept-language": "en-US,en;q=0.9",
          "cache-control": "max-age=0",
          "if-none-match": "W/\"6251d0eac14f59c7c1f18bf5813b0c80\"",
          "upgrade-insecure-requests": "1"
        },
        "referrer": "https://www.thalamus.co/ad_partners/",
        "referrerPolicy": "no-referrer-when-downgrade",
        "body": null,
        "method": "GET",
        "mode": "cors"
      })
      .then(response => response.text()).then(text => {
        return text;
      })
      .then(html => {
        var parser = new DOMParser();
        var doc = parser.parseFromString(html, "text/html");
        pushcontacts(doc,link)
      })
  }, ((n) * 4010) + rando)
}


function getPaths(p) {
  var rando = Math.round(Math.random() * 100);
  setTimeout(() => {
    fetch("https://www.thalamus.co/ad_partners?page=" + (p + 1), {
        "credentials": "include",
        "headers": {
          "accept": "*/*;q=0.5, text/javascript, application/javascript, application/ecmascript, application/x-ecmascript",
          "accept-language": "en-US,en;q=0.9",
          "x-csrf-token": "OWe9hmFXP4GVJ1qdAPzOFj2SYkHNTJHN3jgGzx1EvmD1XE3enTw+BLOJbiJcmvXbVVUKWZLxcVWGul6/TGMKZw==",
          "x-requested-with": "XMLHttpRequest"
        },
        "referrer": "https://www.thalamus.co/ad_partners",
        "referrerPolicy": "no-referrer-when-downgrade",
        "body": null,
        "method": "GET",
        "mode": "cors"
      })
      .then(response => response.text()).then(text => {
        return text;
      })
      .then(html => {
        var parser = new DOMParser();
        var doc = parser.parseFromString(html, "text/html");
        var paths = unq(doc.body.innerHTML.match(/(?<=href=\"\\'\/ad_partners\/).+?(?=\\')/g))

        for (i = 0; i < paths.length; i++) {
          getContactPages(paths[i], i)
        }
      })
	if(p == (pages-1)){
		setTimeout(() => {
			converter(containArr);
    	}, 115901);
  	}
  }, ((p) * 101790) + rando)
}

for (i = 0; i < pages; i++) {
  getPaths(i)
}

var time = Math.round((Math.ceil(Math.ceil((pages * 10)+102)/60)/60)*10)/10;
var timeMsg = 'This will take about '+time+' hours to complete';
console.log(timeMsg);
