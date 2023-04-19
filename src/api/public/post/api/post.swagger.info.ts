import {errorSchemaFactory} from "../../profile/api/profile.swagger.info";
import {resStatus429} from "../../auth/api/auth.swagger.info";


export const sw_createPost = {
    summary: {summary: 'User can add Post. User should have access token'},
    status200: {
        status: 200,
        description: "User's post was created",
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
                    maxLength: 30,
                }
            },
        },
    },
};

export const sw_getPosts = {
    summary: {summary: 'User can get all Posts'},
    status200: {
        status: 200,
        description: "Posts was recieved",
    },
};

export const sw_getPostById = {
    summary: {summary: 'User can get Post by id'},
    status200: {
        status: 200,
        description: "Post was recieved",
    },
    status404: {
        status: 404,
        description: "Post was not found",
    },
};

export const sw_deletePost = {
    summary: {summary: 'User can delete own Post by id'},
    status204: {
        status: 204,
        description: "Post was deleted",
    },
    status401: {
        status: 401,
        description: 'Check your cookie. Make sure that user is exist. User can delete only own posts',
    },
    status404: {
        status: 404,
        description: "Post was not found",
    },
}