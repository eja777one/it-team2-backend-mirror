import { Injectable } from '@nestjs/common';

import { PostRepository } from '../infrastructure/post.repository';

@Injectable()
export class PostQueryService {
    constructor(private postRepository: PostRepository) {}

    async getAllPosts() {
        return await this.postRepository.getAllPosts();
    }

    async getPostById(id: string) {
        return await this.postRepository.getPostById(id);
    }
}
