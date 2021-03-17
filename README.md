# GMIMovie

REST Api created for fetching data from `http://www.omdbapi.com/`.

## Technologies
  - Node.js + Express + TypeScript 
  - MongoDB 
  - Docker
  - PM2

  ## Prerequisites
- `docker` and `docker-compose`

## Setup
1. Download repository
2. Provide `.env` file for `api` based on `.env.api.example` file
3. Provide `.env` file for `docker` based on `.env.docker.example` file
4. Provide `app.conf` file for nginx
5. Run `npm run up` from main directory
6. If you are running this app for the first time, please customise and run `init-letsencrypt.sh` script as sudo from `docker` dir (generating certificates)
7. To stop app run `npm run down` from main directory


## API

Method    | URI                             | Middleware        | Description
:-------- | :----------------               | :---------        | :---------
GET       | /                               | -                 | home
POST      | /movies/add?title={title}       | -                 | add movie
GET       | /movies                         | -                 | fetch all movies
GET       | /movies?id={id}                 | -                 | fetch the movie
POST      | /movies/{id}/comments/add       | -                 | add comment to the movie
GET       | /movies/{id}/comments/          | -                 | get all comments for the movie
GET       | /movies/comments                | -                 | get all comments

## Postman
Using `Postman` for sending requests is highly recommended. You can find the postman config file in the `postman` directory.


## CURL
Detailed request config when using curl:

#### HOME
```sh
curl https://lucasapp.pl/
```

#### CREATE MOVIE
```sh
curl -v -X POST https://lucasapp.pl/movies/add?title=...
```

Example:
```sh
curl -v -X POST https://lucasapp.pl/movies/add?title=Shrek
```

#### GET ALL MOVIES
```sh
curl https://lucasapp.pl/movies
```

#### GET MOVIE BY ID
```sh
curl https://lucasapp.pl/movies?id=...
```

Example:
```sh
curl https://lucasapp.pl/movies?id=6051e7e3f0eefe0010168941
```

#### ADD COMMENT
```sh
curl -v -X POST https://lucasapp.pl/movies/.../comments/add -H 'Content-Type: application/json' -d '{"creator":"...", "content":"..."}'
```

Example:
```sh
curl -v -X POST https://lucasapp.pl/movies/6051e7e3f0eefe0010168941/comments/add -H 'Content-Type: application/json' -d '{"creator":"Yoda", "content":"May the power be with you"}'
```

#### GET ALL COMMENTS
```sh
curl https://lucasapp.pl/movies/comments
```

#### GET ALL COMMENTS FOR SPECIFIC MOVIE
```sh
curl https://lucasapp.pl/movies/.../comments/
```

Example:
```sh
curl https://lucasapp.pl/movies/6051e7e3f0eefe0010168941/comments/
```

## INCOMING DATA FORMAT

#### MOVIE (MovieDocument)
```js
title: string;
released: Date;
plot: string;
comments: CommentDocument[];
languages: LangDocument[];
director: PersonDocument[];
actors: PersonDocument[];
createdAt: Date;
updatedAt: Date;
```

#### COMMENT (CommentDocument)
```js
content: string;
creator: string;
movie: string;
createdAt: Date;
updatedAt: Date;
```

#### LANGUAGE (LangDocument)
```js
name: string;
```

#### PERSON (PersonDocument)
```js
name: string;
```

*Notice that, data from general endpoints (`/`) always come as array but data from specific endpoints (`?id`) come as singular object.*