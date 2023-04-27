export const errorSchemaFactory = (message: string, field: string) => {
    return {
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
                            example: message,
                        },
                        field: {
                            type: 'string',
                            description: 'it should be incorrect field from request body',
                            example: field,
                        },
                    },
                },
            },
        },
    };
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
    summary: { summary: 'User can add profile. User should have access token' },
    inputSchema: {
        schema: {
            title: 'AddProfileInputModel',
            type: 'object',
            properties: profileSchema,
        },
    },
    status204: {
        status: 204,
        description: 'Profile was added to user',
    },
    status400: {
        status: 400,
        description: 'Incorrect field(s) in request body',
        schema: errorSchemaFactory('incorrect name', 'name'),
    },
    status401: {
        status: 401,
        description: 'Check your cookie. Make sure that user is exist',
    },
};

export const sw_getProfile = {
    summary: { summary: 'User can get own profile' },
    status200: {
        status: 200,
        description: 'Profile was sent to user',
        schema: {
            title: 'ProfileViewModel',
            type: 'object',
            properties: {
                _id: {
                    type: 'string',
                    example: '643a7e839d20aa10bbd2ffb9',
                },
                profileInfo: {
                    type: 'object',
                    properties: profileSchema,
                },
            },
        },
    },
    status404: {
        status: 404,
        description: "User's profile was not found",
    },
};

export const sw_updateProfile = {
    summary: { summary: 'User can edit own profile. User should have access token' },
    inputSchema: {
        schema: {
            title: 'UpdateProfileInputModel',
            type: 'object',
            properties: profileSchema,
        },
    },
    status200: {
        status: 200,
        description: 'Profile was updated',
    },
    status400: {
        status: 400,
        description: 'Incorrect field(s) in request body',
        schema: errorSchemaFactory('incorrect name', 'name'),
    },
    status401: {
        status: 401,
        description: 'Check your cookie. Make sure that user is exist',
    },
};

export const sw_getFile = {
    summary: { summary: "Get user's avatar" },
    status200: {
        status: 200,
        description: "User's avatar was recieved",
    },
    status404: {
        status: 404,
        description: "User's avatar was not found",
    },
};

export const sw_uploadAvatar = {
    summary: { summary: 'User can upload avatar. User should have access token' },
    status204: {
        status: 204,
        description: "User's avatar was upload",
    },
    status400: {
        status: 400,
        description: 'Incorrect field(s) in request body',
        schema: errorSchemaFactory('Search photo', 'file'),
    },
    status401: {
        status: 401,
        description: 'Check your cookie. Make sure that user is exist',
    },
};

export const sw_deleteAvatar = {
    summary: { summary: 'User can delete avatar. User should have access token' },
    status204: {
        status: 204,
        description: "User's avatar was deleted",
    },
    status401: {
        status: 401,
        description: 'Check your cookie. Make sure that user is exist',
    },
};
