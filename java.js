const weatherDiv = document.getElementById('weather')
const apiKey='d61504028cef10a2e88cf86276beafc0'
const baseUrl ='https://pro.openweathermap.org/data/2.5/forecast/climate'
const errorScreen= document.getElementById('errorScreen');
const app = document.getElementById('app')
// const dropdown = document.getElementById('dropdown')
// const cityInput = document.getElementById('cityInput');

// const cities = [
//     "Lagos",
//     "Abuja",
//     "Ibadan",
//     "Kano"
// ];
// cityInput.addEventListener('input',()=>{
//     const value = input.value.toLowerCase();
//     dropdown.innerHTML="",
//     if (!value){
//         dropdown.classList.add('hidden');
//         return;
//     }
//     const matches =cities.filter(city=>
//         city.toLowerCase().includes(value)
//     );
//     matches.forEach(city =>{
//         const li = document.createElement('li')
//         li.textContent.city;

//         li.onclick =()=>{
//             input.value =city;
//             dropdown.classList.add('hidden');
//         };
//         dropdown.appendChild(li);
//     });
//     dropdown.classList.toggle('hidden', matches.length === 0)
// })

// handProgres
// function handleError (){
//     weatherDiv.classList.remove('hidden')
// }
const locationName = document.getElementById('locationName');
const feels =document.getElementById('feels');
const humidity=document.getElementById('humidity');
const wind=document.getElementById('wind');
const precip =document.getElementById('percip');
const today = new Date();

// const formatedDate = today.getDate()+ "/" +(today.getMonth()+1+"/"+ today.getFullYear())
document.getElementById('date').textContent= today.toDateString();
// console.log(formatedDate);


searchBtn.addEventListener('click', getWeather);
async function getWeather(){
    const city = document.getElementById('cityInput').value.trim();
    if (!city){
        // handleError()
        weatherDiv.textContent="please enter a city";
        return;
    }
    try{
        const geoUrl =`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;
        const geoRes = await fetch (geoUrl);
        if(!geoRes.ok) throw new Error ('invalid location');
        const geoData = await geoRes.json()
        if (geoData.length===0){
            throw new Error ('location not found')
        }
        const {lat, lon}= geoData[0];
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
        const weatherRes = await fetch(weatherUrl);
        if(!weatherRes.ok) throw new Error('weather fetch failed');
        const weatherData = await weatherRes.json();
        // weatherDiv.textContent=JSON.stringify(weatherData);
        console.log('result is', weatherData)
        locationName.textContent=`${weatherData.name}, ${weatherData.sys.country}`
        feels.textContent=`${weatherData.main.feels_like}`
        humidity.textContent=`${weatherData.main.humidity}%`
        // wind.textContent=`${weatherData.main.wind}`
        // precip.textContent=`${weatherData.main.precipa}`
        app.style.display="block"
        errorScreen.style.display="none"
    }catch(error){
        console.log(error)
        showErrorScreen()
        // weatherDiv.textContent= error.message
    }
}
function showErrorScreen (){
    app.classList.add('hidden')
    errorScreen.classList.remove('hidden')
}
function reloadPage(){
    location.reload()
}