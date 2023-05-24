Projet de service e-commerce


Ce projet est un service e-commerce basé sur une architecture de microservices. Il utilise GraphQL pour la communication entre les différents services et gRPC pour la communication avec les bases de données.

**************************************Installation**********************************************************

1-Clonez ce dépôt de projet :

        git clone <URL_DU_REPO>

2-Installez les dépendances en exécutant la commande suivante dans le répertoire du projet :

        npm install

3-Configurez les connexions aux bases de données :


 *Ouvrez le fichier apigateway.js et recherchez la section Configuration de la connexion à la base de données.
 *Modifiez les paramètres de connexion pour correspondre à votre configuration de base de données.
    
4-Démarrez le service API Gateway :

        node index.js



**************************************Fonctionnalités*********************************************

Le projet de service e-commerce comprend les fonctionnalités suivantes :

*Récupération des produits : Vous pouvez récupérer la liste des produits disponibles en exécutant la requête GraphQL suivante :


        query {
          getProducts {
            id
            name
            price
            description
          }
        }

*Récupération des commandes : Vous pouvez récupérer la liste des commandes en exécutant la requête GraphQL suivante :

        query {
          getOrders {
            id
            productId
            userId
            quantity
          }
        }

*Récupération des utilisateurs : Vous pouvez récupérer la liste des utilisateurs en exécutant la requête GraphQL suivante :
        query {
          getUsers {
            id
            name
            email
            address
            phone
          }
        } 


****************************************Architecture******************************************************

Le projet de service e-commerce est basé sur une architecture de microservices. Les services utilisés sont les suivants :

**Product Service : Gère les produits disponibles à la vente.

**Order Service : Gère les commandes passées par les utilisateurs.

**User Service : Gère les informations des utilisateurs.

Chaque service communique avec la base de données correspondante à l'aide du protocole gRPC.


**********************************Technologies utilisées*****************************************

Les principales technologies utilisées dans ce projet sont les suivantes :

**Node.js : Environnement d'exécution JavaScript côté serveur.

**Express : Framework Web pour la création d'applications Node.js.

**Apollo Server : Implémentation de GraphQL pour Node.js.

**gRPC : Framework de communication RPC (Remote Procedure Call).

**MySQL : Système de gestion de base de données relationnelle.


********************************************Contribuer***************************************************************

Les contributions à ce projet sont les bienvenues. Si vous souhaitez contribuer, veuillez suivre les étapes suivantes :

1-Fork ce dépôt de projet. 

2-Créez une branche pour votre fonctionnalité ou votre correction de bogue : 

        git checkout -b ma-branche

3-Effectuez les modifications nécessaires.

4-Committez vos modifications : 

        git commit -m "Ajouter une nouvelle fonctionnalité"

5-Push vers la branche principale du dépôt : 

        git push origin ma-branche

6-Soumettez une demande d'extraction (Pull Request).


