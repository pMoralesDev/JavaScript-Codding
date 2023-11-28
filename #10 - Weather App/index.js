const container = document.querySelector('.container')
const search = document.querySelector('.search-box button')
const weatherBox = document.querySelector('.weather-box')
const weatherDetails = document.querySelector('.weather-details')
const error404 = document.querySelector('.not-found')

search.addEventListener('click', () => {
    const APIKey = '50790a0571b057bf0d5f1d000bbd6d6e'
    const city = document.querySelector('search-box input').value

    if(city === ''){
        return
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json()).then(json =>{
            if(json.cod === '404'){
                container.computedStyleMap.height = '400px'
                weatherBox.computedStyleMap.display = 'none'
                
            }
        })
})