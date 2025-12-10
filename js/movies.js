import { apiFetch, loadNavbarFooter, getMovieUrl } from "./site.js";

document.addEventListener("DOMContentLoaded", async () => {
    loadNavbarFooter();
    await loadMovies();
});

async function loadMovies() {
    const container = document.getElementById("movieList");
    if (!container) return;
    container.innerHTML = "<div>Loading...</div>";

    try {
        const response = await apiFetch(getMovieUrl());
        if (!response.ok) {
            container.innerHTML = `<div class="text-danger">Failed to load movies: ${response.status}</div>`;
            return;
        }

        const movies = await response.json();

        if (!movies || movies.length === 0) {
            container.innerHTML = "<div>No movies found.</div>";
            return;
        }

        container.innerHTML = "";

        movies.forEach(movie => {
            const item = document.createElement("div");
            item.className = "list-group-item d-flex justify-content-between align-items-center";

            const titleLink = document.createElement("a");
            titleLink.href = `details.html?id=${movie.id}`;
            titleLink.textContent = movie.title;
            titleLink.className = "fw-bold";

            const actions = document.createElement("div");

            const editBtn = document.createElement("a");
            editBtn.href = `edit.html?id=${movie.id}`;
            editBtn.className = "btn btn-sm btn-secondary ms-2";
            editBtn.textContent = "Edit";

            actions.appendChild(editBtn);

            item.appendChild(titleLink);
            item.appendChild(actions);

            container.appendChild(item);
        });
    } catch (err) {
        container.innerHTML = `<div class="text-danger">Error loading movies: ${err}</div>`;
    }
}
