# README
Pour réaliser ce tableau de bord j'ai choisi de partir sur le framework Ruby On Rails et la bibliothèque React. Je l'ai ensuite publié sur la plateforme de déploiement Heroku qui est disponible [ici](https://ecommerce-dashboard-kotcherga.herokuapp.com/) (sélectionner 'all' ou 'United' dans les options de pays fait crasher l'application en ligne mais pas localement).

## Mise en place

1- Pour démarrer le projet j'ai commencé avec un [template](https://github.com/kevinkotcherga/template_react_redux_rails7_for_heroku) Ruby On Rails/React que j'ai créé il y a quelque temps, il permet de déployer une application sur Heroku.

2- La première problématique à laquel j'ai été confronté était la taille du fichier csv. L'importation ou la lecture de celui-ci me prenait trop de temps. J'ai donc utilisé redis et sidekiq pour faire le travail en arrière plan.

3- Le tableau de bord devant être filtré par pays, il me fallait trouver une solution pour chercher dans la db de Rails depuis React. J'ai donc utilisé la gem 'ransack'.

4- J'ai créé mon front React avec npx create-react-app.

5- J'ai utilisé axios pour accéder à mon API de recherche.

6- J'ai mis en place les fonctions pour trouver le total des revenus, le nombre de clients, les revenus moyen par commandes.

7- J'ai mis en place la fonction pour trouver les revenues par mois et je les ai affichés dans un graphique grâce à la librairie recharts.

8- J'ai mis en place redis et sidekiq sur Heroku pour le déploiement.

## Utilisation 
Un pluggin "Cross-origin resource sharing (CORS)" est nécessaire.

```
cd ecommerce-dashboard
bundle i
rails db:create
rails db:migrate
bundle exec sidekiq
rails s

(optionel pour react, le prebuild charge déjà la page front en même temps qu'il lance le serveur rails)
cd client
npm i
npm start
```

## Amélioration

Je dois trouver le moyen de charger toute la data avec la séléction 'all' ou 'United' sans faire crasher l'application quand elle est en ligne. Je dois également trouver le moyen de rendre cette action plus rapide localement. Il faudrait que je puisse chercher la donnée d'un pays sans devoir écrire son nom exact dans la recherche. Je dois régler les problèmes d'affichages du graphique recharts qui fonctionne mal selon les pays.
