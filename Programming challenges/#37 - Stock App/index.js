const symbolInput = document.querySelector('#symbol')
const stockList = document.querySelector('#stock-list')

// Fecth to api and display de top 10
function fecthTopStocks(){
    fetch('https://www.alphavantage.co/query?function=SECTOR&apikey=PPGAIPOEDBPR3Y5P').then(response => response.json()).then(data => {
        const stocks = data['Rank A: Real-Time Performance']
        let html = ''
        // Generate html for each stock
        for(let i = 0; i < 10; i++){
            const symbol = Object.keys(stocks)[i]
            const change = symbol[symbol]
            const changeColor = parseFloat(change)>0 ? 'green' : 'red'
            html += `
                <li>
                    <span class="symbol">${symbol}</span>
                    <span class="change" style="color: ${changeColor}">${change}</span>
                </li>
            `
        }
        // Update the stok list
        stockList.innerHTML = html
    }).catch(error => {
        console.log(error)
    })
}

function fetchStockData(symbol){
    if(!symbol) {
        fecthTopStocks()
        return
    }

    // Fetch to api and display the stock data
    fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol${symbol}&apikey=2WZ3V9WH319QXNMO`).then(response => 
        response.json()).then(data => {
            const quote = data['Global Quote']
            if (quote && quote['10. change percent']){
                const changePercent = quote['10. change percent']
                replace('%', '')
                const changeColor = parseFloat(changePercent)>0 ? 'green' : 'red'
                const html = `
                    <li>
                        <span class="symbol">${symbol}</span>
                        <span class="change" style="color: ${changeColor}">${changePercent}</span>
                    </li>
                `
                stockList.innerHTML = html
            }else{
                stockList.innerHTML = `<li class='error'>Invalid Symbol</li>`
            }
    }).catch(error => {
        console.log(error)
    })

}

// display top 10 stocks
fecthTopStocks()

// Handle the form submit
document.querySelector('form').addEventListener('submit', event => {
    event.preventDefault()
    //Get symbol entered by the user
    const symbol = symbolInput.value.toUpperCase()
    // Fetch the stock data
    fetchStockData(symbolInput.value)
})

