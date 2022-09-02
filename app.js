console.log("Script exicution startes");

const grabAllCountryDetails = async () =>{
    const allCountryDetails = await fetch('http://api.geonames.org/countryInfoJSON?formatted=true&username=upamanyu_geoname').then((value)=>{console.log(value.body)});
    console.log(allCountryDetails);
    const allCountry = allCountryDetails.body;
    console.log(allCountry);

}



const url = 'http://api.geonames.org/countryInfoJSON?formatted=true&username=upamanyu_geoname';
const countryFlagURL = "https://countryflagsapi.com/svg/"; 

var countrylist; // use the country list from countrylist.js file if in test mode.
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
        var countrycode = countrylistArray[i]['countryCode'];
        imgURL = countryFlagURL+countrycode;
        countryhtml.innerHTML+=buildHTMLTag(imgURL,countrylistArray[i])
        console.log(countryhtml.innerHTML);
    }
    setCookie("countrylist",countrylist,10);
}

//load(url,loadTheTable);

//loadTheTable(countrylist)

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
var switch_dark_mode=0;
function DarkModeButton(){
    var darkModeText = document.getElementById("DarkModeButton");
    var root_variable = document.querySelector(':root');
    if(switch_dark_mode%2==0){
        root_variable.style.setProperty('--background', 'black');
        root_variable.style.setProperty('--nav-background', 'black');
        root_variable.style.setProperty('--text-color', 'white');
        root_variable.style.setProperty('--box-background', 'grey');
        darkModeText.innerHTML="Dark Mode";
    }else{
        root_variable.style.setProperty('--background', '#ededed');
        root_variable.style.setProperty('--nav-background', 'white');
        root_variable.style.setProperty('--text-color', 'black');
        root_variable.style.setProperty('--box-background', 'white');
        darkModeText.innerHTML="Light Mode";
    }
    switch_dark_mode+=1;
}
function Filter(region){
    console.log(region);
    var countrydiv = document.getElementsByClassName('country');
    for(var i=0;i<countrydiv.length;i++){
        if(countrydiv[i].childNodes[4].childNodes[1].innerText.trim() !== region){
            countrydiv[i].style="display:none;";
        }
        else{
            countrydiv[i].style="";
        }
        if(region === ""){
            countrydiv[i].style="";
        }
    console.log(i, countrydiv[i].childNodes[4].childNodes[1].innerText);
    }
}

function searchCountryList(){
    var countrydiv = document.getElementsByClassName('country');
    var searchValue = document.getElementById('searchBar');
    console.log(searchValue.value);
    for(var i=0;i<countrydiv.length;i++){
        var country_name = countrydiv[i].childNodes[1].innerText.toLowerCase();
        if(country_name.indexOf(searchValue.value.toLowerCase()) === -1){
            countrydiv[i].style="display:none;";
        }
        else{
            countrydiv[i].style="";
        }
        console.log(country_name);
    }
}



function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
    console.log("document.cookie",document.cookie);
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}


function InitLoad(){
    console.log(getCookie("countrylist"));
    if(getCookie("countrylist")){
        loadTheTable(getCookie("countrylist"));
    }
    else{
        load(url,loadTheTable);  
    }
}

InitLoad();

