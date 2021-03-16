const { default: axios } = require("axios");
const mysql = require("./db");
const fs = require("fs");

getCompanies();
// getData("TATAPOWER.BO")
async function getCompanies() {
  try {
    const companyRes = await mysql
      .promise()
      .query("select symbol from companies");
    companyRes[0].forEach((comp) => {
      getData(comp.symbol);
    });
  } catch (e) {
    console.error(e);
  }
}
async function getData(symbol) {
  try {
    const url = `https://query1.finance.yahoo.com/v7/finance/download/${symbol}.NS?period1=0&period2=1614643200&interval=1d&events=history&includeAdjustedClose=true`;
    const yahoodata = await axios.get(url);
    console.log(symbol);
    fs.writeFileSync(`./data/${symbol}.csv`, yahoodata.data);
  } catch (e) {
    // console.error("catch error: ", e);
    console.error("Error Caught ",symbol);
    fs.appendFileSync(`./error/${symbol}.log`, JSON.stringify(e));
  }
}
