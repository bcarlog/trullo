# Trello Clone Backend (Serverless)

## Configuration
Create a file called: env.yml and put your pixabay key
```
PIXABAY_API_KEY: MY_PIXABAY_API_KEY
```

### 3. Create `secret.pem` file

This file will contain your Auth0 public certificate, used to verify tokens.

Create a `secret.pem` file in the root folder of this project. Simply paste your public certificate in there.


## Getting started
```
npm install
serverless deploy
```