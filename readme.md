# Microservice - Demo Service

## Introduction

This project was created as a learning exercise for an internal API microservice.

Documentation:

- [1. Getting started](./docs/getting-started.md)
- [2. Testing](./docs/testing.md)

## Shared resources

A separate repository has been set up [here](https://github.com/itsjeffro/microservice-api-gateway) to provide shared resources. This way 
teams can focus on having separate microservices per repository. All which will be able to reference the AG by its restApiId and rootResourceId.

Shared resources:

- API Gateway
- Custom authorizer

## The Whys

The following are my opinions formed from findings of similar discussions. At the end of the day it comes down to the individuals needs and requirements.

### Why are you using an API gateway for an internal API?

* Its a nice way to control rate limits in the event that an inifinte loop occurs.

* It provides better exposure across larger teams.

* It eliminates issues in the event that the resource behind the API endpoint changes. For example, transitioning from lambdas to EC2 or vice versa.