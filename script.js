const newurl = "https://newsapi.org/v2/top-headlines?country=us&apiKey=d4c95a5955e4489c9c05b8b3a4f2e43b";

function renderArticles(articles) {
    const newsList = document.getElementById("news-list")
    const articlesHTMLArray = articles.map((a) => {
        return `
        <div class="card mb-5" style="width: 100%;">
        <a href="${a.url}"><h5 class="card-title">${a.title}</h5></a>
            <a href="${a.url}"><img src="${a.urlToImage}" class="card-img-top" alt="..."></a>
            <div class="card-body">
                <div class = "row">
                    <div class="col-6"><i class="far fa-calendar-alt"></i> ${a.publishedAt}</div>
                    <div class="col-6 author"><i class="fas fa-edit"></i> ${a.author}</div>
                </div>
                <hr class="solid">
                <p class="card-text"> <i class="far fa-newspaper"></i> ${a.description}</p>
                <hr class="solid">
                <p>${a.source.name}</p>
            
                <a href="${a.url}" class="btn btn-primary">More</a>
            </div>
        </div>
        `
    })
    console.log(articlesHTMLArray)
    newsList.innerHTML = articlesHTMLArray.join(``)
}



// 1) Old Way Pre Es6

function fetchDataPreEs6() {
    const promise = fetch((newurl))
    let articles
    promise
        .then(res => res.json())
        .then(data => renderArticles(data.articles))
}
// fetchDataPreEs6()




// 2) New Way Post Es6

async function fetchDataES6AsyncAwait() {
    const response = await fetch(newurl);
    const data = await response.json()
    renderArticles(data.articles)
}
fetchDataES6AsyncAwait()