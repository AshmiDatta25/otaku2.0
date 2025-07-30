export const STORAGE_KEY = 'animeWatchlist_v1';

export async function fetchAnimeData() {
  const res = await fetch('./data/anime.json');
  if (!res.ok) throw new Error('Failed to load anime.json');
  return res.json();
}

export function getWatchlist() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
  catch { return []; }
}
export function saveWatchlist(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}
export function isInWatchlist(id) {
  return getWatchlist().some(a => a.id === id);
}
export function addToWatchlist(anime) {
  const list = getWatchlist();
  if (!isInWatchlist(anime.id)) {
    list.push(anime);
    saveWatchlist(list);
  }
}
export function removeFromWatchlist(id) {
  const list = getWatchlist().filter(a => a.id !== id);
  saveWatchlist(list);
}

export function getRecommendations(currentAnime, all, limit = 8) {
  const currentGenres = new Set(currentAnime.genres);
  return all.filter(a => a.id !== currentAnime.id)
    .map(a => {
      const overlap = a.genres.filter(g => currentGenres.has(g)).length;
      return { ...a, overlap };
    })
    .filter(a => a.overlap > 0)
    .sort((a, b) => b.overlap - a.overlap || b.popularity - a.popularity)
    .slice(0, limit);
}

export function renderAnimeCard(anime, showDetails = true) {
  const genres = anime.genres.map(g => `<span class="chip">${g}</span>`).join('');
  return `
  <div class="card fade-up">
    <span class="rating">⭐ ${anime.rating}</span>
    <img class="poster" src="${anime.image}" alt="${anime.title}" />
    <div class="card-body">
      <h3 class="card-title">${anime.title}</h3>
      <div class="badges">${genres}</div>
      <div class="meta">${anime.year} • ${anime.episodes} eps • ${anime.status}</div>
      <div class="actions">
        ${showDetails ? `<a class="btn" href="details.html?id=${anime.id}">Details</a>` : ""}
        <button class="btn btn-outline js-watchlist" data-id="${anime.id}">
          ${isInWatchlist(anime.id) ? 'In Watchlist' : 'Add to Watchlist'}
        </button>
      </div>
    </div>
  </div>`;
}

export function wireWatchlistButtons(animeList) {
  document.querySelectorAll('.js-watchlist').forEach(btn => {
    const id = Number(btn.dataset.id);
    btn.addEventListener('click', () => {
      const anime = animeList.find(a => a.id === id);
      if (!anime) return;
      if (isInWatchlist(id)) {
        removeFromWatchlist(id);
        btn.textContent = 'Add to Watchlist';
      } else {
        addToWatchlist(anime);
        btn.textContent = 'In Watchlist';
      }
    });
  });
}
