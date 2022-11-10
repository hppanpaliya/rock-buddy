
function validateSearchTerm(body){
    if(! body.searchTerm) throw "searchTerm not found in the request body.";
    
    let term = body.searchTerm;

    if(typeof(term) !== 'string') throw "Search type must be string.";
    term = term.trim();
    if (term.length < 1) throw "Search term must be at least 1 character.";
    
    return term; 
}

module.exports = {
    validateSearchTerm
}