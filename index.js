import { fetchAnimeData, renderAnimeCard, wireWatchlistButtons } from './shared.js';

fetchAnimeData().then(data => {
  const trending = data.slice(0, 5);
  const recommended = data.slice(5, 10);
  const html = `<h2>Trending</h2><div class="anime-list">${trending.map(a => renderAnimeCard(a)).join('')}</div>
                <h2>Recommended</h2><div class="anime-list">${recommended.map(a => renderAnimeCard(a)).join('')}</div>`;
  document.getElementById('content').innerHTML = html;
  wireWatchlistButtons([...trending, ...recommended]);
});
