import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {Post, PostDocument} from '../application/entities/post.schema';
import {ObjectId} from 'bson';

@Injectable()
export class PostRepository {
    constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {
    }

    async createPost(newPost: { id: string; userId: string; content: string }) {
        const post = await this.postModel.create(newPost);
        return post._id;
    }

    async getAllPosts() {
        return this.postModel.find({}, {id: 0, userId: 0, __v: 0}).sort({createdAt: -1});
    }

    async getPostById(id: string) {
        const post = await this.postModel.findOne({_id: new ObjectId(id)}, {id: 0, userId: 0, __v: 0});
        return post;
    }

    async deletePost(postId: string) {
        return await this.postModel.deleteOne({_id: new ObjectId(postId)});
    }
}
