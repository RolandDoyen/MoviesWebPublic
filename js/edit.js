import { apiFetch, loadNavbarFooter, getMovieUrl, parseNumber, parseIntOrZero } from "./site.js";

document.addEventListener("DOMContentLoaded", async () => {
    loadNavbarFooter();
    await loadEditForm();
});

function getMovieIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
}

async function loadEditForm() {
    const container = document.getElementById("editFormContainer");
    if (!container) return;

    const id = getMovieIdFromUrl();
    if (!id) {
        container.innerHTML = "<div class='text-danger'>No movie ID specified.</div>";
        return;
    }

    container.innerHTML = "Loading...";

    try {
        const response = await apiFetch(getMovieUrl(id));
        if (!response.ok) {
            container.innerHTML = `<div class="text-danger">Failed to load movie: ${response.status}</div>`;
            return;
        }

        const movie = await response.json();

        container.innerHTML = `
            <h3>Edit Movie: ${movie.title}</h3>
            <form id="editForm">
                <div class="mb-3">
                    <label for="title" class="form-label">Title</label>
                    <input type="text" id="title" class="form-control" value="${movie.title}" required />
                </div>
                <div class="mb-3">
                    <label for="sypnosis" class="form-label">Synopsis</label>
                    <textarea id="sypnosis" class="form-control">${movie.sypnosis}</textarea>
                </div>
                <div class="mb-3">
                    <label for="rating" class="form-label">Rating</label>
                    <input type="number" step="0.1" min="0" max="10" id="rating" class="form-control" value="${movie.rating}" />
                </div>
                <div class="mb-3">
                    <label for="year" class="form-label">Year</label>
                    <input type="number" id="year" class="form-control" value="${movie.year}" />
                </div>
                <div class="mb-3">
                    <label for="length" class="form-label">Length (minutes)</label>
                    <input type="number" id="length" class="form-control" value="${movie.length}" />
                </div>
                <div class="mb-3">
                    <label for="trailer" class="form-label">Trailer Link</label>
                    <input type="text" id="trailer" class="form-control" value="${movie.trailerLink}" />
                </div>
                <div class="mb-3">
                    <label for="styles" class="form-label">Styles (comma-separated)</label>
                    <input type="text" id="styles" class="form-control" value="${movie.styles.join(', ')}" />
                </div>
                <div class="mb-3">
                    <label for="realisators" class="form-label">Realisators</label>
                    <input type="text" id="realisators" class="form-control" value="${movie.realisators.join(', ')}" />
                </div>
                <div class="mb-3">
                    <label for="scenarists" class="form-label">Scenarists</label>
                    <input type="text" id="scenarists" class="form-control" value="${movie.scenarists.join(', ')}" />
                </div>
                <div class="mb-3">
                    <label for="actors" class="form-label">Actors</label>
                    <input type="text" id="actors" class="form-control" value="${movie.actors.join(', ')}" />
                </div>
                <div class="mb-3">
                    <label for="producers" class="form-label">Producers</label>
                    <input type="text" id="producers" class="form-control" value="${movie.producers.join(', ')}" />
                </div>

                <button type="submit" class="btn btn-primary">Save</button>
                <a href="movies.html" class="btn btn-secondary ms-2">Cancel</a>
                <button type="button" id="deleteBtn" class="btn btn-danger ms-2">Delete</button>
            </form>
        `;

        const successDiv = document.getElementById("message-success");
        const errorDiv = document.getElementById("message-error");

        document.getElementById("editForm").addEventListener("submit", async (e) => {
            e.preventDefault();
            const updatedMovie = {
                title: document.getElementById("title").value,
                sypnosis: document.getElementById("sypnosis").value,
                rating: parseNumber(document.getElementById("rating").value),
                year: parseIntOrZero(document.getElementById("year").value),
                length: parseIntOrZero(document.getElementById("length").value),
                trailerLink: document.getElementById("trailer").value,
                styles: document.getElementById("styles").value.split(",").map(x => x.trim()).filter(x => x),
                realisators: document.getElementById("realisators").value.split(",").map(x => x.trim()).filter(x => x),
                scenarists: document.getElementById("scenarists").value.split(",").map(x => x.trim()).filter(x => x),
                actors: document.getElementById("actors").value.split(",").map(x => x.trim()).filter(x => x),
                producers: document.getElementById("producers").value.split(",").map(x => x.trim()).filter(x => x)
            };

            try {
                const res = await apiFetch(getMovieUrl(id), {
                    method: "PUT",
                    body: JSON.stringify(updatedMovie)
                });

                if (res.ok) {
                    successDiv.textContent = "Movie updated successfully!";
                    successDiv.classList.remove("d-none");
                    setTimeout(() => successDiv.classList.add("d-none"), 3000);
                } else {
                    const err = await res.text();
                    errorDiv.textContent = "Error: " + err;
                    errorDiv.classList.remove("d-none");
                    setTimeout(() => errorDiv.classList.add("d-none"), 5000);
                }
            } catch (err) {
                errorDiv.textContent = "Error: " + err;
                errorDiv.classList.remove("d-none");
                setTimeout(() => errorDiv.classList.add("d-none"), 5000);
            }
        });

        document.getElementById("deleteBtn").addEventListener("click", async () => {
            if (!confirm("Are you sure you want to delete this movie?")) return;

            try {
                const res = await apiFetch(getMovieUrl(id), { method: "DELETE" });
                if (res.ok) {
                    window.location.href = "movies.html";
                } else {
                    const err = await res.text();
                    errorDiv.textContent = "Error deleting movie: " + err;
                    errorDiv.classList.remove("d-none");
                    setTimeout(() => errorDiv.classList.add("d-none"), 5000);
                }
            } catch (err) {
                errorDiv.textContent = "Error deleting movie: " + err;
                errorDiv.classList.remove("d-none");
                setTimeout(() => errorDiv.classList.add("d-none"), 5000);
            }
        });

    } catch (err) {
        container.innerHTML = `<div class="text-danger">Error loading movie: ${err}</div>`;
        console.error(err);
    }
}
