function checker(elm, type) {  if (elm != undefined) {    if (type == 'src') {     return elm.getAttribute('src');    }	if (type == 'click') {     elm.click();    }	if (type == 'href') {      return elm.href;    }    if (type == 'text') {      return elm.innerText.trim().replace(/,/g, '');    }    if (type == 'next') {      return elm;    }  } else {    return '';  }}

var reg = (elm, n) => elm != null ? elm[n] : '';

var cn = (ob, nm) => ob.getElementsByClassName(nm);

var tn = (ob, nm) => ob.getElementsByTagName(nm);

var gi = (ob, nm) => ob.getElementById(nm);

var delay = (ms) => new Promise(res => setTimeout(res, ms));


var pages = parseInt(checker(tn(cn(document, 'pagination')[0], 'a')[tn(cn(document, 'pagination')[0], 'a').length - 2], 'text'));

var containArr = [];

async function getCompanyIds(p, type){
	var res = await fetch("https://www.thalamus.co/"+type+"?page=" + (p + 1), {
        "credentials": "include",
        "headers": {
          "accept": "*/*;q=0.5, text/javascript, application/javascript, application/ecmascript, application/x-ecmascript",
          "accept-language": "en-US,en;q=0.9",
          "x-csrf-token": "zwgDu/HrFaodOcW9JvhBAMvOOSGdYFp7GwKwipE+0uTQ6lKoVKDyzCmspcI9KP9eu95AX8nU1Sd3ABJvtm1C5g==",
          "x-requested-with": "XMLHttpRequest"
        },
        "referrer": "https://www.thalamus.co/ad_partners",
        "referrerPolicy": "no-referrer-when-downgrade",
        "body": null,
        "method": "GET",
        "mode": "cors"
      });
	var text = await res.text();
	var regXgroups = /(?<=ad_partner_)(.+?)\\'.+?href=\\'\/ad_partners\/(.+?)\\.+?item__title\\'>\\n(.+?)\\n/;
	var ids = text.match( /ad_partner_.+?\\'.+?href=\\'\/ad_partners\/.+?\\.+?item__title\\'>\\n.+?\\n/g);
	ids.forEach(itm => {
		var rx = regXgroups.exec(itm);
		var inArr = containArr.some(elm=> elm == rx[1]);
		inArr ?  console.log(rx[2] + ' already in array') : containArr.push([rx[1], rx[2], rx[3]]);
	});
}

async function looper(str){
	for(i=0; i<pages; i++){
		await delay(781 + Math.round(Math.random() * 100));
		getCompanyIds(i,str);
		console.log(i);
    }
}

looper('ad_partners')
