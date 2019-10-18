if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then(reg => console.log('Service Worker hs been registered successfully'));
  });
}

// rendering stuff
function getNews() {
  const apiKey = '3f519ed0127544559c348ae00b3ad4bf';

  return fetch(
    `https://newsapi.org/v2/everything?q=apple&from=2019-09-17&sortBy=publishedAt&apiKey=${apiKey}`
  )
    .then(res => res.json())
    .then(news => {
      renderNews({ news: news.articles });
    });
}

function renderCard({ title, imgLink, date }) {
  return `
    <div class="card">
      <img src="${imgLink}" alt="" class="card-img-top">
      <div class="card-body">
        <h5 class="card-title">${title}</h5>
        <p class="card-text"><small class="text-muted">${date}</small></p>
      </div>
    </div>`;
}

function renderNews({ news }) {
  const cols = document.getElementById('cardContainer');

  news.map(
    article =>
      (cols.innerHTML += renderCard({
        title: article.title,
        imgLink: article.urlToImage,
        date: article.publishedAt
      }))
  );
}

getNews();
