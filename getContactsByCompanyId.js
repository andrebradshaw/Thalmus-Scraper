var contactArr = [];

async function getContactsByCoId(arr){
	var id = arr[0];
	var res = await fetch("https://www.thalamus.co/contacts?type=1&type_id="+id, {"credentials":"include","headers":{"accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8","accept-language":"en-US,en;q=0.9","cache-control":"max-age=0","if-none-match":"W/\"2a2007269f957d6978bced59cd0827e9\"","upgrade-insecure-requests":"1"},"referrerPolicy":"no-referrer-when-downgrade","body":null,"method":"GET","mode":"cors"});
	var dat = await res.json();
	for(i = 0; i < dat.length; i++){
		var csv = [dat[i].id, dat[i].name, dat[i].title, arr[2], dat[i].number, dat[i].email, dat[i].location, dat[i].linkedin, dat[i].skype, dat[i].account_id, dat[i].parent_id, dat[i].contact_type, dat[i].contact_type_id, dat[i].is_hidden, dat[i].created_at, dat[i].updated_at, dat[i].resolved, dat[i].submitter_id, 'https://www.thalamus.co/ad_partners/'+arr[1]];
		contactArr.push(csv);
	}
}
getContactsByCoId(["ea4312b600fb9fcf74240dbe18526f4e2bdc1e17", "simpli-fi", "Simpli.fi"])
