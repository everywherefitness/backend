<!-- <<<<<<< HEAD
=======
# Anywhere Fitness v1.0.0

Backend Project for Lambda&#39;s tt_webppt_185 <br />
Deployed Link is https://anywhere-fitness-pt185.herokuapp.com/

- [Auth](#auth)
	- [Logs a User In](#logs-a-user-in)
	- [Registers a New User](#registers-a-new-user)
	
- [Categories](#categories)
	- [Deletes Category based on provided Id](#deletes-category-based-on-provided-id)
	- [Returns all categories](#returns-all-categories)
	- [Add New Category](#add-new-category)
	- [Updates Category based on provided Id](#updates-category-based-on-provided-id)
	
- [Classes](#classes)
	- [Deletes Class based on provided Id](#deletes-class-based-on-provided-id)
	- [Returns all classes](#returns-all-classes)
	- [Add New Class](#add-new-class)
	- [Updated Class with provided Id](#updated-class-with-provided-id)
	
- [User](#user)
	- [Updates the Current Logged In User](#updates-the-current-logged-in-user)
	- [Deletes the Current Logged In User](#deletes-the-current-logged-in-user)
	- [Retrieve all Classes that the Current User is signed up for](#retrieve-all-classes-that-the-current-user-is-signed-up-for)
	- [Signs the User up for the Provided Class Id](#signs-the-user-up-for-the-provided-class-id)
	- [Removes the User from the Provided Class Id](#removes-the-user-from-the-provided-class-id)
	


# Auth

## Logs a User In

<p>Logs a User In</p>

	POST /api/auth/login


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| username			| String			|  <p>Username of the User</p>							|
| password			| String			|  <p>Password of the User</p>							|

### Success Response

Success-Response:

```
{
    "message": "Welcome back mikebombs",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoyLCJ1c2VybmFtZSI6Im1pa2Vib21icyIsImlhdCI6MTYzNDYwODk2MiwiZXhwIjoxNjM0Njk1MzYyfQ.bAOPhxQ-7gUiyjzNihstQYgKPmkBnPi7AvD1ohOPGH0"
}
```
### Error Response

Username-Not-Found-Response

```
{
     "message": "Username is not in the system."
}
```
Incorrect-Password

```
{
     "message": "Invalid credentials"
}
```
## Registers a New User

<p>Registers a New User</p>

	POST /api/auth/register


### Parameters
<p>** All fields are required ** </p>

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| username			| String			|  <p>The new user's username</p>|
| password			| String			|  <p>The new user's password</p>|
| name   			| String			|  <p>The new user's first name</p>|
| email	         		| String			|  <p>The new user's email</p>|
| isInstructor			| Boolean			|  <p>The new user's role: true for instructor, defaults to false if not provided</p>|

### Success Response

Success-Response:

```
{
    "message": "Ahoy, ck5, welcome aboard!",
    "user": {
        "name": "Kuroda",
        "username": "CK5",
        "email": "ck5@lights.com",
        "password": "kuroda123",
        "isInstructor": true
    }
}
```
### Error Response

Username-Already-Taken

```
{
     "message": "Username is already taken"
}
```
# Categories

## Deletes Category based on provided Id



	DELETE /api/categories/:category_id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| category_id	      | integer	|  <p>Deletes category based on ID passed through paramater</p>|

## Returns all categories



	GET /api/categories


### Success Response

Success-Response:

```
[
    {
        "category_id": 2,
        "name": "Aerobics"
    },
    {
        "category_id": 3,
        "name": "Cycling"
    },
    {
        "category_id": 4,
        "name": "Taekwondo"
    },
    {
        "category_id": 5,
        "name": "Yoga"
    }
]
```
### Error Response

Unauthorized-Response:

```
{
    "message": "Unauthroized"
}
```
## Add New Category



	POST /api/categories


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| name			| String			|  <p>Category Name *Required</p>|

### Success Response

Success-Response:

```
    {
        "category_id": 8,
        "name": "Climbing"
    }
```
### Error Response

Unauthorized-Response:

```
{
    "message": "Unauthroized"
}
```
BadRequest-Response

```
{
     "message": "The Category Name: ${req.body.name} is already taken"
}
```
## Updates Category based on provided Id



	PUT /api/categories/:category_id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| category_id		| Integer			|  <p>The ID is passed in the URL</p>							|
| name			| String			|  <p>Category Name *Required</p>						|

### Success Response

Success-Response:

```
{
    "category_id": 6,
    "name": "Climbing"
}
```
# Classes

## Deletes Class based on provided Id



	DELETE /api/classes/:class_id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| class_id			| integer			|  <p>The ID is passed in the URL</p>							|

## Returns all classes



	GET /api/classes


### Success Response

Success-Response:

```
[
 {
   "id": 1,
   "title": "Yoga",
   "instructorId": 1,
   "categoryId": 1,
   "scheduleTime": null,
   "address": null,
   "city": null,
   "state": null,
   "zipCode": null,
   "created_at": "2019-10-21T12:51:44.173Z",
   "updated_at": "2019-10-21T12:51:44.173Z"
 },
 {
   "id": 2,
   "title": "Water Aerobics",
   "instructorId": 1,
   "categoryId": 2,
   "scheduleTime": null,
   "address": null,
   "city": null,
   "state": null,
   "zipCode": null,
   "created_at": "2019-10-21T12:51:44.173Z",
   "updated_at": "2019-10-21T12:51:44.173Z"
 }
]
```
### Error Response

Unauthorized-Response:

```
{
    "message": "Unauthroized"
}
```
## Add New Class



	POST /api/classes


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| title			| String			|  <p>Class Title *Required</p>							|
| instructorId			| Integer			|  <p>The Id of the Instructor *Required</p>							|
| categoryId			| Integer			|  <p>The Id of the Category *Required</p>							|
| scheduleTime			| Date			|  <p>The Date and Time of the class</p>							|
| address			| String			|  <p>The Street Address of the class</p>							|
| city			| String			|  <p>The City of the class</p>							|
| state			| String			|  <p>The State of the class</p>							|
| zipCode			| String			|  <p>The ZipCode fo the class</p>							|

### Success Response

Success-Response:

```
{
 "id": 3,
 "title": "A New Class",
 "instructorId": 1,
 "categoryId": 1,
 "scheduleTime": null,
 "address": null,
 "city": null,
 "state": null,
 "zipCode": null,
 "created_at": "2019-10-21T13:23:39.281Z",
 "updated_at": "2019-10-21T13:23:39.281Z"
}
```
### Error Response

Unauthorized-Response:

```
{
    "message": "Unauthroized"
}
```
## Updated Class with provided Id



	PUT /api/classes/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| title			| String			|  <p>Class Title *Required</p>							|
| instructorId			| Integer			|  <p>The Id of the Instructor *Required</p>							|
| categoryId			| Integer			|  <p>The Id of the Category *Required</p>							|
| scheduleTime			| Date			|  <p>The Date and Time of the class</p>							|
| address			| String			|  <p>The Street Address of the class</p>							|
| city			| String			|  <p>The City of the class</p>							|
| state			| String			|  <p>The State of the class</p>							|
| zipCode			| String			|  <p>The ZipCode fo the class</p>							|

### Success Response

Success-Response:

```
{
 "id": 3,
 "title": "An Updated Class",
 "instructorId": 1,
 "categoryId": 1,
 "scheduleTime": null,
 "address": null,
 "city": null,
 "state": null,
 "zipCode": null,
 "created_at": "2019-10-21T13:23:39.281Z",
 "updated_at": "2019-10-21T13:23:39.281Z"
}
```
### Error Response

Unauthorized-Response:

```
{
    "message": "Unauthroized"
}
```
# User

## Updates the Current Logged In User

<p>Updates the current logged in user</p>

	PUT /api/user


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| username			| String			|  <p>The Users username</p>							|
| password			| String			|  <p>The Users password</p>							|
| firstName			| String			|  <p>The Users first name</p>							|
| lastName			| String			|  <p>The Users last name</p>							|
| email			| String			|  <p>The Users email</p>							|
| roleId			| Integer			|  <p>The Users Role, 1 for Instructor, 2 for Client</p>							|

### Success Response

Success-Response:

```
{
 "id": 3,
 "firstName": "Donald",
 "lastName": null,
 "email": null,
 "username": "don",
 "created_at": "2019-10-20T22:59:45.794Z",
 "updated_at": "2019-10-20T22:59:45.794Z",
 "roleId": 1
}
```
### Error Response

Unauthorized-Response:

```
{
    "message": "Unauthroized"
}
```
## Deletes the Current Logged In User

<p>Deletes the current logged in user</p>

	DELETE /api/user


### Success Response

Success-Response:

```
1
```
### Error Response

Unauthorized-Response:

```
{
    "message": "Unauthroized"
}
```
## Retrieve all Classes that the Current User is signed up for

<p>Retrieves the Current Users Signed up Classes</p>

	GET /api/user/classes


### Success Response

Success-Response:

```
[
 {
   "classId": 1,
   "clientId": 3,
   "created_at": "2019-10-21T16:56:56.379Z",
   "updated_at": "2019-10-21T16:56:56.379Z"
 }
]
```
### Error Response

Unauthorized-Response:

```
{
    "message": "Unauthroized"
}
```
## Signs the User up for the Provided Class Id

<p>Signs an user up for a class based on the provided class Id</p>

	POST /api/user/classes/:id


### Success Response

Success-Response:

```
{
 "classId": 2,
 "clientId": 3,
 "created_at": "2019-10-21T19:00:55.322Z",
 "updated_at": "2019-10-21T19:00:55.322Z"
}
```
### Error Response

Unauthorized-Response:

```
{
    "message": "Unauthroized"
}
```
## Removes the User from the Provided Class Id

<p>Removes the User from the provided Class Id</p>

	DELETE /api/user/classes/:id


### Success Response

Success-Response:

```
1
```
### Error Response

Unauthorized-Response:

```
{
    "message": "Unauthroized"
}
```

**Not Original Work, Copied from Lambda School Repo at:** https://github.com/build-week-apis/anywhere-fitness 

*All creative credit goes to [Donald Whitley](https://github.com/build-week-apis/anywhere-fitness/commits?author=dswhitely1) for a very fine job.*
>>>>>>> dd7abcc592e7633600ea944edf2462d6081f4fc5
 -->
