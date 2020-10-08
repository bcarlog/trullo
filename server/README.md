# Trello Clone Backend

AWS Lambda + AWS DynamoDB + Serverless + Node.js + Babel



## 📋 Content

1. Geting Started

2. Deploy



## 1. Getting Started



**Install dependencies**

```
npm install
```



**Config Pixabay Key**

You need a PixabayKey, for more details: https://pixabay.com/api/docs/

Create a file called: env.yml in this folder and put your PixabayKey.

```
RootFolder/
	server/
		env.yml
```

Example (env.yml):

```yaml
PIXABAY_API_KEY: MY_PIXABAY_API_KEY
```



**Create `secret.pem` file**

This file will contain your Auth0 public certificate, used to verify tokens.

Create a `secret.pem` file in the root folder of this project. Simply paste your public certificate in there.

```
RootFolder/
	server/
		secret.pem
```



## 2. Deploy

Deploy the project with Serverless, more info https://www.serverless.com/framework/docs/getting-started/

```bash
serverless deploy -v
```