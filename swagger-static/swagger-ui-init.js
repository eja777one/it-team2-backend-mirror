
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
                      "messages": {
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
                      "messages": {
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
              "description": "Successfully login and get tokens"
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
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
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
          "parameters": [],
          "responses": {
            "204": {
              "description": ""
            }
          },
          "tags": [
            "Auth"
          ]
        }
      },
      "/auth/password-recovery-code": {
        "post": {
          "operationId": "AuthController_passwordRecoveryCode",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/PasswordRecoveryInputModelType"
                }
              }
            }
          },
          "responses": {
            "204": {
              "description": ""
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
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/PasswordInputModelType"
                }
              }
            }
          },
          "responses": {
            "204": {
              "description": ""
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
          "parameters": [],
          "responses": {
            "204": {
              "description": ""
            }
          },
          "tags": [
            "Auth"
          ]
        }
      }
    },
    "info": {
      "title": "Inctagram API",
      "description": "Powerfull team should use this api to develop the best Inctagramm app",
      "version": "02_week",
      "contact": {}
    },
    "tags": [
      {
        "name": "API",
        "description": ""
      }
    ],
    "servers": [],
    "components": {
      "schemas": {
        "PasswordRecoveryInputModelType": {
          "type": "object",
          "properties": {}
        },
        "PasswordInputModelType": {
          "type": "object",
          "properties": {}
        }
      }
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
