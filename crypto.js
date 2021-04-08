const cryptoURL = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=3&convert=USD&CMC_PRO_API_KEY=d0f410af-17f9-4a74-8c1e-d8901f516b5c";

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
                    borderColor: "rgba(255, 99, 132, 1)",
                    backgroundColor: "rgba(255, 99, 132, 0.2)",
                },
                {
                    label: "Ethereum",
                    borderWidth: 1,
                    data: getHistoricPrices(coins[1]),
                    borderColor: "rgba(29, 36, 252, 1)",
                    backgroundColor: "rgba(29, 36, 252, 0.2)",
                },
                {
                    label: "Binance Coin",
                    borderWidth: 1,
                    data: getHistoricPrices(coins[2]),
                    borderColor: "rgba(75, 192, 192, 1)",
                    backgroundColor: "rgba(75, 192, 192, 0.2)",
                },
            ],
        },
        options: {
            tooltips: {
                enabled: true,
                mode: "nearest",

            },
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: false,
                            suggestedMax: price,
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

async function getCryptoPrices() {

    const response = await fetch(cryptoURL);
    const jsonData = await response.json();
    const coins = jsonData.data;
    renderLineGraph(coins);
};

getCryptoPrices();