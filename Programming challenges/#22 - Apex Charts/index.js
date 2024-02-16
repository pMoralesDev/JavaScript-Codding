const chartOptions = {
    chart: {
        type: 'area',
        height: 180,
        toolbar: {show: false},
        zoom: {enabled: false}
    },
    colors: ['#1FD6FF'],
    series: [{ name: 'Views', data: [18, 50, 42, 94, 41, 65]}],
    dataLabels: {enabled: false},
    stroke: { width: 3, curve: 'smooth'},
    fill: {
        type: 'gradient',
        gradient: {
            shadeIntensity: 1,
            opacityForm: 0.7,
            opacityTo: 0,
            stops: [0, 90, 100]
        }
    },
    xaxis: {
        categories: ['Feb', 'Apr', 'Jun', 'Aug', 'Oct', 'Dec'],
        axisBorder: { show: false},
        labels: { style: { colors: '#a8a8a8', fontFamily: 'Poppins'}}
    },
    yaxis: { show:false},
    grid: {
        borderColor: 'rgba(0, 0, 0, 0.1)',
        padding: { top: -30, bottom: -8, left: 12, rigth: 12}
    },
    tooltip: {
        enabled: true,
        Y: {formatter: value => `${value}K` },
        style: { fontFamily: 'Poppins'}
    },
    makers: {show: false}
}

const chart = new ApexCharts(document.querySelector('.chart-area'), chartOptions)
chart.render()