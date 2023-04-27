import { errorSchemaFactory } from '../../profile/api/profile.swagger.info';
import { resStatus429 } from '../../auth/api/auth.swagger.info';

const PostSchemaViewModel = {
    title: 'PostSchemaViewModel',
    type: 'object',
    properties: {
        id: {
            type: 'string',
            example: '1682051309599',
        },
        content: {
            type: 'string',
            example: "post's content",
        },
        userId: {
            type: 'string',
            example: '1682051375718',
        },
        userName: {
            type: 'string',
            example: 'powerMan',
        },
        createdAt: {
            type: 'string',
            example: '2023-04-19T17:50:44.599Z',
        },
        photo: {
            type: 'array',
            items: {
                type: 'string',
                example: 'https://storage.yandexcloud.net/inctagram-backet/inctagram-backet/1681925863901/post/1681926398385/1post_.jpg`',
            },
        },
    },
};

const PostsSchemaViewModel = {
    type: 'array',
    items: {
        type: 'object',
        properties: {
            id: {
                type: 'string',
                example: '1682051309599',
            },
            content: {
                type: 'string',
                example: "post's content",
            },
            userName: {
                type: 'string',
                example: 'powerMan',
            },
            userId: {
                type: 'string',
                example: '1682051375718',
            },
            createdAt: {
                type: 'string',
                example: '2023-04-19T17:50:44.599Z',
            },
            photo: {
                type: 'array',
                items: {
                    type: 'string',
                    example: 'https://storage.yandexcloud.net/inctagram-backet/inctagram-backet/1681925863901/post/1681926398385/1post_.jpg`',
                },
            },
        },
    },
};

export const sw_createPost = {
    summary: { summary: 'User can add Post. User should have access token' },
    status200: {
        status: 200,
        description: "User's post was created",
        schema: PostSchemaViewModel,
    },
    status400: {
        status: 400,
        description: 'Incorrect field(s) in request body',
        schema: errorSchemaFactory('incorrect content', 'content'),
    },
    status401: {
        status: 401,
        description: 'Check your cookie. Make sure that user is exist',
    },
    status429: resStatus429,
    inputSchema: {
        schema: {
            title: 'CreatePostInputModel',
            type: 'object',
            properties: {
                content: {
                    type: 'string',
                    example: 'Hello! It is my first post $)',
                    description: 'it should be valid content',
                    minLength: 4,
                    maxLength: 500,
                },
            },
        },
    },
};

export const sw_getPosts = {
    summary: { summary: 'User can get all Posts' },
    status200: {
        status: 200,
        description: 'Posts was recieved',
        schema: PostsSchemaViewModel,
    },
};

export const sw_getPostById = {
    summary: { summary: 'User can get Post by id' },
    status200: {
        status: 200,
        description: 'Post was recieved',
        schema: PostSchemaViewModel,
    },
    status404: {
        status: 404,
        description: 'Post was not found',
    },
};

export const sw_deletePost = {
    summary: { summary: 'User can delete own Post by id' },
    status204: {
        status: 204,
        description: 'Post was deleted',
    },
    status401: {
        status: 401,
        description: 'Check your cookie. Make sure that user is exist. User can delete only own posts',
    },
    status404: {
        status: 404,
        description: 'Post was not found',
    },
};

export const sw_updatePost = {
    summary: { summary: 'User can edit own Post by id' },
    status204: {
        status: 204,
        description: 'Post was updated',
    },
    status401: {
        status: 401,
        description: 'Check your cookie. Make sure that user is exist. User can edit only own posts',
    },
    status400: {
        status: 400,
        description: 'Incorrect field(s) in request body',
        schema: errorSchemaFactory('incorrect content', 'content'),
    },
    status404: {
        status: 404,
        description: 'Post was not found',
    },
    inputSchema: {
        schema: {
            title: 'UpdatePostInputModel',
            type: 'object',
            properties: {
                content: {
                    type: 'string',
                    example: 'Updated content',
                    description: 'it should be valid content',
                    minLength: 4,
                    maxLength: 500,
                },
            },
        },
    },
};
