# Trello Clone Backend-Auth0 (Serverless)

## Getting started


### 2. Install dependencies

```sh
npm install
```

### 3. Create `secret.pem` file

This file will contain your Auth0 public certificate, used to verify tokens.

Create a `secret.pem` file in the root folder of this project. Simply paste your public certificate in there.

### 4. Deploy the stack

We need to deploy the stack in order to consume the private/public testing endpoints.

```sh
serverless deploy -v
```


### 5. Final test

To make sure everything works, send a POST request (using curl, Postman etc.) to your private endpoint.

You can grab a test token from Auth0. Make sure to provide your token in the headers like so:

```
"Authorization": "Bearer YOUR_TOKEN"
```

You should be good to go!

<hr/>