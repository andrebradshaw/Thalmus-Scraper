//utility functions
function checker(elm, type) {  if (elm != undefined) {    if (type == 'src') {     return elm.getAttribute('src');    }	if (type == 'click') {     elm.click();    }	if (type == 'href') {      return elm.href;    }    if (type == 'text') {      return elm.innerText.trim().replace(/,/g, '');    }    if (type == 'next') {      return elm;    }  } else {    return '';  }}
function reg(elm, n){if(elm != null){return elm[n];}else{return '';}}
function unq(arrgh){	return arrgh.filter((elm,pos,arr) =>{	return arr.indexOf(elm) == pos;});}
var cn = (ob, nm) => {    return ob.getElementsByClassName(nm)  };
var tn = (ob, nm) => {    return ob.getElementsByTagName(nm)  };

// container to house the profile paths
var containArr = [];

var pathArr = ['your','Paths','GoHere'];

function parseRow(obj,path){
	var person = checker(cn(obj, 'item__person')[0],'text');
	var role = checker(cn(obj, 'item__role')[0],'text');
	var contact = checker(cn(obj, 'item__info')[0],'text');
	return [path,person,role,contact];
}

// function to handle the fetch 
function dododo(link,n){
	var rando = Math.round(Math.random()*100);

	setTimeout(()=>{
		fetch("https://www.thalamus.co/ad_partners/"+link+"/contacts", {"credentials":"include","headers":{"accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8","accept-language":"en-US,en;q=0.9","cache-control":"max-age=0","if-none-match":"W/\"6251d0eac14f59c7c1f18bf5813b0c80\"","upgrade-insecure-requests":"1"},"referrer":"https://www.thalamus.co/ad_partners/","referrerPolicy":"no-referrer-when-downgrade","body":null,"method":"GET","mode":"cors"})
		.then(response => response.text()).then(text => {
		return text;
		})
		.then(html => {
			var parser = new DOMParser();
   			var doc = parser.parseFromString(html, "text/html");
			var rows = cn(doc,'item item--no-role');
			for(r=0; r<rows.length; r++){
				var row = parseRow(rows[r],link);
				containArr.push(row);
            }

		})
	},((n+1)*490)+rando)
}
for(i=0; i<pathArr.length; i++){
	dododo(pathArr[i],i)
}
