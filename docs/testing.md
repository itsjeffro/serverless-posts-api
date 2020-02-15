# Testing

## Testing with Serverless

### Migrations

```bash
serverless invoke local --function migrationProcess -e DB_HOST=<host> -e DB_USER=root -e DB_PASSWORD=<password> -e DB_PORT=3306 -e DB_DATABASE=<database>
```

### Authorizer

```bash
serverless invoke local --function authorizer --data '{"authorizationToken":"<jwt-token>"}' -e JWT_SIGNING_KEY=<jwt-signing-key>
```

### Posts

You may use the docker mysql image to test the functions below. To start, run `docker-compose up -d`.

Once the container is up, ensure that the ENV values for the commands are updated to reflect your host, user, pass, port and database.

```bash
serverless invoke local --function getPosts -p __tests__/data/serverless/getPosts.json
```

```bash
serverless invoke local --function getPost -p __tests__/data/serverless/getPost.json
```

```bash
serverless invoke local --function createPost -p __tests__/data/serverless/createPost.json
```

```bash
serverless invoke local --function updatePost
```

```bash
serverless invoke local --function deletePost
```

## Testing with Jest

```bash
npm run test
```

## Testing with serverless offline

Using serverless offline is great way to test your endpoints using tools like postman.

You can start a local server to access your endpoints by running `sls offline`.

```bash
sls offline --stage=local

# or serverless offline --stage=local
```
