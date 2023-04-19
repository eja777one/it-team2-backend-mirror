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
        return this.postModel.create(newPost);
    }

    async getAllPosts() {
        return this.postModel.find({}).sort({createdAt: -1});
    }

    async getPostById(id: string) {
        const post = await this.postModel.findOne({_id: new ObjectId(id)});
        return post;
    }

    async deletePost(postId: string) {
        return await this.postModel.deleteOne({_id: new ObjectId(postId)});
    }
}
