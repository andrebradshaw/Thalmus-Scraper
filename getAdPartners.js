
//utility functions
function checker(elm, type) {  if (elm != undefined) {    if (type == 'src') {     return elm.getAttribute('src');    }	if (type == 'click') {     elm.click();    }	if (type == 'href') {      return elm.href;    }    if (type == 'text') {      return elm.innerText.trim().replace(/,/g, '');    }    if (type == 'next') {      return elm;    }  } else {    return '';  }}
function reg(elm, n){if(elm != null){return elm[n];}else{return '';}}
function unq(arrgh){	return arrgh.filter((elm,pos,arr) =>{	return arr.indexOf(elm) == pos;});}
var cn = (ob, nm) => {    return ob.getElementsByClassName(nm)  };
var tn = (ob, nm) => {    return ob.getElementsByTagName(nm)  };

// container to house the profile paths
var containArr = [];

// number of pages to loop
var pages = parseInt(checker(tn(cn(document, 'pagination')[0],'a')[tn(cn(document, 'pagination')[0],'a').length-2],'text'))

// function to handle the fetch 
function dododo(p){
	var rando = Math.round(Math.random()*100);
	setTimeout(()=>{
		fetch("https://www.thalamus.co/ad_partners?page="+(p+1), {"credentials":"include","headers":{"accept":"*/*;q=0.5, text/javascript, application/javascript, application/ecmascript, application/x-ecmascript","accept-language":"en-US,en;q=0.9","x-csrf-token":"OWe9hmFXP4GVJ1qdAPzOFj2SYkHNTJHN3jgGzx1EvmD1XE3enTw+BLOJbiJcmvXbVVUKWZLxcVWGul6/TGMKZw==","x-requested-with":"XMLHttpRequest"},"referrer":"https://www.thalamus.co/ad_partners","referrerPolicy":"no-referrer-when-downgrade","body":null,"method":"GET","mode":"cors"})
		.then(response => response.text()).then(text => {
		return text;
		})
		.then(html => {
			var parser = new DOMParser();
   			var doc = parser.parseFromString(html, "text/html");
			var paths = unq(doc.body.innerHTML.match(/(?<=href=\"\\'\/ad_partners\/).+?(?=\\')/g))
			console.log(paths);
			paths.forEach(itm=>{containArr.push(itm)})
		})
	},((p+1)*4790)+rando)
}

// loop runs the function. passes the iterator which sets the delay within the dododo function
for(i=0; i<pages; i++){
	dododo(i)
}
