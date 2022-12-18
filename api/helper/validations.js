
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

function validateQueryParam(num){

    num = num.trim()

    function numberCheck(n){
        if(isNaN(n)) throw "ID is not a valid number!"
        if(n%1 !== 0) throw "ID cannot be a decimal!"
        return n
    }

    num = parseInt(numberCheck(num));
    if(num < 0) throw "ID must be greater than or equal to 0"
    num = num.toString()
    return num
};



module.exports = {
    validateSearchTerm,
	checkString,
    validateQueryParam
}