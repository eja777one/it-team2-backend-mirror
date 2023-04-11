const badRequestSchema = {
    title: 'APIResultError',
    type: 'object',
    properties: {
        errorsMessages: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    message: {
                        type: 'string',
                        description: 'any error message',
                        example: 'incorrect name',
                    },
                    field: {
                        type: 'string',
                        description: 'it should be incorrect field from request body',
                        example: 'name',
                    },
                },
            },
        },
    },
};

const profileSchema = {
    userName: {
        type: 'string',
        minLength: 4,
        maxLength: 30,
        example: 'Harley_Quinn',
        description: 'it should be valid userName',
    },
    name: {
        type: 'string',
        minLength: 4,
        maxLength: 20,
        example: 'Margo',
        description: 'it should be valid name',
    },
    surname: {
        type: 'string',
        minLength: 4,
        maxLength: 20,
        example: 'Robbie',
        description: 'it should be valid surname',
    },
    birthday: {
        type: 'string',
        maxLength: 20,
        example: '02.07.1990',
    },
    city: {
        type: 'string',
        maxLength: 20,
        example: 'Dalby',
    },
    aboutMe: {
        type: 'string',
        maxLength: 200,
        example: `Famous actress`,
    },
};

export const sw_addProfile = {
    summary: { summary: 'User can edit own profile. User should have access token' },
    inputSchema: {
        schema: {
            title: 'AddProfileInputModel',
            type: 'object',
            properties: profileSchema,
        },
    },
    status200: {
        status: 200,
        description: 'Profile was added to user',
    },
    status400: {
        status: 400,
        description: 'Incorrect field(s) in request body',
        schema: badRequestSchema,
    },
    status401: {
        status: 401,
        description: 'Check your cookie. Make sure that user is exist',
    },
};

export const sw_getProfile = {
    summary: { summary: 'User can get own profile. User should have access token' },
    status200: {
        status: 200,
        description: 'Profile was sent to user',
        schema: {
            title: 'AddProfileInputModel',
            type: 'object',
            properties: profileSchema,
        },
    },
    status401: {
        status: 401,
        description: 'Check your cookie. Make sure that user is exist',
    },
    status404: {
        status: 404,
        description: "User's profile was not found",
    },
};
