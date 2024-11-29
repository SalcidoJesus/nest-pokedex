<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Ejecutar el producción

1. Clonar repositorio
2. Instalar dependencias
```
npm i
```
3. Instalar CLI de Nest
```
npm i -g @nestjs/cli
```
4. Levantar BD
```
docker-compose up -d
```
5. Clonar el archivo **.env_template** y renombrar la copia como **.env**.

6. Llenar las variables de entorno

7. Llenar la BD con 650 pokemones
```
http://localhost:3000/api/seed
```


## Stack
- NestJS
- MongoDB
- Mongoose
