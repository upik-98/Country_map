console.log("Script exicution startes");

const grabAllCountryDetails = async () =>{
    const allCountryDetails = await fetch('http://api.geonames.org/countryInfoJSON?formatted=true&username=upamanyu_geoname').then((value)=>{console.log(value.body)});
    console.log(allCountryDetails);
    const allCountry = allCountryDetails.body;
    console.log(allCountry);

}

//grabAllCountryDetails()

const url = 'http://api.geonames.org/countryInfoJSON?formatted=true&username=upamanyu_geoname';
const countryFlagURL = "https://countryflagsapi.com/svg/"; 

var countrylist 
function load(url, callback) {
  const xhr = new XMLHttpRequest();

  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
        console.log(xhr.response);
        countrylist = xhr.response;

        callback(JSON.parse(countrylist));
    }
  }

  xhr.open('GET', url, true);
  xhr.send('');
}
function loadTheTable(countrylist){
    console.log(countrylist);
    var countryhtml= document.getElementById('country_list');
    var imgURL;
    console.log("title",countryhtml);
    countrylistArray = countrylist["geonames"];
    console.log(countrylistArray);
    for(var i=0;i< countrylistArray.length;i++){
        var countrycode = countrylistArray[i]['isoNumeric'];
        imgURL = countryFlagURL+countrycode;
        countryhtml.innerHTML+=buildHTMLTag(imgURL,countrylistArray[i])
        console.log(countryhtml.innerHTML);
    }
}

load(url,loadTheTable);

function buildHTMLTag(imgURL, country){
    const countryName = country['countryName'];
    const population = country['population'];
    const capital = country['capital'];
    const continentName = country['continentName'];
    
    return '<div class="country">'+
    '<img class = "country_flag" alt = "'+countryName+'"src="'+imgURL+'">'+
    '<span class="country_name">'+countryName+'</span>'+
    '<span class = "country_contents">Capital: <span class="value"> '+capital+'</span></span>'+
    '<span class = "country_contents">Population: <span class="value"> '+population+'</span></span>'+
    '<span class = "country_contents">Region: <span class="value">  '+continentName+'</span></span>'+
    '</div>'
}


