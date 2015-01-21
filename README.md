Resor : plateforme de réservation de voyages
========================

Ce projet est un petit projet d'études réalisé par des étudiants de l'Ecole Centrale de Lille. Le but est de réalises par petits groupes de 2 ou 3 un environnement composé de 4 acteurs :

  * Un site de camping qui propose des offres

  * Un site de réservation qui collecte les offres des campings et permet de réserver en ligne

  * Un site d'avis client

  * Un site d'analytics

Ce repository constitue la brique "plateforme de réservation en ligne"


1) Installer ce projet en local
----------------------------------

### Environnement de développement

Pour pouvoir développer, installez un environnement de développement web sur votre machine. Sous windows, j'utilise WAMP : http://www.wampserver.com/

Je vous laisse Googler si vous êtes sous Linux ou Mac, et vous pouvez bien sur utiliser une autre méthode : autre logiciel, installation d'Apache/MySql/Php manuellemenet :)

### S'inscrire dans GitHub

Créez un compte gratuit dans le site https://github.com. Il vous permettra de collaborer au projet à l'avenir.

Une fois que c'est fait, envoyez-moi un e-mail en m'indiquant votre pseudo : je vous rajouterai en tant que collaborateur du projet.

### Installer git

Git vous permettra de collaborer au projet, de faire des modifications et de les enregistrer. C'est un gestionnaire de version très connu et très puissant !

Téléchargez le sur http://git-scm.com/ et installez-le. Vous aurez un nouveau programme appelé Git Bash, qui est (comme son nom l'indique) une console.

### Utiliser Git

Pour vous former rapidement à git, je vous laisse une fois encore Googler :) La ligne de commande est assez rapide à prendre en main (comptez 30min-1h pour avoir fait le tour des principales fonctions)

N'oubliez pas de configurer git !

	git config --global user.name "Pseudo" (celui que vous voulez, essayez de prendre un pseudo qui me permette de vous reconnaitre)

	git config --global user.email "email" (OBLIGATOIREMENT l'e-mail que vous avez indiqué lors de la création de votre compte GitHub)

	git config --global http.proxy http://proxy.ec-lille.fr:3128 (si vous êtes derrière un proxy, celui donné est celui d'ECL)

### Télécharger le code source

On attaque enfin les étapes intéressantes :) Une fois que vous êtes associé au projet en tant que collaborateur, vous pouvez télécharger le code source.

Tout d'abord, il faut indiquer à git que vous souhaitez qu'il se souvienne de vos identifiants GitHub (si vous tenez à les saisir à chaque fois, n'exécutez pas cette étape)

	git config --global credential.helper wincred

Ensuite, vous pouvez télécharger le code lui-même sur votre ordinateur :

	cd /c/wamp/www (mettez-vous dans votre répertoire www, ici celui de WAMP)

	git clone https://github.com/LudoZeGeek/Resor.git

### Installer les dépendances

Pour installer les librairies requises par le projet, il vous faut installer composer (gestionnaire de dépendances PHP). Téléchargez-le et installez-le en allant sur 
	http://getcomposer.org/

Une fois qu'il est installé, utilisez-le pour installer toutes les dépendances, en ouvrant une invite de commande Windows et en tapant les lignes suivantes :

	cd C:\wamp\www\Resor (on se place dans le répertoire du projet)

	composer install (télécharge les dépendances dans un dossier *vendor*)

### Configurer le projet

Pour configurer le projet, vous devez copier-coller le fichier Resor/app/config/parameters.yml.dist et renomer la copie en parameters.yml

Ouvrez-le, et modifiez les paramètres de connexion à une base de données que vous devez créer, par exemple :

    database_driver:   pdo_mysql
    database_host:     127.0.0.1
    database_port:     ~
    database_name:     resor
    database_user:     root
    database_password: ~

**Attention** à ne pas supprimer le fichier parameters.yml.dist, sinon il sera supprimé du serveur !

Vous pouvez maintenant lire le site en vous rendant sur votre serveur local : *http://localhost/Resor/web/app_dev.php* dans un navigateur


2) Vérifier votre configuration système
-------------------------------------

Avant de commencer à coder, vous pouvez vérifer que votre serveur local est bien cofiguré pour l'utilisation de Symfony2.

Ouvrez un terminal Windows et tapez les commandes suivantes :

	cd C:\wamp\www\Resor

	php app/check.php

Le script php renvoie 0 si toutes les obligations sont remplies, 1 sinon.

Depuis votre navigateur, accédez au script config.php pour savoir si vous avez des recommandations, afin de les appliquer :
	
	http://localhost/Resor/web/config.php


3) Collaborez au projet !
-------------------------------------

Vous pouvez maintenant collaborer au projet, essayez au maximum de respecter les bonnes pratiques de git : faites des commits **courts** et **bien expliqués**.
Ca peut parraitre inutile, mais dans 3 mois si on veut s'y retrouver, on en aura besoin :)

**Enjoy !**

