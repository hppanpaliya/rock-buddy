
function validateSearchTerm(body){
    if(! body.searchTerm) throw "searchTerm not found in the request body.";
    
    let term = body.searchTerm;

    if(typeof(term) !== 'string') throw "Search type must be string.";
    term = term.trim();
    if (term.length < 1) throw "Search term must be at least 1 character.";
    
    return term; 
}

function checkString(str) { 
	if(!str) throw `Error: You must supply an a string.`;
	if(typeof(str) !== 'string') throw `Error: Input must be of type  string.`;
	str = str.trim();
	if(str.length === 0) throw `Error: Input must not be empty.`;
	return str;
}



module.exports = {
    validateSearchTerm,
	checkString
}