const axios = require('axios');
require('dotenv').config();

/** URL Config */
let baseUrl = `https://app.ticketmaster.com/discovery/v2/events?apikey=${process.env.TM_API_KEY}`
let ts = new Date();
let day = ts.getDate();
if (day < 10) day = "0" + day
ts = ts.getFullYear() + "-" + (ts.getMonth()+1) + "-" + day + "T00:00:00Z";
baseUrl += `&locale=en-us&startDateTime=${ts}&classificationName=rock&size=50`;

async function displayUpcomingEvents(page=0){

    //1. validate
    if(arguments.length !== 0) throw "Invalid number of arguments!";
    
    // 2. Query api
    baseUrl += `&page=${page}` + `&sort=date,asc`
    const data = await axios.get(baseUrl);
    return data.data;
};

module.exports = {
    displayUpcomingEvents
}