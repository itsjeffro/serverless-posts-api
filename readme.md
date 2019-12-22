# Microservice - Demo Service

## Introduction

This project was created as a learning exercise for an internal API microservice.

### Shared resources

A separate repository has been set up [here](https://github.com/itsjeffro/microservice-api-gateway) to provide shared resources. This way 
teams can focus on having separate microservices per repository. All which will be able to reference the AG by its restApiId and rootResourceId.

Shared resources:

- API Gateway
- Custom authorizer

## Testing

### Testing with Serverless

#### Migrations

```
serverless invoke local --function migrationProcess -e DB_HOST=<host> -e DB_USER=root -e DB_PASSWORD=<password> -e DB_PORT=3306 -e DB_DATABASE=<database>
```

#### Authorizer

```
serverless invoke local --function authorizer --data '{"authorizationToken":"<jwt-token>"}' -e JWT_SIGNING_KEY=<jwt-signing-key>
```

#### Posts

You may use the docker mysql image to test the functions below. To start, run `docker-compose up -d`.

Once the container is up, ensure that the ENV values for the commands are updated to reflect your host, user, pass, port and database.

```
serverless invoke local --function getPosts -e DB_HOST=<host> -e DB_USER=root -e DB_PASSWORD=<password> -e DB_PORT=3306 -e DB_DATABASE=<database> -p __tests__/data/serverless/getPosts.json
```

```
serverless invoke local --function getPost
```

```
serverless invoke local --function createPost
```

```
serverless invoke local --function updatePost
```

```
serverless invoke local --function deletePost
```

### Testing with Jest

```
npm run test
```

## The Whys

The following are my opinions formed from findings of similar discussions. At the end of the day it comes down to the individuals needs and requirements.

### Why are you using an API gateway for an internal API?

* Its a nice way to control rate limits in the event that an inifinte loop occurs.

* It provides better exposure across larger teams.

* It eliminates issues in the event that the resource behind the API endpoint changes. For example, transitioning from lambdas to EC2 or vice versa.