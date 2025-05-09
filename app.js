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
    geoLocationElm.innerHTML = 'Loading...'
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback, {
      enableHighAccuracy: true, // Try for more accurate results
      timeout: 5000,           // Maximum time to wait for a result (milliseconds)
      maximumAge: 0            // How long a cached result is considered valid (0 means always get a new one)
    })
  } else {
    console.log("Geolocation is not supported by this browser.")
    geoLocationElm.innerHTML = "Geolocation is not supported by this browser."
    // Optionally fall back to IP-based geolocation here
  }
}

function successCallback(position) {
    console.log(position)
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude
    const accuracy = position.coords.accuracy
    const altitude = position.coords.altitude
    const heading = position.coords.heading
    const speed = position.coords.speed

    
    console.log("Latitude:", latitude)
    console.log("Longitude:", longitude)
    console.log("Accuracy:", accuracy, "meters")
    
    geoLocationElm.innerHTML = `
        Latitude: ${latitude}<br>
        Longitude: ${longitude}<br>
        Accuracy: ${accuracy} meters<br>
        Altitude: ${altitude} meters<br>
        Heading: ${heading} degrees<br>
        Speed: ${speed} meters/second
    `

    console.log("Coordinates: *********", latitude, longitude)
    showPlaceData(latitude, longitude)

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

async function showPlaceData(latitude, longitude) {
    const url = `https://nominatim.openstreetmap.org/reverse.php?lat=${latitude}&lon=${longitude}&zoom=18&format=jsonv2`
    const response = await fetch(url)
    if (!response.ok) {
        console.error('Error fetching place data:', response.status)
        return
    }
    const data = await response.json()
    console.log(data)
    // Process and display the place data as needed
    document.getElementById('place-data').innerHTML = `
        address.city: ${data.address.city}<br>
        address.country: ${data.address.country}<br>
        address.country.code: ${data.address.country.code}<br>
        address.postcode: ${data.address.postcode}<br>
        address.road: ${data.address.road}<br>
        address.state: ${data.address.state}<br>
        address.suburb: ${data.address.suburb}<br>
        address.village: ${data.address.village}<br>
        addresstype: ${data.addresstype}<br>
        category: ${data.category}<br>
        display_name: ${data.display_name}<br>
        importance: ${data.importance}<br>
        lat: ${data.lat}<br>
        licence: ${data.licence}<br>
        name: ${data.name}<br>
        osm_id: ${data.osm_id}<br>
        osm_type: ${data.osm_type}<br>
        place_id: ${data.place_id}<br>
        place_rank: ${data.place_rank}<br>
        type: ${data.type}<br>
    `
}

// Call the geolocate function when your page loads or when a user interacts
geolocate();

// WatchPosition
const watchPositionElm = document.getElementById('watch-position')
function watchPosition() {
    watchPositionElm.innerHTML = 'Loading...'
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(success, error, {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        });
    } else {
        console.log("Geolocation is not supported by this browser.")
        watchPositionElm.innerHTML = "Geolocation is not supported by this browser."
    }
}

function success(position) {
    console.log("WatchPosition", position)
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude
    const accuracy = position.coords.accuracy
    const altitude = position.coords.altitude
    const heading = position.coords.heading
    const speed = position.coords.speed

    console.log("Latitude:", latitude)
    console.log("Longitude:", longitude)
    console.log("Accuracy:", accuracy, "meters")

    watchPositionElm.innerHTML = `
        Live Latitude: ${latitude}<br>
        Live Longitude: ${longitude}<br>
        Live Accuracy: ${accuracy} meters<br>
        Altitude: ${altitude} meters<br>
        Heading: ${heading} degrees<br>
        Speed: ${speed} meters/second
    `
}
function error(error) {
    watchPositionElm.innerHTML = "Error: " + error.message
    console.warn("ERROR(" + error.code + "): " + error.message)
}
watchPosition()