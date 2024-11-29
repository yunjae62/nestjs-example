import { PostDto } from './blog.model';
import { BlogFileRepository } from './blog.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BlogService {
  constructor(private blogRepository: BlogFileRepository) {}

  getAllPosts() {
    return this.blogRepository.getAllPost();
  }

  createPost(postDto: PostDto) {
    return this.blogRepository.createPost(postDto);
  }

  getPost(id: string) {
    return this.blogRepository.getPost(id);
  }

  deletePost(id: string) {
    return this.blogRepository.deletePost(id);
  }

  updatePost(id: string, postDto: PostDto) {
    return this.blogRepository.updatePost(id, postDto);
  }
}
