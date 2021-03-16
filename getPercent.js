const mysql = require('./db');


Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

getData();
async function getData(){
    try{
        let allCompanyData = {};
        const predictionData = await mysql.promise().query('select * from marketanalysis.bullishfornextday2ndmar21')
        // console.log(predictionData[0])
        predictionData[0].forEach(prediction => {
            prediction.date = new Date(Number(prediction.date.substring(6)),Number(prediction.date.substring(3,5))-1,Number(prediction.date.substring(0,2))+1)
            getSingle(prediction.symbol, prediction.date)
        });
        async function getSingle(symbol,date){
            try{
                const compnayData = await mysql.promise().query(`select * from \`${symbol}\``)
                compnayData[0].forEach(row=>{
                    row.date = new Date(Number(row.Date.substring(0,4)),Number(row.Date.substring(5,7))-1,Number(row.Date.substring(8,10))+1)
                    // console.log(row.date)
                })
                console.log(symbol, date)
                console.log(compnayData[0][0].date)
                const actualData = compnayData[0].filter(item=>{console.log(item.date); return item.date === date})
                console.log(actualData)
                // console.log(compnayData[0][0])
            }catch(e){console.error(e)}
        }
        console.log("done.")
    }catch(e){console.error(e)}
}