import { apiFetch, parseNumber, parseIntOrZero, loadNavbarFooter, getMovieUrl } from "./site.js";

document.addEventListener("DOMContentLoaded", () => {
    loadNavbarFooter();

    const form = document.getElementById("createForm");
    if (!form) return;

    const successDiv = document.getElementById("message-success");
    const errorDiv = document.getElementById("message-error");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const movie = {
            title: document.getElementById("title").value,
            sypnosis: document.getElementById("sypnosis")?.value || "",
            rating: parseNumber(document.getElementById("rating")?.value),
            year: parseInt(document.getElementById("year")?.value),
            length: parseIntOrZero(document.getElementById("length")?.value),
            trailerLink: document.getElementById("trailer")?.value || "",
            styles: document.getElementById("styles")?.value.split(",").map(x => x.trim()).filter(x => x) || [],
            realisators: document.getElementById("realisators")?.value.split(",").map(x => x.trim()).filter(x => x) || [],
            scenarists: document.getElementById("scenarists")?.value.split(",").map(x => x.trim()).filter(x => x) || [],
            actors: document.getElementById("actors")?.value.split(",").map(x => x.trim()).filter(x => x) || [],
            producers: document.getElementById("producers")?.value.split(",").map(x => x.trim()).filter(x => x) || []
        };

        try {
            const response = await apiFetch(getMovieUrl(), {
                method: "POST",
                body: JSON.stringify(movie)
            });

            if (response.ok) {
                successDiv.textContent = "Movie created successfully!";
                successDiv.classList.remove("d-none");
                setTimeout(() => successDiv.classList.add("d-none"), 3000);
                form.reset();
            } else {
                const error = await response.text();
                errorDiv.textContent = "Error: " + error;
                errorDiv.classList.remove("d-none");
                setTimeout(() => errorDiv.classList.add("d-none"), 3000);
            }
        } catch (err) {
            errorDiv.textContent = "Error: " + err;
            errorDiv.classList.remove("d-none");
            setTimeout(() => errorDiv.classList.add("d-none"), 3000);
        }
    });
});
