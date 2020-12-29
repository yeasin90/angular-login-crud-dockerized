# Simple Login and CRUD using Angular CLI#11.0.5 with Docker support
Small fornt-end application with Login and CRUD funtionality using Angular CLI#11.0.5. 
### Features: 
- Multiple Angular modules with services and interceptors
- Lazy loading of routes with Authentication guards
- Uses Dockerized [json-server](https://github.com/clue/docker-json-server) for backed communication. 
- Environment wise Docker support. Currently : environment.dev.ts and environment.prod.ts. (environment.ts is the place where you will define your environment wise configurations. Example : _dev, test, stage, prod_ etc)

### Running the app : 
##### Pre requisites : 
- NodeJs
- Angular CLI#11.0.5
- Docker Desktop
##### Run with docker commands : 
Clone the repo. Run below docker command (with _environment.dev.ts_)
```sh
docker-compose -f docker/docker-compose.dev.yml up
```
It will create a container for the web and another container for json-server initialized with some fake data. 

Once Docker execution is done, navigate to : http://localhost:4200

To see json-server, navigate to : http://localhost:3000/users

That's it! You are good to go :) 


To use _environment.prod.ts_ : 
```sh
docker-compose -f docker/docker-compose.prod.yml up
```
And navigate to : http://localhost:4201

For json-server : http://localhost:3001/users

If you have any questions/suggestions/issues, feel free to ping me :)

  
