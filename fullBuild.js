//test build. must run on https://www.thalamus.co/ad_partners//utility functions

function checker(elm, type) {  if (elm != undefined) {    if (type == 'src') {     return elm.getAttribute('src');    }	if (type == 'click') {     elm.click();    }	if (type == 'href') {      return elm.href;    }    if (type == 'text') {      return elm.innerText.trim().replace(/,/g, '');    }    if (type == 'next') {      return elm;    }  } else {    return '';  }}
function reg(elm, n){if(elm != null){return elm[n];}else{return '';}}
function unq(arrgh){	return arrgh.filter((elm,pos,arr) =>{	return arr.indexOf(elm) == pos;});}
var cn = (ob, nm) => {    return ob.getElementsByClassName(nm)  };
var tn = (ob, nm) => {    return ob.getElementsByTagName(nm)  };

var containArr = [];

var pages = parseInt(checker(tn(cn(document, 'pagination')[0], 'a')[tn(cn(document, 'pagination')[0], 'a').length - 2], 'text'));

function parseRow(obj, path) {
  var person = checker(cn(obj, 'item__person')[0], 'text');
  var role = checker(cn(obj, 'item__role')[0], 'text');
  var contact = checker(cn(obj, 'item__info')[0], 'text');
  var email = reg(/\S+@\S+(?=\n)/.exec(contact), 0);
  var phone = reg(/(?<=\n\W+)\d+.+/.exec(contact), 0);
  return [path, person, role, email, phone];
}

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

function getContacts(link, n) {
  var rando = Math.round(Math.random() * 100);

  setTimeout(() => {
    fetch("https://www.thalamus.co/ad_partners/" + link + "/contacts", {
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
        var rows = cn(doc, 'item item--no-role');
        for (r = 0; r < rows.length; r++) {
          var row = parseRow(rows[r], link);
          console.log(row);
          containArr.push(row);
        }

      })
  }, ((n + 1) * 7010) + rando)
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
          getContacts(paths[i], i)
        }
      })
	if(p == (pages-1)){
		setTimeout(() => {
			converter(containArr);
    	},15901);
  	}
  }, ((p + 1) * 105790) + rando)
}

for (i = 0; i < pages; i++) {
  getPaths(i)
}
