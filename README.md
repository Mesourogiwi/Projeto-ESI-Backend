# Projeto-ESI-Backend

## Technologies we used in the project
![Visual Studio Code](https://img.shields.io/badge/Visual_Studio_Code-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![NodeJS](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![ExpressJS](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Insomnia](https://img.shields.io/badge/Insomnia-5849be?style=for-the-badge&logo=Insomnia&logoColor=white)
![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=Swagger&logoColor=white)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
![Heroku](https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white)

## How to run the project
Firstly you need to have node.js on your local machine. You can dowload it in the link below (We highly recommend to download the LTS version):

[Node.js](https://nodejs.org/en/)

After this, you'll have a package manager for javascript (npm), but we recommend you to download yarn, another package manager that is faster and more optimized.

You can install running the command
```npm install -g yarn```

Then you need to add a .env file to your project, on root folder, with this variables:
- DB_HOST=yourdbhost
- DB_USERNAME=yourdbusername
- DB_PASSWORD=yourdbpassword 
- DB_DATABASE=yourdatabase

Of course you need to change the values of these variables to your database.

Now that you have the project downloaded or cloned, you have to install the dependencies, running the command:
```yarn install --ignore-engines```

Finally, you run
```yarn dev```

This will set a local server that you can access typing localhost:3333 on your browser. If you need to read the documentation, you can access localhost:3333/api-docs OR you can see it deployed on the [Website](https://projetoes1.herokuapp.com/api-docs/)

If you want to run the tests, you need to add a .env.test file on root folder of the project with these variables:

- DB_HOST=localhost
- DB_USERNAME=root
- DB_PASSWORD=root
- DB_DATABASE=projeto_es1_test

Which you can replace with values of a local database if you want.

Then, run 
```yarn test```

## About the project and technologies
As mentioned above on technologies, we used the Javascript language in addition of Node.js with Express with MySQL to run a server on our local machine and the deployed version. We used Insomnia (a program similiar to postman) to simulate request to our backend, that we could test and document. In the link below you can see an example of Insomnia

[Insomnia](https://prnt.sc/1techhc)

Also we used Swagger to generate the documentation and you can simulate requests as well. Besides that, we used Jest for testing and Heroku to deploy our project

## Testing
The Jest is a powerfull tool for the tests. If you run the test command, you'll notice that a folder named coverage will be generated. Acessing this folder and going into the lcov-report you can see an index.html file. By opening this file you'll see all folders and files and how tested they were. We used this to guide ourselves on what we should test. You can see in the example below:

[Jest](https://prnt.sc/1tediel)
