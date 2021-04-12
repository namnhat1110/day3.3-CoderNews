const cryptoURL = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=3&convert=USD&CMC_PRO_API_KEY=d0f410af-17f9-4a74-8c1e-d8901f516b5c";

let myChart;
let coins;

const colors = [
    {
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
    },
    {
        borderColor: "rgba(29, 36, 252, 1)",
        backgroundColor: "rgba(29, 36, 252, 0.2)",
    },
    {
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
    },
];


function renderLineGraph(coins) {
    const ctx = document.getElementById("myChart");
    const price = coins[0].quote.USD.price;
    const [ninetyAgoPrice] = getHistoricPrices(coins[0]);
    const timeAgo = ["90d", "60d", "30d", "7d", "24h", "1h", "Current"];
    const myChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: timeAgo,
            datasets: [
                {
                    label: "Bitcoin",
                    borderWidth: 1,
                    data: getHistoricPrices(coins[0]),
                    ...colors[0],
                },
                {
                    label: "Ethereum",
                    borderWidth: 1,
                    data: getHistoricPrices(coins[1]),
                    ...colors[1],
                },
                {
                    label: "Binance Coin",
                    borderWidth: 1,
                    data: getHistoricPrices(coins[2]),
                    ...colors[2],
                },
            ],
        },
        options: {
            tooltips: {
                enabled: true,
                mode: "nearest",
                label: function (tooltipItem, data) {
                    var label = data.datasets[tooltipItem.datasetIndex].label || "";

                    if (label) {
                        label += ": ";
                    }
                    label += formatter.format(
                        Math.round(tooltipItem.yLabel * 100) / 100,
                    );
                    return label;
                },
            },
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: false,
                            suggestedMax: 100,
                            suggestedMin: ninetyAgoPrice,
                        },
                    },
                ],
            },
        },
    });
}

function calculatePriceFromPercentageChange(currentPrice, percentageChange) {
    let denominator;
    let historicPrice;
    if (percentageChange >= 100) {
        percentageChange = percentageChange + 100;
        denominator = percentageChange * 0.01;
        historicPrice = currentPrice / denominator;
    }

    if (percentageChange < 100 && percentageChange > 0) {
        denominator = 1 + percentageChange / 100;
        historicPrice = currentPrice / denominator;
    }

    if (percentageChange < 0) {
        const original = (currentPrice / (100 + percentageChange)) * 100;
        historicPrice = original;
    }
    return historicPrice;
}

var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
});


function getHistoricPrices(coins) {
    const {
        percent_change_90d,
        percent_change_60d,
        percent_change_30d,
        percent_change_7d,
        percent_change_24h,
        percent_change_1h,
        price,
    } = coins.quote.USD;

    const ninetyAgoPrice = calculatePriceFromPercentageChange(
        price,
        percent_change_90d
    );
    const sixtyAgoPrice = calculatePriceFromPercentageChange(
        price,
        percent_change_60d
    );
    const thirtyAgoPrice = calculatePriceFromPercentageChange(
        price,
        percent_change_30d
    );
    const sevenAgoPrice = calculatePriceFromPercentageChange(
        price,
        percent_change_7d
    );
    const dayAgoPrice = calculatePriceFromPercentageChange(
        price,
        percent_change_24h
    );
    const hourAgoPrice = calculatePriceFromPercentageChange(
        price,
        percent_change_1h
    );

    return [
        ninetyAgoPrice,
        sixtyAgoPrice,
        thirtyAgoPrice,
        sevenAgoPrice,
        dayAgoPrice,
        hourAgoPrice,
        price,
    ];
}


function getDayAgoDates() {
    const ninetyAgo = new Date();
    ninetyAgo.setDate(ninetyAgo.getDate() - 90);
    const sixtyAgo = new Date();
    sixtyAgo.setDate(sixtyAgo.getDate() - 60);
    const thirtyAgo = new Date();
    thirtyAgo.setDate(thirtyAgo.getDate() - 30);
    const sevenAgo = new Date();
    sevenAgo.setDate(sevenAgo.getDate() - 7);
    return [
        ninetyAgo.toLocaleString(),
        sixtyAgo.toLocaleString(),
        thirtyAgo.toLocaleString(),
        sevenAgo.toLocaleString(),
    ];
}

async function getCryptoPrices() {

    const response = await fetch(cryptoURL);
    const jsonData = await response.json();
    const coins = jsonData.data;
    renderLineGraph(coins);
};

getCryptoPrices();

function changeColor() {
    const CSS_COLOR_NAMES = [
        "AliceBlue",
        "AntiqueWhite",
        "Aqua",
        "Aquamarine",
        "Azure",
        "Beige",
        "Bisque",
        "Black",
        "BlanchedAlmond",
        "Blue",
        "BlueViolet",
        "Brown",
        "BurlyWood",
        "CadetBlue",
        "Chartreuse",
        "Chocolate",
        "Coral",
        "CornflowerBlue",
        "Cornsilk",
        "Crimson",
        "Cyan",
        "DarkBlue",
        "DarkCyan",
        "DarkGoldenRod",
        "DarkGray",
        "DarkGrey",
        "DarkGreen",
        "DarkKhaki",
        "DarkMagenta",
        "DarkOliveGreen",
        "DarkOrange",
        "DarkOrchid",
        "DarkRed",
        "DarkSalmon",
        "DarkSeaGreen",
        "DarkSlateBlue",
        "DarkSlateGray",
        "DarkSlateGrey",
        "DarkTurquoise",
        "DarkViolet",
        "DeepPink",
        "DeepSkyBlue",
        "DimGray",
        "DimGrey",
        "DodgerBlue",
        "FireBrick",
        "FloralWhite",
        "ForestGreen",
        "Fuchsia",
        "Gainsboro",
        "GhostWhite",
        "Gold",
        "GoldenRod",
        "Gray",
        "Grey",
        "Green",
        "GreenYellow",
        "HoneyDew",
        "HotPink",
        "IndianRed",
        "Indigo",
        "Ivory",
        "Khaki",
        "Lavender",
        "LavenderBlush",
        "LawnGreen",
        "LemonChiffon",
        "LightBlue",
        "LightCoral",
        "LightCyan",
        "LightGoldenRodYellow",
        "LightGray",
        "LightGrey",
        "LightGreen",
        "LightPink",
        "LightSalmon",
        "LightSeaGreen",
        "LightSkyBlue",
        "LightSlateGray",
        "LightSlateGrey",
        "LightSteelBlue",
        "LightYellow",
        "Lime",
        "LimeGreen",
        "Linen",
        "Magenta",
        "Maroon",
        "MediumAquaMarine",
        "MediumBlue",
        "MediumOrchid",
        "MediumPurple",
        "MediumSeaGreen",
        "MediumSlateBlue",
        "MediumSpringGreen",
        "MediumTurquoise",
        "MediumVioletRed",
        "MidnightBlue",
        "MintCream",
        "MistyRose",
        "Moccasin",
        "NavajoWhite",
        "Navy",
        "OldLace",
        "Olive",
        "OliveDrab",
        "Orange",
        "OrangeRed",
        "Orchid",
        "PaleGoldenRod",
        "PaleGreen",
        "PaleTurquoise",
        "PaleVioletRed",
        "PapayaWhip",
        "PeachPuff",
        "Peru",
        "Pink",
        "Plum",
        "PowderBlue",
        "Purple",
        "RebeccaPurple",
        "Red",
        "RosyBrown",
        "RoyalBlue",
        "SaddleBrown",
        "Salmon",
        "SandyBrown",
        "SeaGreen",
        "SeaShell",
        "Sienna",
        "Silver",
        "SkyBlue",
        "SlateBlue",
        "SlateGray",
        "SlateGrey",
        "Snow",
        "SpringGreen",
        "SteelBlue",
        "Tan",
        "Teal",
        "Thistle",
        "Tomato",
        "Turquoise",
        "Violet",
        "Wheat",
        "White",
        "WhiteSmoke",
        "Yellow",
        "YellowGreen",
    ];
    let p = myChart.data.datasets;

    for (let i = 0; i < p.length; i++) {
        let index = Math.floor(Math.random() * CSS_COLOR_NAMES.length);
        colors[i].backgroundColor = CSS_COLOR_NAMES[index];
        colors[i].borderColor = p[i].backgroundColor;
    }

    myChart.destroy();
    renderLineGraph();
}
