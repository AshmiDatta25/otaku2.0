import { fetchAnimeData, getRecommendations, renderAnimeCard, addToWatchlist, isInWatchlist, removeFromWatchlist } from './shared.js';

const id = Number(new URLSearchParams(window.location.search).get('id'));
fetchAnimeData().then(data => {
  const anime = data.find(a => a.id === id);
  if (!anime) return;
  const recs = getRecommendations(anime, data);
  const genres = anime.genres.map(g => `<span class="chip">${g}</span>`).join('');
  document.getElementById('content').innerHTML = `
    <div class="card" style="max-width:600px;margin:auto">
      <img src="${anime.image}" />
      <div class="card-body">
        <h2>${anime.title}</h2>
        <div>${genres}</div>
        <p>${anime.description}</p>
        <p>${anime.year} • ${anime.episodes} episodes • ${anime.status}</p>
        <button id="watchlistBtn" class="btn">${isInWatchlist(id) ? 'Remove from' : 'Add to'} Watchlist</button>
      </div>
    </div>
    <h3>Recommended</h3>
    <div class="anime-list">${recs.map(a => renderAnimeCard(a)).join('')}</div>
  `;
  document.getElementById("watchlistBtn").onclick = () => {
    if (isInWatchlist(id)) {
      removeFromWatchlist(id);
      document.getElementById("watchlistBtn").textContent = "Add to Watchlist";
    } else {
      addToWatchlist(anime);
      document.getElementById("watchlistBtn").textContent = "Remove from Watchlist";
    }
  };
});
