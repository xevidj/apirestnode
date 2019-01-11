# Docker Node MongoDB Blog


## DEPLOY

```bash
# para levantar el contenedor 
docker-compose up


# use -d flag para correr en background

# bajar contenedor 
docker-compose down
# Reconstruir el proyecto
docker-compose build

#Para bajar los cambios y reflejar en el contenedor
1) git pull
2)docker-compose build
3)docker-compose up

docker-compose build
# To be able to edit files, add volume to compose file
volumes: ['./:/usr/src/app']

se publicara en el puerto: 8082
IP_SERVER:8082

```
