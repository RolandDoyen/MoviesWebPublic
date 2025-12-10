## Frontend des Films
Un frontend simple en **HTML / CSS / JavaScript** pour le projet Movies API.  
Ce frontend permet de **visualiser, créer, modifier et supprimer des films** en utilisant l’API.

## Table des Matières
- [Frontend des Films](#frontend-des-films)
- [Table des Matières](#table-des-matières)
- [Présentation du Projet](#présentation-du-projet)
- [Technologies](#technologies)
- [Project Structure](#project-structure)
- [Utilisation](#utilisation)
- [Configuration CORS](#configuration-cors)
- [Remarques](#remarques)
- [Webapp Déployée](#webapp-déployée)

## Présentation du Projet
Ce frontend fournit les pages suivantes :
- **Accueil (`index.html`)** : Introduction et lien vers la liste des films
- **Liste des Films (`movies.html`)** : Affiche tous les films avec des liens vers les pages de détails et de modification
- **Détails du Film (`details.html`)** : Affiche les informations d’un film spécifique
- **Créer un Film (`create.html`)** : Formulaire pour ajouter un nouveau film
- **Modifier un Film (`edit.html`)** : Formulaire pour mettre à jour ou supprimer un film existant

Le frontend communique avec l’**API Movies** pour effectuer toutes les opérations CRUD.  
Aucun token d’authentification n’est requis pour le frontend ; l’API gère le CORS pour les origines autorisées.

## Technologies
- HTML5
- CSS3
- JavaScript (Modules ES6)
- Bootstrap 5.3
- Fetch API pour les requêtes HTTP

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
  - site.js # fonctions communes (fetch API, navbar/footer)
- partials/
  - footer.html
  - navbar.html
- create.html
- details.html
- edit.html
- index.html
- movies.html

- **site.js** : Utilitaires communs (chargement de la navbar/footer, wrapper API, parsing des nombres, helpers pour les URL)  
- **index.js** : Logique pour la page d’accueil  
- **movies.js** : Charger et afficher la liste des films  
- **details.js** : Charger et afficher les détails d’un film unique  
- **create.js** : Gérer le formulaire de création de film  
- **edit.js** : Gérer le formulaire de modification et suppression de film

## Utilisation
1. Servez le dossier `frontend/` via un serveur statique (Azure Static Web Apps, Blob Storage ou un serveur de développement local).  
2. Ouvrez `index.html` dans votre navigateur.  
3. Naviguez entre les pages à l’aide des liens ou des boutons.  
4. Toutes les opérations sur l’API sont effectuées via `fetch()` vers l’API Movies, en utilisant l’URL de base configurée dans `site.js`.

> ⚠️ **Important :** Pour les tests locaux, l’API doit être exécutée localement. Le frontend **ne pourra pas** interagir directement avec l’API déployée sur Azure sauf si le CORS et les URLs sont configurés correctement.

## Configuration CORS
Pour permettre au frontend d’accéder à l’API :

- **Développement** : L’API autorise les requêtes depuis n’importe quelle origine.  
- **Production** : Seule l’URL du frontend est autorisée (par exemple, `https://movies-rd.azurewebsites.net`).  

De plus, l’API peut être consultée via :

- **Swagger** : [https://moviesapi-rd.azurewebsites.net/swagger/index.html](https://moviesapi-rd.azurewebsites.net/swagger/index.html)  
- **Postman** ou autres clients HTTP  

> Note : Swagger et Postman nécessitent un token JWT valide obtenu depuis :  
> `https://moviesapi-rd.azurewebsites.net/api/v1/Token`  
> Le frontend lui-même **n’a pas** besoin de token JWT car l’accès est restreint via le CORS.

## Remarques
- Tous les fichiers JavaScript utilisent les modules ES6 (`type="module"` dans `<script>`).  
- Assurez-vous que votre API est en fonctionnement et accessible à l’URL configurée dans `site.js` (`API_CONFIG.baseUrl`).  
- Les formulaires analysent automatiquement les nombres et gèrent les champs vides pour éviter les erreurs côté API.  
- Pour le déploiement, copiez tous les fichiers HTML, CSS et JS vers votre environnement d’hébergement statique.

## Webapp Déployée
Vous pouvez consulter le dépôt public de la webapp que j’ai déployée sur Azure :  
[GitHub - Movies Webapp](https://github.com/ton-utilisateur/movies-webapp)

Un mini README est inclus dans ce repo pour expliquer son fonctionnement et le déploiement.
