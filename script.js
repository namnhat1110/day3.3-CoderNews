const newurl = "https://newsapi.org/v2/top-headlines?country=us&apiKey=d4c95a5955e4489c9c05b8b3a4f2e43b";

// 1 Old Way

function renderArticles(articles) {
    const newsList = document.getElementById("news-list")
    console.log(newsList)
}

function fetchData() {
    const promise = fetch((newurl))
    let articles
    promise
        .then(res => res.json())
        .then(data => renderArticles(data.articles))

}


fetchData()






// Es6 Way