import { fetchAnimeData, renderAnimeCard, wireWatchlistButtons } from './shared.js';

fetchAnimeData().then(data => {
  document.getElementById('content').innerHTML = `<h2>Explore Anime</h2><div class="anime-list">${data.map(a => renderAnimeCard(a)).join('')}</div>`;
  wireWatchlistButtons(data);
});
