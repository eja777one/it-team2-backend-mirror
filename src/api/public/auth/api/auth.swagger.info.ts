const resStatus429 = {
    status: 429,
    description: 'More than 5 requests for 10 seconds'
};

const badRequestSchema = {
    title: "APIResultError",
    type: 'object',
    properties: {
        messages: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    message: {
                        type: 'string',
                        description: 'any error message',
                        example: 'incorrect email'
                    },
                    field: {
                        type: 'string',
                        description: 'it should be incorrect field from request body',
                        example: 'email'
                    }
                }
            }
        }
    }
};

export const sw_regitstration = {
    summary: {summary: 'Registration for users'},
    status204: {
        status: 204,
        description: 'Account for user was created',
    },
    status400: {
        status: 400,
        description: 'Data from request are incorrect or unexist',
        schema: badRequestSchema
    },
    status429: resStatus429,
    inputSchema: {
        schema: {
            title: 'CreateUserInputModelType',
            type: 'object',
            properties: {
                email: {
                    type: 'string',
                    example: 'powerful@gmail.com',
                    description: 'it should be valid email',
                },
                password: {
                    type: 'string',
                    minLength: 6,
                    maxLength: 20,
                },
            },
        },
    },
};

export const sw_registrationEmailResending = {
    summary: {summary: "Send confirmation code to user's email"},
    status204: {
        status: 204,
        description: 'Email succesfully sent',
    },
    status400: {
        status: 400,
        description: "User's emaii is incorrect",
        schema: badRequestSchema
    },
    status429: resStatus429,
    inputSchema: {
        schema: {
            title: 'EmailInputModelType',
            type: 'object',
            properties: {
                email: {
                    type: 'string',
                    example: 'powerful@gmail.com',
                    description: 'it should be valid email',
                },
            },
        },
    },
};

export const sw_login = {
    summary: {summary: "User can login and do something into app"},
    status200: {
        status: 200,
        description: "Successfully login and get tokens"
    },
    status401: {
        status: 401,
        description: 'Email or password are incorrect'
    },
    status429: resStatus429,
    inputSchema: {
        schema: {
            title: 'LoginInputModelType',
            type: 'object',
            properties: {
                email: {
                    type: 'string',
                    example: 'powerful@gmail.com',
                    description: 'it should be valid email',
                },
                password: {
                    type: 'string',
                }
            }
        }
    }
}
