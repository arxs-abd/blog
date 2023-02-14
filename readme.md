# Blog Back End

## Api Documentation

### A. Authentication

#### 1. Register

##### Endpoint

```Javascript
POST /api/register
```

##### Field

| Field            | Description                         | Type   | Validation                         |
| ---------------- | ----------------------------------- | ------ | ---------------------------------- |
| email            | The email used to register          | String | Valid email                        |
| password         | The password used to register       | String | minimum 8 character                |
| password_confirm | Rewritten password used to register | String | password_confirm equal to password |

##### Example for Request and Response

```Javascript
// Request
{
    email : 'arisakhyar704@gmail.com',
    password : 'indonesiainyabesar',
    password_confirm : 'indonesiainyabesar',
}
// Response
200 OK
{
    status : 'success',
    msg : 'Signup Successfully'
}
// Request
{
    email : 'arisakhyar704@gmail.com',
    password : 'indonesiainyabesar',
    password_confirm : 'indonesiainyabesar',
}
// Response
401 UNAUTHORIZED
{
    status : 'error',
    msg : 'Password confirmation does not match password'
}
```

#### 2. Login

##### Endpoint

```Javascript
POST /api/login
```

##### Field

| Field    | Description                   | Type   | Validation          |
| -------- | ----------------------------- | ------ | ------------------- |
| email    | The email used to register    | String | Valid Email         |
| password | The password used to register | String | minimum 8 character |

##### Example For Request and Response

```Javascript
// Request
{
    email : 'arisakhyar704@gmail.com',
    password : 'indonesiainyabesar',
}
// Response
200 OK
{
    status : 'success',
    msg : 'Login Successfully',
    data : {
        id: '6353b066327fac926fb26d7a',
        email: 'arisakhyar704@gmail.com',
        jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYzNTNiMDY2MzI3ZmFjOTI2ZmIyNmQ3YSIsImVtYWlsIjoiYXJpc21hQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJhJDEwJFd1UmZRc1U1UzNoeXVFaUJuRmw1ZC5XbG1uYnlJUVgxMURWZEdmNlkyTkFBV3ZadU1yQnhhIiwiX192IjowfSwiaWF0IjoxNjY2NDI5NDMzfQ.BkHJyJt5wogx3QfUU7TeRlyRyJj_ACg3eHcBen9zl7Q'
    }
}

// Contoh Request yang Salah
{
    email : 'arisakhyar704@gmail.com',
    password : 'indonesiainyakecil',
}
// Response
403 FORBIDDEN
{
    status : 'error',
    msg : 'Password is Wrong'
}
```

#### 3. Logout

##### Endpoint

```Javascript
POST /api/logout
```

##### Field

| Field          | Description                                                        | Type   | Validation |
| -------------- | ------------------------------------------------------------------ | ------ | ---------- |
| x-access-token | JSON Web Token Received During Login Process and Stored In Cookies | String | Required   |

##### Example For Request and Response

```Javascript
// Cookies
{
    x-acces-token : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYzNTNiMDY2MzI3ZmFjOTI2ZmIyNmQ3YSIsImVtYWlsIjoiYXJpc21hQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJhJDEwJFd1UmZRc1U1UzNoeXVFaUJuRmw1ZC5XbG1uYnlJUVgxMURWZEdmNlkyTkFBV3ZadU1yQnhhIiwiX192IjowfSwiaWF0IjoxNjY2NDI5NDMzfQ.BkHJyJt5wogx3QfUU7TeRlyRyJj_ACg3eHcBen9zl7Q'
}
// Response
200 OK
{
    status : 'success',
    msg : 'Logout Successfully',
}
```
