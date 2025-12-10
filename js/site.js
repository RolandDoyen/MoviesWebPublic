export function loadNavbarFooter() {
    fetch("partials/navbar.html")
        .then(r => r.text())
        .then(html => {
            document.getElementById("navbar").innerHTML = html;
            const page = window.location.pathname.split("/").pop();
            if (page.includes("movie")) document.getElementById("nav-movies")?.classList.add("active");
        })
        .catch(err => console.error("Failed to load navbar:", err));

    fetch("partials/footer.html")
        .then(r => r.text())
        .then(html => document.getElementById("footer").innerHTML = html)
        .catch(err => console.error("Failed to load footer:", err));
}

export async function apiFetch(url, options = {}, retry = true) {
    if (!TokenManager.token) await TokenManager.init();
    const headers = { "Content-Type": "application/json", ...TokenManager.getAuthHeaders(), ...(options.headers || {}) };
    const response = await fetch(url, { ...options, headers });

    if (response.status === 401 && retry) {
        await TokenManager.refreshToken();
        return apiFetch(url, options, false);
    }

    return response;
}

export const TokenManager = {
    token: null,
    tokenKey: "devToken",
    tokenUrl: "https://moviesapi-rd.azurewebsites.net/api/v1/token",

    async init() {
        this.token = localStorage.getItem(this.tokenKey);
        if (!this.token) await this.refreshToken();
    },

    async refreshToken() {
        const response = await fetch(this.tokenUrl);
        if (!response.ok) { this.token = null; return; }
        const data = await response.json();
        this.token = data.token;
        localStorage.setItem(this.tokenKey, this.token);
    },

    getAuthHeaders() {
        return this.token ? { "Authorization": "Bearer " + this.token } : {};
    }
};

export function parseNumber(value) {
    if (!value) return 0;
    const num = parseFloat(value.replace(",", "."));
    return isNaN(num) ? 0 : num;
}

export function parseIntOrZero(value) {
    if (!value) return 0;
    const num = parseInt(value);
    return isNaN(num) ? 0 : num;
}

export const API_CONFIG = {
    baseUrl: "https://moviesapi-rd.azurewebsites.net/api/v1",
    movieEndpoint: "/movie"
};

export function getMovieUrl(id = "") {
    return `${API_CONFIG.baseUrl}${API_CONFIG.movieEndpoint}${id ? "/" + id : ""}`;
}