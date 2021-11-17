//defining variables
const form = document.getElementById("inputMe");
const search = document.getElementById("fill-in");
const output = document.getElementById("covid-info");


form.addEventListener("submit",e => {
	e.preventDefault();
	let searchValue = search.value.trim();

	if(!searchValue) {
		alert("please input the search field");
	} else {
		 getResult(searchValue);
	}
})

let searchValue = search.value.trim();
async function getResult(searchValue) {
	try {
      const searchResult = await fetch(`https://covid-193.p.rapidapi.com/history?country=${searchValue}`, {
        "method": "GET",
        "headers": {
          "x-rapidapi-host": "covid-193.p.rapidapi.com",
          "x-rapidapi-key": "ce19d0164fmsh3d383efc0e85ce5p16dcb1jsnb1a4a3c79541"
        }
      });
	    const result= await searchResult.json();
      console.log(result);
	    showData(result);
    }
    catch (err) {
       console.error(err.message);
    }
   
}

function showData(result) {
	output.innerHTML = `
    <div class="container">
    <div class="row-1">
        <div class="cases-continent">
            <p class="continent-text">Continent</p>
            <span class="continent-part">${result.response[0].continent}</span>
        </div>

        <div class="country-population">
            <p class="population-text">Population</p>
            <span class="population-part">${result.response[0].population}</span>
        </div>
        
        <div class="cases-country">
           <p class="country-text">Critical Cases</p>
           <span class="country-part">${result.response[0].cases.critical}</span>
        </div>

        <div class="date">
            <p class="date-text">New Cases</p>
            <span class="date-part">${result.response[0].cases.new}</span>
        </div>
    </div>

    <div class="row-2">
        <div class="cases-digit">
            <p class="digit-text">Confirmed Cases</p>
            <span class="digit-part">${result.response[0].cases.total}</span>
        </div>

        <div class="cases-tested">
            <p class="test-text">Tested</p>
            <span class="test-part">${result.response[0].tests.total}</span>
        </div>

        <div class="cases-recover">
            <p class="recover-text">Recovered</p>
            <span class="recover-part">${result.response[0].cases.recovered}</span>
        </div>

        <div class="cases-deaths">
            <p class="death-text">Deaths</p>
            <span class="death-part">${result.response[0].deaths.total}</span>
        </div>
    </div>
</div>
	`;
var xValues = ["Tested","Confirmed cases","Critical Cases","New Cases", "Recovered","Death",];
var yValues = [`${result.response[0].tests.total}`,`${result.response[0].cases.total}`,`${result.response[0].cases.critical}`,`${result.response[0].cases.new}`,`${result.response[0].cases.recovered}`,`${result.response[0].deaths.total}`];
var barColors = ["green","blue","yellow","blue","gold","red"];

new Chart("myChart", {
    type:"bar",
    data: {
        labels:xValues,
        datasets:[{
            backgroundColor: barColors,
            data:yValues
        }]
    },
    options: {
        legend:{display:false},
        title: {
            display:true,
            text:"Covid-19 Information based on country input"
        }
    }
});
}