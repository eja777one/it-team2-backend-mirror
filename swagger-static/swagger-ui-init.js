
window.onload = function() {
  // Build a system
  let url = window.location.search.match(/url=([^&]+)/);
  if (url && url.length > 1) {
    url = decodeURIComponent(url[1]);
  } else {
    url = window.location.origin;
  }
  let options = {
  "swaggerDoc": {
    "openapi": "3.0.0",
    "paths": {
      "/auth/me": {
        "get": {
          "operationId": "AuthController_authMe",
          "summary": "Get user's info. User should have access token",
          "parameters": [],
          "responses": {
            "200": {
              "description": "User's info was received",
              "content": {
                "application/json": {
                  "schema": {
                    "title": "userAuthMeSchemaViewModel",
                    "type": "object",
                    "properties": {
                      "email": {
                        "type": "string",
                        "example": "powerful@gmail.com"
                      },
                      "userId": {
                        "type": "string",
                        "example": "642b57873fd3241964fef9aa"
                      },
                      "userName": {
                        "type": "string",
                        "example": "powerMan"
                      }
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Check your cookie. Make sure that user is exist"
            }
          },
          "tags": [
            "Auth"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/auth/registration": {
        "post": {
          "operationId": "AuthController_registration",
          "summary": "Registration for users",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "title": "CreateUserInputModelType",
                  "type": "object",
                  "properties": {
                    "userName": {
                      "type": "string",
                      "example": "powerMan",
                      "description": "it should be valid userName",
                      "minLength": 4,
                      "maxLength": 30
                    },
                    "email": {
                      "type": "string",
                      "example": "powerful@gmail.com",
                      "description": "it should be valid email"
                    },
                    "password": {
                      "type": "string",
                      "minLength": 6,
                      "maxLength": 20
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "204": {
              "description": "Account for user was created"
            },
            "400": {
              "description": "Data from request are incorrect or unexist",
              "content": {
                "application/json": {
                  "schema": {
                    "title": "APIResultError",
                    "type": "object",
                    "properties": {
                      "errorsMessages": {
                        "type": "array",
                        "items": {
                          "type": "object",
                          "properties": {
                            "message": {
                              "type": "string",
                              "description": "any error message",
                              "example": "incorrect email"
                            },
                            "field": {
                              "type": "string",
                              "description": "it should be incorrect field from request body",
                              "example": "email"
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "429": {
              "description": "More than 5 requests for 10 seconds"
            }
          },
          "tags": [
            "Auth"
          ]
        }
      },
      "/auth/registration-confirmation": {
        "post": {
          "operationId": "AuthController_registrationConfirmation",
          "summary": "User can activate account by confirmation code",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "title": "CodeConfirmInputModelType",
                  "type": "object",
                  "properties": {
                    "code": {
                      "type": "string",
                      "example": "f0b00c17-bd4d-4113-b2c4-1a7a29124970",
                      "description": "it should be code from mail which sent to user"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "204": {
              "description": "User's account was activated"
            },
            "400": {
              "description": "User is already activated or confirm code is incorrect/expired",
              "content": {
                "application/json": {
                  "schema": {
                    "title": "APIResultError",
                    "type": "object",
                    "properties": {
                      "errorsMessages": {
                        "type": "array",
                        "items": {
                          "type": "object",
                          "properties": {
                            "message": {
                              "type": "string",
                              "description": "any error message",
                              "example": "incorrect confirmedCode"
                            },
                            "field": {
                              "type": "string",
                              "description": "it should be incorrect field from request body",
                              "example": "code"
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "429": {
              "description": "More than 5 requests for 10 seconds"
            }
          },
          "tags": [
            "Auth"
          ]
        }
      },
      "/auth/registration-email-resending": {
        "post": {
          "operationId": "AuthController_registrationEmailResending",
          "summary": "Send confirmation code to user's email",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "title": "EmailInputModelType",
                  "type": "object",
                  "properties": {
                    "email": {
                      "type": "string",
                      "example": "powerful@gmail.com",
                      "description": "it should be valid email"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "204": {
              "description": "Email succesfully sent"
            },
            "400": {
              "description": "User's emaii is incorrect",
              "content": {
                "application/json": {
                  "schema": {
                    "title": "APIResultError",
                    "type": "object",
                    "properties": {
                      "errorsMessages": {
                        "type": "array",
                        "items": {
                          "type": "object",
                          "properties": {
                            "message": {
                              "type": "string",
                              "description": "any error message",
                              "example": "incorrect email"
                            },
                            "field": {
                              "type": "string",
                              "description": "it should be incorrect field from request body",
                              "example": "email"
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "429": {
              "description": "More than 5 requests for 10 seconds"
            }
          },
          "tags": [
            "Auth"
          ]
        }
      },
      "/auth/login": {
        "post": {
          "operationId": "AuthController_login",
          "summary": "User can login and do something into app",
          "parameters": [
            {
              "name": "user-agent",
              "required": true,
              "in": "header",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "title": "LoginInputModelType",
                  "type": "object",
                  "properties": {
                    "email": {
                      "type": "string",
                      "example": "powerful@gmail.com",
                      "description": "it should be valid email"
                    },
                    "password": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Successfully login and get tokens. Refresh token sent into secure cookie",
              "content": {
                "application/json": {
                  "schema": {
                    "title": "UserTokenModel",
                    "type": "object",
                    "properties": {
                      "accessToken": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Email or password are incorrect"
            },
            "429": {
              "description": "More than 5 requests for 10 seconds"
            }
          },
          "tags": [
            "Auth"
          ]
        }
      },
      "/auth/refresh-token": {
        "post": {
          "operationId": "AuthController_refreshToken",
          "summary": "User can update refresh and access tokens. User should have refresh token",
          "parameters": [],
          "responses": {
            "200": {
              "description": "Tokens was successfully updated and sent to user. Refresh token sent into secure cookie",
              "content": {
                "application/json": {
                  "schema": {
                    "title": "UserTokenModel",
                    "type": "object",
                    "properties": {
                      "accessToken": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Refresh token is un exist or expired"
            }
          },
          "tags": [
            "Auth"
          ],
          "security": [
            {
              "cookie": []
            }
          ]
        }
      },
      "/auth/password-recovery-code": {
        "post": {
          "operationId": "AuthController_passwordRecoveryCode",
          "summary": "User can request recovery code to set new password",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "title": "PasswordRecoveryInputModelType",
                  "type": "object",
                  "properties": {
                    "email": {
                      "type": "string",
                      "example": "powerful@gmail.com",
                      "description": "it should be valid email"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "204": {
              "description": "Mail with recovery code was sent to user's email"
            },
            "400": {
              "description": "Incorrect email. Maybe user is un exist in app",
              "content": {
                "application/json": {
                  "schema": {
                    "title": "APIResultError",
                    "type": "object",
                    "properties": {
                      "errorsMessages": {
                        "type": "array",
                        "items": {
                          "type": "object",
                          "properties": {
                            "message": {
                              "type": "string",
                              "description": "any error message",
                              "example": "incorrect email"
                            },
                            "field": {
                              "type": "string",
                              "description": "it should be incorrect field from request body",
                              "example": "email"
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "429": {
              "description": "More than 5 requests for 10 seconds"
            }
          },
          "tags": [
            "Auth"
          ]
        }
      },
      "/auth/new-password": {
        "post": {
          "operationId": "AuthController_newPassword",
          "summary": "User can set new password. User should have password recovery code",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "title": "PasswordInputModelType",
                  "type": "object",
                  "properties": {
                    "newPassword": {
                      "type": "string",
                      "example": "newPassword",
                      "description": "it should be valid password",
                      "minLength": 6,
                      "maxLength": 20
                    },
                    "recoveryCode": {
                      "type": "string",
                      "example": "f0b00c17-bd4d-4113-b2c4-1a7a29124970",
                      "description": "it should be code from mail which sent to user"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "204": {
              "description": "New password was set to user"
            },
            "400": {
              "description": "Incorrect recovery code",
              "content": {
                "application/json": {
                  "schema": {
                    "title": "APIResultError",
                    "type": "object",
                    "properties": {
                      "errorsMessages": {
                        "type": "array",
                        "items": {
                          "type": "object",
                          "properties": {
                            "message": {
                              "type": "string",
                              "description": "any error message",
                              "example": "incorrect recoveryCode"
                            },
                            "field": {
                              "type": "string",
                              "description": "it should be incorrect field from request body",
                              "example": "recoveryCode"
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "429": {
              "description": "More than 5 requests for 10 seconds"
            }
          },
          "tags": [
            "Auth"
          ]
        }
      },
      "/auth/logout": {
        "post": {
          "operationId": "AuthController_logout",
          "summary": "User can logout. User should have refresh token. User's access and refresh token will be deleted",
          "parameters": [],
          "responses": {
            "204": {
              "description": "User was logout. Tokens was deleted"
            },
            "401": {
              "description": "Refresh token is un exist or expired"
            }
          },
          "tags": [
            "Auth"
          ],
          "security": [
            {
              "cookie": []
            }
          ]
        }
      },
      "/profile/createProfile/{userName}": {
        "post": {
          "operationId": "ProfileController_addProfile",
          "summary": "User can add profile. User should have access token",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "title": "AddProfileInputModel",
                  "type": "object",
                  "properties": {
                    "userName": {
                      "type": "string",
                      "minLength": 4,
                      "maxLength": 30,
                      "example": "Harley_Quinn",
                      "description": "it should be valid userName"
                    },
                    "name": {
                      "type": "string",
                      "minLength": 4,
                      "maxLength": 20,
                      "example": "Margo",
                      "description": "it should be valid name"
                    },
                    "surname": {
                      "type": "string",
                      "minLength": 4,
                      "maxLength": 20,
                      "example": "Robbie",
                      "description": "it should be valid surname"
                    },
                    "birthday": {
                      "type": "string",
                      "maxLength": 20,
                      "example": "02.07.1990"
                    },
                    "city": {
                      "type": "string",
                      "maxLength": 20,
                      "example": "Dalby"
                    },
                    "aboutMe": {
                      "type": "string",
                      "maxLength": 200,
                      "example": "Famous actress"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "204": {
              "description": "Profile was added to user"
            },
            "400": {
              "description": "Incorrect field(s) in request body",
              "content": {
                "application/json": {
                  "schema": {
                    "title": "APIResultError",
                    "type": "object",
                    "properties": {
                      "errorsMessages": {
                        "type": "array",
                        "items": {
                          "type": "object",
                          "properties": {
                            "message": {
                              "type": "string",
                              "description": "any error message",
                              "example": "incorrect name"
                            },
                            "field": {
                              "type": "string",
                              "description": "it should be incorrect field from request body",
                              "example": "name"
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Check your cookie. Make sure that user is exist"
            }
          },
          "tags": [
            "Profile"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/profile/edit/{userName}": {
        "put": {
          "operationId": "ProfileController_updateProfile",
          "summary": "User can edit own profile. User should have access token",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "title": "UpdateProfileInputModel",
                  "type": "object",
                  "properties": {
                    "userName": {
                      "type": "string",
                      "minLength": 4,
                      "maxLength": 30,
                      "example": "Harley_Quinn",
                      "description": "it should be valid userName"
                    },
                    "name": {
                      "type": "string",
                      "minLength": 4,
                      "maxLength": 20,
                      "example": "Margo",
                      "description": "it should be valid name"
                    },
                    "surname": {
                      "type": "string",
                      "minLength": 4,
                      "maxLength": 20,
                      "example": "Robbie",
                      "description": "it should be valid surname"
                    },
                    "birthday": {
                      "type": "string",
                      "maxLength": 20,
                      "example": "02.07.1990"
                    },
                    "city": {
                      "type": "string",
                      "maxLength": 20,
                      "example": "Dalby"
                    },
                    "aboutMe": {
                      "type": "string",
                      "maxLength": 200,
                      "example": "Famous actress"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Profile was updated"
            },
            "400": {
              "description": "Incorrect field(s) in request body",
              "content": {
                "application/json": {
                  "schema": {
                    "title": "APIResultError",
                    "type": "object",
                    "properties": {
                      "errorsMessages": {
                        "type": "array",
                        "items": {
                          "type": "object",
                          "properties": {
                            "message": {
                              "type": "string",
                              "description": "any error message",
                              "example": "incorrect name"
                            },
                            "field": {
                              "type": "string",
                              "description": "it should be incorrect field from request body",
                              "example": "name"
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Check your cookie. Make sure that user is exist"
            }
          },
          "tags": [
            "Profile"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/queryProfile/{userName}": {
        "get": {
          "operationId": "QueryProfileController_getProfile",
          "summary": "User can get own profile",
          "parameters": [],
          "responses": {
            "200": {
              "description": "Profile was sent to user",
              "content": {
                "application/json": {
                  "schema": {
                    "title": "ProfileViewModel",
                    "type": "object",
                    "properties": {
                      "_id": {
                        "type": "string",
                        "example": "643a7e839d20aa10bbd2ffb9"
                      },
                      "profileInfo": {
                        "type": "object",
                        "properties": {
                          "userName": {
                            "type": "string",
                            "minLength": 4,
                            "maxLength": 30,
                            "example": "Harley_Quinn",
                            "description": "it should be valid userName"
                          },
                          "name": {
                            "type": "string",
                            "minLength": 4,
                            "maxLength": 20,
                            "example": "Margo",
                            "description": "it should be valid name"
                          },
                          "surname": {
                            "type": "string",
                            "minLength": 4,
                            "maxLength": 20,
                            "example": "Robbie",
                            "description": "it should be valid surname"
                          },
                          "birthday": {
                            "type": "string",
                            "maxLength": 20,
                            "example": "02.07.1990"
                          },
                          "city": {
                            "type": "string",
                            "maxLength": 20,
                            "example": "Dalby"
                          },
                          "aboutMe": {
                            "type": "string",
                            "maxLength": 200,
                            "example": "Famous actress"
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "404": {
              "description": "User's profile was not found"
            }
          },
          "tags": [
            "Profile"
          ]
        }
      },
      "/testing/db-user/{userEmail}": {
        "get": {
          "operationId": "TestsController_getUser",
          "summary": "Get DB user by email",
          "parameters": [
            {
              "name": "userEmail",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Get DB user"
            },
            "404": {
              "description": "User with this email is un exist"
            }
          },
          "tags": [
            "Testing"
          ]
        },
        "delete": {
          "operationId": "TestsController_deleteUser",
          "summary": "Delete DB user by email",
          "parameters": [
            {
              "name": "userEmail",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "204": {
              "description": "User was deleted"
            },
            "404": {
              "description": "User with this email is un exist"
            }
          },
          "tags": [
            "Testing"
          ]
        }
      },
      "/testing/db-users": {
        "get": {
          "operationId": "TestsController_getUsers",
          "summary": "Get DB users",
          "parameters": [
            {
              "name": "userEmail",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Get DB users"
            }
          },
          "tags": [
            "Testing"
          ]
        }
      },
      "/testing/activate-user/{userEmail}": {
        "put": {
          "operationId": "TestsController_activateUser",
          "summary": "Activate user's account",
          "parameters": [
            {
              "name": "userEmail",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "204": {
              "description": "User's account was activated"
            },
            "400": {
              "description": "User's account is already activated or un exist"
            }
          },
          "tags": [
            "Testing"
          ]
        }
      },
      "/testing/all-data": {
        "delete": {
          "operationId": "TestsController_deleteAllData",
          "summary": "Delete all data from DB",
          "parameters": [],
          "responses": {
            "204": {
              "description": "DB was cleared"
            }
          },
          "tags": [
            "Testing"
          ]
        }
      },
      "/avatar/{userName}": {
        "get": {
          "operationId": "AvatarController_getFile",
          "summary": "Get user's avatar",
          "parameters": [],
          "responses": {
            "200": {
              "description": "User's avatar was recieved"
            },
            "404": {
              "description": "User's avatar was not found"
            }
          },
          "tags": [
            "Profile"
          ]
        }
      },
      "/avatar/upload": {
        "post": {
          "operationId": "AvatarController_uploadAvatar",
          "summary": "User can upload avatar. User should have access token",
          "parameters": [],
          "responses": {
            "204": {
              "description": "User's avatar was upload"
            },
            "400": {
              "description": "Incorrect field(s) in request body",
              "content": {
                "application/json": {
                  "schema": {
                    "title": "APIResultError",
                    "type": "object",
                    "properties": {
                      "errorsMessages": {
                        "type": "array",
                        "items": {
                          "type": "object",
                          "properties": {
                            "message": {
                              "type": "string",
                              "description": "any error message",
                              "example": "Search photo"
                            },
                            "field": {
                              "type": "string",
                              "description": "it should be incorrect field from request body",
                              "example": "file"
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Check your cookie. Make sure that user is exist"
            }
          },
          "tags": [
            "Profile"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/avatar/delete": {
        "delete": {
          "operationId": "AvatarController_deleteAvatar",
          "summary": "User can delete avatar. User should have access token",
          "parameters": [],
          "responses": {
            "204": {
              "description": "User's avatar was deleted"
            },
            "401": {
              "description": "Check your cookie. Make sure that user is exist"
            }
          },
          "tags": [
            "Profile"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/post/createPost": {
        "post": {
          "operationId": "PostController_createPost",
          "summary": "User can add Post. User should have access token",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "title": "CreatePostInputModel",
                  "type": "object",
                  "properties": {
                    "content": {
                      "type": "string",
                      "example": "Hello! It is my first post $)",
                      "description": "it should be valid content",
                      "minLength": 4,
                      "maxLength": 500
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "User's post was created",
              "content": {
                "application/json": {
                  "schema": {
                    "title": "PostSchemaViewModel",
                    "type": "object",
                    "properties": {
                      "id": {
                        "type": "string",
                        "example": "1682051309599"
                      },
                      "content": {
                        "type": "string",
                        "example": "post's content"
                      },
                      "userId": {
                        "type": "string",
                        "example": "1682051375718"
                      },
                      "userName": {
                        "type": "string",
                        "example": "powerMan"
                      },
                      "createdAt": {
                        "type": "string",
                        "example": "2023-04-19T17:50:44.599Z"
                      },
                      "photo": {
                        "type": "array",
                        "items": {
                          "type": "string",
                          "example": "https://storage.yandexcloud.net/inctagram-backet/inctagram-backet/1681925863901/post/1681926398385/1post_.jpg`"
                        }
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Incorrect field(s) in request body",
              "content": {
                "application/json": {
                  "schema": {
                    "title": "APIResultError",
                    "type": "object",
                    "properties": {
                      "errorsMessages": {
                        "type": "array",
                        "items": {
                          "type": "object",
                          "properties": {
                            "message": {
                              "type": "string",
                              "description": "any error message",
                              "example": "incorrect content"
                            },
                            "field": {
                              "type": "string",
                              "description": "it should be incorrect field from request body",
                              "example": "content"
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Check your cookie. Make sure that user is exist"
            },
            "429": {
              "description": "More than 5 requests for 10 seconds"
            }
          },
          "tags": [
            "Posts"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/post/{id}": {
        "put": {
          "operationId": "PostController_updatePost",
          "summary": "User can edit own Post by id",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "title": "UpdatePostInputModel",
                  "type": "object",
                  "properties": {
                    "content": {
                      "type": "string",
                      "example": "Updated content",
                      "description": "it should be valid content",
                      "minLength": 4,
                      "maxLength": 500
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "204": {
              "description": "Post was updated"
            },
            "401": {
              "description": "Check your cookie. Make sure that user is exist. User can edit only own posts"
            },
            "404": {
              "description": "Post was not found"
            }
          },
          "tags": [
            "Posts"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "get": {
          "operationId": "PostController_getPostById",
          "summary": "User can get Post by id",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Post was recieved",
              "content": {
                "application/json": {
                  "schema": {
                    "title": "PostSchemaViewModel",
                    "type": "object",
                    "properties": {
                      "id": {
                        "type": "string",
                        "example": "1682051309599"
                      },
                      "content": {
                        "type": "string",
                        "example": "post's content"
                      },
                      "userId": {
                        "type": "string",
                        "example": "1682051375718"
                      },
                      "userName": {
                        "type": "string",
                        "example": "powerMan"
                      },
                      "createdAt": {
                        "type": "string",
                        "example": "2023-04-19T17:50:44.599Z"
                      },
                      "photo": {
                        "type": "array",
                        "items": {
                          "type": "string",
                          "example": "https://storage.yandexcloud.net/inctagram-backet/inctagram-backet/1681925863901/post/1681926398385/1post_.jpg`"
                        }
                      }
                    }
                  }
                }
              }
            },
            "404": {
              "description": "Post was not found"
            }
          },
          "tags": [
            "Posts"
          ]
        },
        "delete": {
          "operationId": "PostController_deletePost",
          "summary": "User can delete own Post by id",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "204": {
              "description": "Post was deleted"
            },
            "401": {
              "description": "Check your cookie. Make sure that user is exist. User can delete only own posts"
            },
            "404": {
              "description": "Post was not found"
            }
          },
          "tags": [
            "Posts"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/post/allPosts": {
        "get": {
          "operationId": "PostController_getPosts",
          "summary": "User can get all Posts",
          "parameters": [],
          "responses": {
            "200": {
              "description": "Posts was recieved",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "id": {
                          "type": "string",
                          "example": "1682051309599"
                        },
                        "content": {
                          "type": "string",
                          "example": "post's content"
                        },
                        "userName": {
                          "type": "string",
                          "example": "powerMan"
                        },
                        "userId": {
                          "type": "string",
                          "example": "1682051375718"
                        },
                        "createdAt": {
                          "type": "string",
                          "example": "2023-04-19T17:50:44.599Z"
                        },
                        "photo": {
                          "type": "array",
                          "items": {
                            "type": "string",
                            "example": "https://storage.yandexcloud.net/inctagram-backet/inctagram-backet/1681925863901/post/1681926398385/1post_.jpg`"
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "Posts"
          ]
        }
      }
    },
    "info": {
      "title": "Inctagram API",
      "description": "Powerfull team should use this api to develop the best Inctagramm app.\nBase URL is https://it-team2-backend-mirror.vercel.app",
      "version": "04_week",
      "contact": {}
    },
    "tags": [],
    "servers": [],
    "components": {
      "securitySchemes": {
        "bearer": {
          "scheme": "bearer",
          "bearerFormat": "JWT",
          "type": "http"
        },
        "cookie": {
          "type": "apiKey",
          "in": "cookie",
          "name": "refreshToken"
        }
      },
      "schemas": {}
    }
  },
  "customOptions": {}
};
  url = options.swaggerUrl || url
  let urls = options.swaggerUrls
  let customOptions = options.customOptions
  let spec1 = options.swaggerDoc
  let swaggerOptions = {
    spec: spec1,
    url: url,
    urls: urls,
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout"
  }
  for (let attrname in customOptions) {
    swaggerOptions[attrname] = customOptions[attrname];
  }
  let ui = SwaggerUIBundle(swaggerOptions)

  if (customOptions.initOAuth) {
    ui.initOAuth(customOptions.initOAuth)
  }

  if (customOptions.authAction) {
    ui.authActions.authorize(customOptions.authAction)
  }
  
  window.ui = ui
}
