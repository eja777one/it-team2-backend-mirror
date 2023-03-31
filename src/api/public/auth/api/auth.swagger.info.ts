export const sw_regitstration = {
    summary: { summary: 'Registration for users' },
    status204: {
        status: 204,
        description: 'Account for user was created',
    },
    status400: {
        status: 400,
        description: 'Data from request are incorrect or unexist',
    },
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
    summary: { summary: "send confirmation code to user's email" },
    status204: {
        status: 204,
        description: 'Email succesfully sent',
    },
    status400: {
        status: 400,
        description: "User's emaii is incorrect",
    },
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
