# PokeAPI-React-Express

> Implementation of https://pokeapi.co using ReactJS and ExpressJS

## Prerequisites

This project requires NodeJS (version v16.14.2 or later) and NPM.


## Installation

To setup the server, navigate to server directory and create .env file and copy the contents from .env.example
You can change the value of each environment variable depends on your preferences

```sh
cd server
npm install
```

same with client, navigate to its directory and create .env file and copy the contents from .env.example, you can also change the port number depends on your preferences setted on server side.

```sh
cd client
npm install
```

## Usage

### Serving the server api
```sh
cd server
npm run dev
```

### Serving the client website
```sh
cd client
npm run dev
```


### Backlogs

- User Authentication (Register/Login/Logout) ✅
- List of Pokemon with images ✅
- List of favorite Pokemon ✅
- Searchable Pokemon ✅
- Viewable Pokemon details & ability ✅
- Sortable by descending / ascending
- Grid & list view 🚧
- By default, the number of pokemon shown must be 20. ✅
- Ability to add a pokemon as favorite ✅
- User should be able to create multiple pokemon teams 🚧
