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
    const url = `http://ip-api.com/json/${query}?fields=66846719`
    const response = await fetch(url)
    if (!response.ok) {
        console.error('Error fetching data:', response.statusText)
        resultElm.innerHTML = 'Error fetching data:\n' + response.statusText
        return
    } else {
        const data = await response.json()
        resultElm.innerHTML = `
            AS: ${data.as}<br>
            AS Name: ${data.asname}<br>
            City: ${data.city}<br>
            Continent: ${data.continent}<br>
            Continent Code: ${data.continentCode}<br>
            Country: ${data.country}<br>
            Country Code: ${data.countryCode}<br>
            Currency: ${data.currency}<br>
            District: ${data.district}<br>
            Hosting: ${data.hosting}<br>
            ISP: ${data.isp}<br>
            Latitude: ${data.lat}<br>
            Longitude: ${data.lon}<br>
            Mobile: ${data.mobile}<br>
            Offset: ${data.offset}<br>
            Org: ${data.org}<br>
            Proxy: ${data.proxy}<br>
            Query: ${data.query}<br>
            Region: ${data.region}<br>
            Region Name: ${data.regionName}<br>
            Reverse: ${data.reverse}<br>
            Status: ${data.status}<br>
            Timezone: ${data.timezone}<br>
            Zip: ${data.zip}<br>
        `
        console.log(data)
    }
}
