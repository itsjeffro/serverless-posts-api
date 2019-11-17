# Serverless Demo

## Introduction

This project was created as a learning exercise for an internal API microservice.

## Testing

### Testing with Serverless

#### Authorizer

```
serverless invoke local --function authorizer --data '{"authorizationToken":"<jwt-token>"}' -e JWT_SIGNING_KEY=<jwt-signing-key>
```

### Testing with Jest

```
npm run test
```