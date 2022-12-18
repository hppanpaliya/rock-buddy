const axios = require('axios');
require('dotenv').config();
let helper = require('../helper')
const {validateQueryParam, checkString} = helper.validations


/** URL Config */
let url = `https://app.ticketmaster.com/discovery/v2/events?apikey=${process.env.TM_API_KEY}`
let ts = new Date();
let day = ts.getDate();
if (day < 10) day = "0" + day
ts = ts.getFullYear() + "-" + (ts.getMonth()+1) + "-" + day + "T00:00:00Z";
const baseUrl = url + `&locale=en-us&startDateTime=${ts}&classificationName=rock&size=50&countryCode=US`;

async function displayUpcomingEvents(page=0){

    //1. validate
    if(arguments.length !== 1) throw "Invalid number of arguments!";
    page = validateQueryParam(page)
    
    // 2. Query api
    let apiUrl = baseUrl + `&page=${page}` + `&sort=date,asc`
    const data = await axios.get(apiUrl);

    //3. return
    return data.data;
};

async function searchEvents(keyword, page=0){

    //1. validate
    if(arguments.length !== 2) throw "Invalid number of arguments!";
    page = validateQueryParam(page);
    keyword = checkString(keyword);
    
    // 2. Query api
    let apiUrl = baseUrl + `&keyword=${keyword}` + `&page=${page}` + `&sort=date,asc`
    const data = await axios.get(apiUrl);

    //3.return
    return data.data;
};

module.exports = {
    displayUpcomingEvents,
    searchEvents
}

