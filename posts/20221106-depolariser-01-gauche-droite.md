---
title: "Gauche/Droite - dé·polariser #1"
shorttitle: depolariser-01-gauche-droite
date: 2022-11-06T18:01:25.109Z
permalink: /posts/depolariser/01-gauche-droite.html
image: /static/img/pablo-garcia-saldana-lpqindzz8mo-unsplash.jpg
summary: Est-ce que être "de gauche" ou "de droite" veut encore dire
  quelque-chose aujourd'hui ? Et quoi précisément ?
tags:
  - dé·polariser
  - sciences politique
  - idéologies
---
Pour démarrer notre exploration des idéologies politiques, pas le choix, on va devoir commencer par l'axe le plus utilisé : l'axe gauche/droite.

Pas besoin de rentrer dans les détails de ce qui caractérise la gauche et la droite politique pour voir que ... ben c'est le sbeul quoi !
Certains nous disent que c'est un concept dépassé.
D'autres se disent de gauche tout en tenant des propos racistes à longueur de temps.

Pourquoi ces deux mots en apparence si simples créent-ils autant de confusion ?
Peut-on trouver un moyen de s'y retrouver plus facilement ?

## Une histoire de sièges

Initialement, la gauche et la droite politiques étaient clairement définie de manière extrêmement concrète.
Lors de l'assemblée consistante de 1789, deux factions opposées se sont formées : les royalistes et les libéraux.
Les libéraux, formant "l'opposition", siégèrent tous à gauche de l'assemblée et les royalistes à droite.

Comme ces députés n'avaient pas été élus, les deux groupes étaient de taille similaire.
Comme ça, personne ne déborde du mauvais côté.
C'est pratique.

Tous les pays adoptant un système électifs se sont mis à utiliser de la même manière "gauche" et "droite" pour désigner le bord des élu·e·s, utilisant "gauche" pour désigner les porteurs des premières réformes "démocratique" contre un groupe "droite" plutôt conservateur.
Chaque pays, voir région, a donc sa propre définition de gauche et droite qui varie en fonction de ce point de départ et de l'évolution ultérieure de l'assemblée.

## Redéfinir

Alors que les élections et réformes s'enchainent, les élus changent de siège et les idéologies évoluent.
En s'imposant, les valeurs progressistes disparaissent ou virent réac.
Ce qui était de gauche hier est souvent considéré de droite ensuite.

On peut alors se concentrer sur ce seul aspect pour définir ce concept plus clairement, en englobant tout le monde.

C'est par exemple ce que fait [Tzitzimitl](https://www.tzitzimitl.net) sur [sa chaine Youtube](https://www.youtube.com/watch?v=H8gS8eYAZPE), avec la définition suivante :

> - On est de gauche quand on veut changer le monde, créer une société nouvelle qu'on croit meilleure.
> - On est de droite quand on accepte le monde tel qu'il est, ou qu'on souhaite le faire revenir à un état passé.

C'est personnellement la définition que je trouve la plus pertinente pour vulgariser, comme il le fait très bien d'ailleurs.

Mais malheureusement, personne n'utilise cette définition dans la vie courante.
L'axe gauche/droite ainsi redéfinit ne décris pas ce que la population considère être de gauche ou de droite.
L'utiliser comme dimension pour notre quadrant ne fait qu'apporter de la confusion.

## Se concentrer sur l'essentiel

Pour éviter cela, on peut utiliser à la place une échelle _progressisme-conservatisme-réaction_ :

> - On est de **progressiste** quand on veut changer le monde, créer une société nouvelle qu'on croit meilleure.
> - On est de **conservateur** quand on accepte le monde tel qu'il est.
> - On est **réactionnaire** quand on souhaite faire revenir le monde à un état passé.

Bon, ok, cool, on a maintenant un axe bien défini sur lequel positionner des trucs.

!["3 points, pour progressisme, conservatisme et réaction, sont placés sur une ligne horizontale respectivement à l'extrémité gauche, légèrement à droite du centre, et à l'extrémité droite."](/static/img/axe-progressisme.svg)

Problème : cette unique dimension ne permet absolument pas de décrire une place sur l'échiquier politique.
Beaucoup d'autres sujets et positions doivent être pris en compte.
Se restreindre à n'ajouter qu'une seconde dimension pour tracer un joli quadrant serait un exercice extrêmement difficile si nous voulons éviter de perdre trop d'information importante en route.

Alors soyons fous : prenons carrément cinq dimensions.

On s'occupera des détails (définition, échelle, etc.) plus tard.
Pour l'instant, on va juste placer quatre personnes sur ces axes, plus ou moins au pif, et représenter le tout dans un graphique de coordonnées parallèles.

<div id="base-plot"></div>

## Faire la synthèse

Mais où est passé l'axe gauche/droite alors ?

"Être de gauche" ou "être de droite" n'est pas, en soit, une position politique claire.
La définition de "gauche" et "droite" dépend énormément du contexte historique et présent.
Dire "je suis de gauche", c'est affirmer plein de positions en même temps (sur le droit à l'avortement, le droit de grève, etc.).
L'axe gauche/droite est donc, en quelque sorte, la synthèse de très nombreuses positions qui structurent le débat politique.

Si on reprend notre échiquier politique à 5 dimensions précédent, l'axe gauche droite peut y être représenté, mais comme une projection de toutes les autres dimensions.
Il nous suffit de faire la moyenne des autres valeurs.

<div id="unshifted-plot"></div>

Et on va arbitrairement considérer que cette échelle est homogène, avec :

- l'extrême-gauche de 5 à 3
- la gauche de 3 à 1
- le centre de 1 à -1
- la droite de -1 à -3
- et l'extrême-droite de -3 à -5

> **Maths** :scream:
>
> La coordonnée $\bar{x}$ sur l'axe gauche-droite est une simple moyenne arithmétique de toutes les autres coordonnées (où $n$ représente le nombre d'axes pris en compte et $x_i$ la valeur sur l'axe numéro $i$) :
>
> $$\bar{x} = \frac{1}{n}\left (\sum_{i=1}^n{x_i}\right ) = \frac{x_1+x_2+\cdots +x_n}{n}$$
>
> Avec nos 5 axes, nous avons donc la formule suivante :
>
> $$\bar{x} = \frac{1}{5}\left (\sum_{i=1}^5{x_i}\right ) = \frac{x_1+x_2+x_3+x_4+x_5}{5}$$

## Inclure tout le monde

Oui mais voila, il reste une dernière particularité à prendre en compte : **chaque personne positionne une opinion sur l'axe gauche/droite en fonction (1) de ses propes opinions et (2) de sa propre vision de l'axe gauche/droite**.

{% video-gif "Perceval de Kaameloth: Mais c'est un coup à se planter ça. De toute façon on dit le Nord...Selon comment on est tourné ça change tout !", "https://media.tenor.com/eizzqfNSYW4AAAPo/selon-comment-on-est-tourn%C3%A9s-ca-change-tout.mp4", "/static/img/gif-posters/perceval-nord.png" %}

Autrement dit, quand je lis un échiquier politique, j'aimerais bien que la représentation de l'axe gauche/droite corresponde à ma propre vision de cet axe.

Pour ce faire, attention grosse surprise : je vais reprendre le graphique à coordonnées parallèle précédent.
Et je vais déplacer chaque axe par rapport à ce qu'une personne considère être le centre de l'axe gauche-droite.
À partir de là, il me suffira de prendre en compte ce décalage lors du calcul de la moyenne, et je devrais obtenir une représentation acceptable pour cette personne.

Prenons Julia, une personne de gauche pour qui le progressisme est primordial.
Julia considère que tout ce qui est ne serait-ce qu'un tout petit peu réactionnaire devrait être rangé dans l'extrêmement droite.
Pour représenter la vision de Julia, je peux donc décaler l'axe _progressisme_ de 5 points.

<div id="shifted-plot-left"></div>

Prenons la troisième ligne en partant du haut sur ce graphique et appelons la "_Georges_".
Georges, de base, est a priori de droite.
Une droite modérée mais à la limite de l'extrême, à -2,8.

Si on se place du point de vue de Julia, le progressisme de Georges passe de -1 à -5 pour le calcul de la moyenne.
Georges, à -3,6 sur l'axe gauche/droite, est donc un gros facho pour Julia.

> **Encore des maths** (et du JavaScript)
>
> Voici la formule correspondante, où $t$ correspond au déplacement (5 dans l'exemple), et $x$ aux coordonnées d'un élément ($\{5;5;5;5;5\}$ pour la première ligne de l'exemple) :
>
> $${gauche(x)=} \begin{cases}
   x_i-t_i \geq -5 & x_i' = -5 \\
   x_i-t_i \leq 5 & x_i' = 5 \\
   -5 < x_i-t_i < 5 & x_i' = x_i - t_i \\
   \frac{1}{n}\left (\sum_{i=1}^n(x_i')\right ) = \frac{x_1'+x_2'+\cdots +x_n'}{n}
 \end{cases}$$
>
> Mais ce sera sans doute plus clair en JavaScript pour pas mal de monde :
>
> ```javascript
> axisNames.reduce((sum, axisName) => {
>   let shiftedValue = data[axisName] - translations[axisName];
>   if (shiftedValue > 5) {
>     shiftedValue = 5;
>   } else if (shiftedValue < -5) {
>     shiftedValue = -5;
>   }
>   return sum + shiftedValue;
> }, 0) / axisNames.length;
> ```
>
> J'utilise ici $-t_i$ car je donne uniquement la dénomination "de gauche" de chaque axe sur ces graphs.
> J'utilise donc un nombre positif pour indiquer un décalage "vers la gauche", qui donne une valeur moins élevée (et inversement pour un décalage "vers la droite").

Si Julia était au contraire de droite, considérant que tout discours progressiste relève de l'extrême-gauche, tout bascule.

<div id="shifted-plot-right"></div>

Avec un progressisme considéré à 4 au lieu de -1, Georges est limite de centre droit (-1,8).

## Conclusion

En associant des déclages sur plusieurs axes, on peut par exemple retrouver une vision d'un extrême-gauchiste tel que moi :

<div id="my-plot"></div>

Notre "modéré de gauche" (on va l'appeler Emma) est maintenant une vrai centriste, et personne ne peut vraiment être classé à l'extrême-gauche.
Ce qui décrit plutôt bien ma pensée (oui, je parodie un chouïa, mais pas tant que ça non plus pour être honnête).

Mais si je devrait rencontrer mon exact opposé (un facho donc a priori), il me suffit de reprendre le même tableau avec des décalages différents.

<div id="droite-plot"></div>

Et je peux directement comprendre pourquoi cette personne me dit que Emma est une sale gauchiste d'ultra-gauche.

Nous avons toutes et tous une vision très différentes de qui est de gauche ou de droite.
De quelles opinions vont où.
De ce qui est acceptable ou non en société.

L'échelle gauche-droite est un excellent outil pour discuter la politique, situer chaque option qui nous est présentée, ainsi que nous même.
Mais c'est aussi une échelle mouvante.
Deux personnes peuvent parfaitement partager la même vision sur l'interventionnisme et la démocratie, par exemple, sans être vu "du même bord".
Un groupe en apparence homogène pourra militer pour un même programme pour des raisons très différentes sans même s'en apercevoir.
L'échelle gauche-droite, mal employée, est source de polarisations et incompréhensions.

Pour se comprendre, débattre, avancer collectivement et maitriser enfin l'échiquier politique, nous devons voir plus loin.

Et on ne peut le faire qu'en ayant une bonne connaissance des différents sujets (et donc, des échelles) en jeux.

Dans le prochain épisode de _dé·polariser_, on s'attaquera justement à un autre concept politique dévoyé à l'extrême : la  **_Liberté_**.
Vaste programme.
On parlera des libertariens, libertaire, libéraux, néolibéraux ... et même peut être des libristes (mais pas de libraires, désolé).

<script type="module">
  import {drawPoliticalPlot} from "/js-modules/political-plot.js";

  drawPoliticalPlot({
    selector: "#base-plot",
    axis: ['Progressisme', 'Démocratie', 'Ouverture', 'Interventionnisme', 'Liberté positive'],
  });

  drawPoliticalPlot({
    selector: "#unshifted-plot",
  });

  drawPoliticalPlot({
    selector: "#shifted-plot-left",
    translations: {
      Progressisme: 5,
    }
  });

    drawPoliticalPlot({
    selector: "#shifted-plot-right",
    translations: {
      Progressisme: -5,
    }
  });

  drawPoliticalPlot({
    selector: "#my-plot",
    translations: {
      Progressisme: 3,
      Démocratie: 2,
      Ouverture: 3,
      Interventionnisme: 0,
      "Liberté positive": 3
    }
  });

  drawPoliticalPlot({
    selector: "#droite-plot",
    translations: {
      Progressisme: -3,
      Démocratie: -2,
      Ouverture: -3,
      Interventionnisme: -3,
      "Liberté positive": 0
    }
  });
</script>
