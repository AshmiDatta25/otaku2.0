import { getWatchlist, renderAnimeCard, wireWatchlistButtons } from './shared.js';

const list = getWatchlist();
document.getElementById('content').innerHTML = list.length
  ? `<h2>Your Watchlist</h2><div class="anime-list">${list.map(a => renderAnimeCard(a)).join('')}</div>`
  : "<p>No anime in your watchlist.</p>";
wireWatchlistButtons(list);
