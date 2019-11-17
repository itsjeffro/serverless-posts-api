# Serverless Demo

## Introduction

This project was created as a learning exercise for an internal API microservice.

## Testing

### Testing with Serverless

#### Authorizer

```
serverless invoke local --function authorizer --data '{"authorizationToken":"<jwt-token>"}' -e JWT_SIGNING_KEY=<jwt-signing-key>
```

#### Posts

```
serverless invoke local --function getPosts
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