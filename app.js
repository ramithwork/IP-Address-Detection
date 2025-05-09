// https://docs.freeipapi.com/

const resultElm = document.getElementById('result')
const queryElm = document.getElementById('query')
const lookupElm = document.getElementById('lookup')

processQuery(queryElm.value.trim())

lookupElm.addEventListener('click', (event) => {
    event.preventDefault()
    processQuery(queryElm.value.trim())
})

async function processQuery(query) {
    resultElm.innerHTML = 'Loading...'

    // freeipapi.com
    const url = `https://freeipapi.com/api/json/${query}`
    const response = await fetch(url)
    if (!response.ok) {
        console.error('Error fetching data:', response.status)
        resultElm.innerHTML = 'Error fetching data:\n' + response.status
        return
    } else {
        const data = await response.json()
        console.log(response.status)
        resultElm.innerHTML = 
        `
            cityName: ${data.cityName}<br>
            continent: ${data.continent}<br>
            continentCode: ${data.continentCode}<br>
            countryCode: ${data.countryCode}<br>
            countryName: ${data.countryName}<br>
            currency.code: ${data.currency.code}<br>
            currency.name: ${data.currency.name}<br>
            ipAddress: ${data.ipAddress}<br>
            ipVersion: ${data.ipVersion}<br>
            isProxy: ${data.isProxy}<br>
            language: ${data.language}<br>
            lattitude: ${data.latitude}<br>
            longitude: ${data.longitude}<br>
            regionName: ${data.regionName}<br>
            timeZone: ${data.timeZone}<br>
            timeZones: ${data.timeZones}<br>
            tlds: ${data.tlds}<br>
            zipCode: ${data.zipCode}<br>
        `
        queryElm.value = data.ipAddress
        console.log(data)
    }
}


// GEO LOCATION
const geoLocationElm = document.getElementById('geolocation')
function geolocate() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback, {
      enableHighAccuracy: true, // Try for more accurate results
      timeout: 5000,           // Maximum time to wait for a result (milliseconds)
      maximumAge: 0            // How long a cached result is considered valid (0 means always get a new one)
    });
  } else {
    console.log("Geolocation is not supported by this browser.")
    geoLocationElm.innerHTML = "Geolocation is not supported by this browser."
    // Optionally fall back to IP-based geolocation here
  }
}

function successCallback(position) {
  const latitude = position.coords.latitude
  const longitude = position.coords.longitude
  const accuracy = position.coords.accuracy

  console.log("Latitude:", latitude)
  console.log("Longitude:", longitude)
  console.log("Accuracy:", accuracy, "meters")

  geoLocationElm.innerHTML = `
    Latitude: ${latitude}<br>
    Longitude: ${longitude}<br>
    Accuracy: ${accuracy} meters
  `

  // You can now use these coordinates to:
  // 1. Display the location on a map (using a map library like Leaflet or Google Maps).
  // 2. Send the coordinates to your server for further processing.
  // 3. Find nearby places using a places API.
}

function errorCallback(error) {
    geoLocationElm.innerHTML = "Error: " + error.message
    console.warn("ERROR(" + error.code + "): " + error.message)
  // Handle errors based on the error.code:
  // 1: PERMISSION_DENIED
  // 2: POSITION_UNAVAILABLE
  // 3: TIMEOUT
  // Optionally fall back to IP-based geolocation here
}

// Call the geolocate function when your page loads or when a user interacts
geolocate();