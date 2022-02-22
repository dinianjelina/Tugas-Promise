// Menampilkan news pada dashboard
fetch('https://newsapi.org/v2/everything?q=apple&from=2022-02-21&to=2022-02-21&sortBy=popularity&apiKey=22e72310a32345d880bdb3dd23b552d9')
  .then((response) => response.json())
  .then((response) => {
    const news = response.articles;
    let cards = '';
    news.forEach((m) => (cards += showCards(m)));

    const newsContainer = document.querySelector('.news-container');
    newsContainer.innerHTML = cards;
  });

// Menampilkan news based on input keyword
const formControl = document.querySelector('.form-control');
formControl.addEventListener('change', async function () {
  try {
    const inputKeyword = document.querySelector('.input-keyword');
    if (inputKeyword.value == '') {
      let emptyKeyword = `<div class = "emptyKeyword">Please enter something!</div>`;
      const newsContainer = document.querySelector('.news-container');
      newsContainer.innerHTML = emptyKeyword;
    } else {
      const news = await getNews(inputKeyword.value);
      updateNews(news);
    }
  } catch (err) {
    let noConnection = `<div class = "noConnection">Please check your internet connection and try again.</div>`;
    const newsContainer = document.querySelector('.news-container');
    newsContainer.innerHTML = noConnection;
  }
});

function getNews(keyword) {
  return fetch('https://newsapi.org/v2/everything?q=' + keyword + '&from=2022-01-22&sortBy=publishedAt&apiKey=22e72310a32345d880bdb3dd23b552d9')
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((response) => {
      console.log(response.articles);
      return response.articles;
    });
}

function updateNews(news) {
  let cards = '';
  news.forEach((m) => (cards += showCards(m)));

  const newsContainer = document.querySelector('.news-container');
  newsContainer.innerHTML = cards;

  if (cards === '') {
    let noNews = `<div class = "noNews">Content not found.</div>`;
    newsContainer.innerHTML = noNews;
  }
}

function showCards(m) {
  return `<div class="col-md-4 my-3">
  <div class="card">
    <img src="${m.urlToImage}" class="card-img-top" />
    <div class="card-body">
      <h5 class="card-title">${m.title}</h5>
      <h6 class="card-subtitle mb-2 text-muted">${m.author} - ${m.publishedAt}</h6>
      <p class="card-title">${m.description}<p>
      <a href="${m.url}" target = "_blank" class="btn btn-primary read-more-button">Read more...</a>
    </div>
  </div>
</div>`;
}
