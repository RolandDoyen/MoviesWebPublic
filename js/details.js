import { apiFetch, loadNavbarFooter, getMovieUrl } from "./site.js";

document.addEventListener("DOMContentLoaded", async () => {
    loadNavbarFooter();
    await loadMovieDetails();
});

function getMovieIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
}

async function loadMovieDetails() {
    const container = document.getElementById("movieDetails");
    const id = getMovieIdFromUrl();

    if (!id) {
        container.innerHTML = "<div class='text-danger'>No movie ID specified.</div>";
        return;
    }

    container.innerHTML = "<div>Loading...</div>";

    try {
        const response = await apiFetch(getMovieUrl(id));
        if (!response.ok) {
            container.innerHTML = `<div class="text-danger">Failed to load movie: ${response.status}</div>`;
            return;
        }

        const movie = await response.json();

        container.innerHTML = `
            <h3>${movie.title}</h3>
            <p><strong>Year:</strong> ${movie.year}</p>
            <p><strong>Rating:</strong> ${movie.rating}</p>
            <p><strong>Length:</strong> ${movie.length} minutes</p>
            <p><strong>Trailer:</strong> ${movie.trailerLink ? `<a href="${movie.trailerLink}" target="_blank">Watch</a>` : "N/A"}</p>
            <p><strong>Synopsis:</strong> ${movie.sypnosis || "N/A"}</p>
            <p><strong>Styles:</strong> ${movie.styles.length ? movie.styles.join(", ") : "N/A"}</p>
            <p><strong>Realisators:</strong> ${movie.realisators.length ? movie.realisators.join(", ") : "N/A"}</p>
            <p><strong>Scenarists:</strong> ${movie.scenarists.length ? movie.scenarists.join(", ") : "N/A"}</p>
            <p><strong>Actors:</strong> ${movie.actors.length ? movie.actors.join(", ") : "N/A"}</p>
            <p><strong>Producers:</strong> ${movie.producers.length ? movie.producers.join(", ") : "N/A"}</p>
        `;
    } catch (err) {
        container.innerHTML = `<div class="text-danger">Error loading movie: ${err}</div>`;
    }
}
