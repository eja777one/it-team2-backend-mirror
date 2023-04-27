import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from '../application/entities/post.schema';

const postsAndUsersLookup = {
    from: 'users',
    localField: 'userId',
    foreignField: 'accountData.id',
    pipeline: [{ $project: { _id: 0, 'profileInfo.userName': 1 } }],
    as: 'userName',
};

const postsProjection = {
    _id: 0,
    id: 1,
    content: 1,
    userId: 1,
    userName: {
        $arrayElemAt: ['$userName.profileInfo.userName', 0],
    },
    createdAt: 1,
    photo: 1,
};

@Injectable()
export class PostRepository {
    constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

    async createPost(newPost: { id: string; userId: string; content: string }) {
        const post = await this.postModel.create(newPost);
        return post.id;
    }

    async updatePost(id: string, content: string) {
        const updatedPost = await this.postModel.updateOne({ id }, { $set: { content } });
        return updatedPost.matchedCount === 1;
    }

    async getAllPosts() {
        const posts = await this.postModel.aggregate([{ $lookup: postsAndUsersLookup }, { $sort: { createdAt: -1 } }, { $project: postsProjection }]);
        return posts;
    }

    async getPostById(id: string) {
        const post = await this.postModel.aggregate([{ $match: { id } }, { $lookup: postsAndUsersLookup }, { $project: postsProjection }]);
        return post ? post[0] : null;
    }

    async deletePost(postId: string) {
        return await this.postModel.deleteOne({ id: postId });
    }
}
