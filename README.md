## Installation:
> npm i

## Quick Start
> npm start


### Introduction

This server could log in, register users, and add and edit users' first and last names. Also, you can create a to-do list.
It runs on port:
> http://localhost:4040

This app use swagger for api documentation
It runs on port:
> http://localhost:4040/api-docs

That use protected routes in swagger click on the button Authorize in swagger and then paste in the input JWT token.
You can use or JWT token below, or when you run the command *npm start* you will see JWT token in the console. Also, the server always returns JWT token after successful login and registration.

Note: you can set your client port in `config.js` file

## There is one hardcoded user.
*email:* cat@dog.com
*password:* 1234_Asdf
*Hardcoded JWT token for this user:*
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNhdEBkb2cuY29tIiwiZmlyc3ROYW1lIjoiIiwibGFzdE5hbWUiOiIiLCJfaWQiOiJYaDgwR2FIclpxT0p2NDQ2IiwiaWF0IjoxNjU5OTY4NzIzfQ.ubPUsFgTSFtCpDJIR71_f0QbSaQrc2CpjSEeG_aTu9Y



## Query examples

Login query:
> fetch('http://localhost:4040/login', {
>     method: 'POST',
>     headers: {
>       'Content-Type': 'application/json',
>     },
>     body: JSON.stringify({
>       email: loginInput,
>       password: passwordInput,
>     }),
>   })

Get user data query:
> fetch('http://localhost:4040/user/profile', {
>       method: 'GET',
>       headers: {
>         Authorization: `Bearer ${JWT_TOKEN}`,
>       },
>     })

## Socket.io
Use this tutorial for sockets:
> https://www.youtube.com/watch?v=NU-HfZY3ATQ&list=PPSV
