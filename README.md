## Movies Frontend
A simple **HTML / CSS / JavaScript** frontend for the Movies API project.  
This frontend allows you to **view, create, edit, and delete movies** using the API.

## Table of Contents
- [Movies Frontend](#movies-frontend)
- [Table of Contents](#table-of-contents)
- [Project Overview](#project-overview)
- [Technologies](#technologies)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [CORS Configuration](#cors-configuration)
- [Notes](#notes)
- [Deployed Webapp](#deployed-webapp)

## Project Overview
This frontend provides the following pages:
- **Home (`index.html`)**: Introduction and link to movies list
- **Movies List (`movies.html`)**: Lists all movies with links to details and edit pages
- **Movie Details (`details.html`)**: Shows information about a specific movie
- **Create Movie (`create.html`)**: Form to add a new movie
- **Edit Movie (`edit.html`)**: Form to update or delete an existing movie

The frontend communicates with the **Movies API** to perform all CRUD operations.  
No authentication token is required for the frontend; the API handles CORS for allowed origins.

## Technologies
- HTML5
- CSS3
- JavaScript (ES6 Modules)
- Bootstrap 5.3
- Fetch API for HTTP requests

## Project Structure
moviesweb/
- css/
  - site.css
- js/
  - create.js
  - details.js
  - edit.js
  - index.js
  - movies.js
  - site.js # common functions (API fetch, navbar/footer)
- js-dev
  - scripts for dev purpose
- partials/
  - footer.html
  - navbar.html
- create.html
- details.html
- edit.html
- index.html
- movies.html

- **site.js**: Common utilities (loading navbar/footer, API wrapper, number parsing, URL helpers)
- **index.js**: Logic for home page
- **movies.js**: Load and display the list of movies
- **details.js**: Load and display details of a single movie
- **create.js**: Handle movie creation form
- **edit.js**: Handle movie edit and delete form

## Usage
1. Serve the `frontend/` folder using a static server (Azure Static Web Apps, Blob Storage, or a local development server).  
2. Open `index.html` in your browser.  
3. Navigate between pages using links or buttons.  
4. All API operations are performed via `fetch()` to the Movies API, using the base URL configured in `site.js`.

> ⚠️ **Important:** For local testing, the API must be running locally. The frontend will **not** be able to interact with the Azure-deployed API directly unless CORS and URLs are configured accordingly.

## CORS Configuration
To allow the frontend to access the API:

- **Development**: The API allows requests from any origin.  
- **Production**: Only the frontend URL is allowed (e.g., `https://movies-rd.azurewebsites.net`).  

Additionally, the API can be accessed via:

- **Swagger**: [https://moviesapi-rd.azurewebsites.net/swagger/index.html](https://moviesapi-rd.azurewebsites.net/swagger/index.html)  
- **Postman** or other HTTP clients  

> Note: Swagger and Postman require a valid JWT token obtained from:  
> `https://moviesapi-rd.azurewebsites.net/api/v1/Token`  
> The frontend itself does **not** require a JWT token because access is restricted via CORS.

## Notes
- All JavaScript files use ES6 modules (`type="module"` in `<script>`).  
- Ensure your API is running and accessible at the URL configured in `site.js` (`API_CONFIG.baseUrl`).  
- Forms automatically parse numbers and handle empty fields to prevent API errors.  
- For deployment, copy all HTML, CSS, and JS files to your static hosting environment.

## Deployed Webapp
You can check out the public repository of the webapp I deployed on Azure:  
[GitHub - Movies Webapp](https://github.com/ton-utilisateur/movies-webapp)

A mini README is included in this repo to explain its functionality and deployment.
