# The moba simulator project

## Concept
L'idée est de pouvoir se créer un joueur lambda qui va progresser dans un moba en démarrant en bas de l'échelle et tenter d'arriver jusqu'à la ligue professionnelle.

Pour se faire le joueur devra gérer plusieurs choses: 

* __Le moral__ : Chaque action en jeu réussi ou raté influera sur le moral et donc la performance. Il faudra que le joueur sache à quel moment il décide de faire des parties importantes et à quel moment il s'entraine pour remonter son moral.
* __L'énergie__ : Toute personne ne peut décemment pas enchaîner 183 parties par jours. Il faudra gérer son énergie pour ne pas entrer dans une partie fatigué et donc peu performant.
* __Compétences__ : Les compétences sont liés au jeu en lui même. C'est à dire la capacité à mener une partie et réussir ce qu'il entreprend. Pour le moment les compétences sont :
  - _Farming_ : Plus le niveau est haut, mieux il farmera.
  - _Duel_ : Plus le niveau est haut, plus il aura de chance de gagner les 1v1
  - _Vision_ : Plus le niveau est haut, plus il sera en capacité de gank et éviter de se faire gank
  - _Teamfight_ : Plus le niveau est haut, plus il sera en capacité de survivre et mené un teamfight
  - _Intelligence_ : Plus le niveau est haut, mieux il saura prendre des décisions (engager des combats, prendre des objectifs etc...)
* __Méta__ : Capacité à maîtriser une certaine position : (TOP, MID, JUNGLE, BOT et SUPPORT)
* __Champions__ : Il faudra aussi s'entrainer sur des champions spécifiques pour améliorer ses chances de gagner

## Déroulement

### Début
Les joueur démarre en division PLASTIQUE tier 3. Et doit grimper toutes les divisions en moins de saison possible. Voici les divisions :

* PLASTIQUE (tier 3 à 1)
* FER (tier 3 à 1)
* BRONZE (tier 3 à 1)
* ARGENT (tier 3 à 1)
* OR (tier 3 à 1)
* PLATINE (tier 3 à 1)
* DIAMANT (tier 3 à 1)
* GRAND MAITRE (Doit arriver dans les 100 premiers)
* CHALLENGER (Doit arriver premier)

Si le joueur termine une saison premier Challenger, il gagne la partie.

### Saison
Une saison dure un an. Chaque fois que le joueur entreprend une action, il perd de l'énergie. Il peut ensuite récupérer son énergie en se reposant, faisant ainsi dérouler le temps. Il devra donc bien gérer pour gagner un maximum de partie avant la fin de la saison.

### Actions possibles
Le joueur pourra donc effectuer les actions suivantes:

* __Repos__ : Récupérer de l'énergie et un peu de moral
* __Mode fun__ : Joue à un autre mode du jeu, plus fun, pour récupérer du moral. Mais perd peu d'énergie
* __Entrainement__ : Améliorer une compétence spécifique 
* __Théory craft__ : Améliorer la maitrise de la méta
* __Regarder un stream__ : Améliorer la maitrise d'un champion
* __Partie non classé__ : Coûte moins d'énergie et de moral. Cependant ne fait pas progresser le classement
* __Partie classé__ : Coûte beaucoup d'énergie et de moral, mais fait plus progresser le joueur (compétence/champion/méta et classement)


