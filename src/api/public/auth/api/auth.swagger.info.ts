<<<<<<< HEAD
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
=======
export const sw_regitstration = {
    summary: { summary: 'Registration for users' },
>>>>>>> 6ac763c (sd)
    status204: {
        status: 204,
        description: 'Account for user was created',
    },
    status400: {
        status: 400,
        description: 'Data from request are incorrect or unexist',
<<<<<<< HEAD
        schema: badRequestSchema
    },
    status429: resStatus429,
=======
    },
>>>>>>> 6ac763c (sd)
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
<<<<<<< HEAD
    summary: {summary: "Send confirmation code to user's email"},
=======
    summary: { summary: "send confirmation code to user's email" },
>>>>>>> 6ac763c (sd)
    status204: {
        status: 204,
        description: 'Email succesfully sent',
    },
    status400: {
        status: 400,
        description: "User's emaii is incorrect",
<<<<<<< HEAD
        schema: badRequestSchema
    },
    status429: resStatus429,
=======
    },
>>>>>>> 6ac763c (sd)
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
<<<<<<< HEAD

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
=======
>>>>>>> 6ac763c (sd)
