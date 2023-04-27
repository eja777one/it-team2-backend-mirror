import { Injectable, NotFoundException } from '@nestjs/common';

import { PostRepository } from '../infrastructure/post.repository';

@Injectable()
export class PostQueryService {
    constructor(private postRepository: PostRepository) {}

    async getAllPosts() {
        return await this.postRepository.getAllPosts();
    }

    async getPostById(id: string) {
        const post = await this.postRepository.getPostById(id);
        if (!post) throw new NotFoundException();
        return post;
    }
}
