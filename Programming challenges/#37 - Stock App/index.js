const symbolInput = document.querySelector('#symbol')
const stockList = document.querySelector('#stock-list')

// Fecth to api and display de top 10
function fecthTopStocks(){
    fetch('https://www.alphavantage.co/query?function=SECTOR&apikey=My_KEY').then(response => response.json()).then(data => {
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

