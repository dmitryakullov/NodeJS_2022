## Installation:
> npm i

## Quick Start
> npm start


### Introduction

This server could login, register users, add and edit user first name and last name. Also you can create a todo list.
It runs on port:
> http://localhost:4040

This app use swagger for api documentation
it runs on port:
> http://localhost:4040/api-docs

That use protected routes in swagger click on button Authorize in swagger and then paste in input JWT token.
You can use or JWT token below, or when you ran command *npm start* you will see JWT token in console. Also server always returns JWT token after successful login and registration.

## There is one hardcoded user.
*email:* cat@dog.com
*password:* 1234_Asdf
*Hardcoded JWT token for this user:*
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNhdEBkb2cuY29tIiwiZmlyc3ROYW1lIjoiIiwibGFzdE5hbWUiOiIiLCJfaWQiOiJYaDgwR2FIclpxT0p2NDQ2IiwiaWF0IjoxNjU5OTY4NzIzfQ.ubPUsFgTSFtCpDJIR71_f0QbSaQrc2CpjSEeG_aTu9Y



## Query examples

Login query:
`fetch('http://localhost:4040/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: loginInput,
      password: passwordInput,
    }),
  })`
