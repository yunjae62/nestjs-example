import { readFile, writeFile } from 'fs/promises';
import { PostDto } from './blog.model';
import { Injectable } from '@nestjs/common';

export interface BlogRepository {
  getAllPost(): Promise<PostDto[]>;
  createPost(postDto: PostDto): Promise<void>;
  getPost(id: string): Promise<PostDto>;
  updatePost(id: string, postDto: PostDto): Promise<void>;
  deletePost(id: string): Promise<void>;
}

@Injectable()
export class BlogFileRepository implements BlogRepository {
  FILE_NAME = './src/blog.data.json';

  async getAllPost(): Promise<PostDto[]> {
    const file = await readFile(this.FILE_NAME, 'utf-8');
    const posts = JSON.parse(file);
    return posts;
  }

  async createPost(postDto: PostDto): Promise<void> {
    const posts = await this.getAllPost();
    const id = posts.length + 1;
    const createPost = { id: id.toString(), ...postDto, createdAt: new Date() };
    posts.push(createPost);
    await writeFile(this.FILE_NAME, JSON.stringify(posts));
  }

  async getPost(id: string): Promise<PostDto> {
    const posts = await this.getAllPost();
    const post = posts.find((post) => post.id === id);
    return post;
  }

  async updatePost(id: string, postDto: PostDto): Promise<void> {
    const posts = await this.getAllPost();
    const updateIndex = posts.findIndex((post) => post.id === id);
    posts[updateIndex] = { id, ...postDto, updatedAt: new Date() };
    await writeFile(this.FILE_NAME, JSON.stringify(posts));
  }

  async deletePost(id: string): Promise<void> {
    const posts = await this.getAllPost();
    const filteredPosts = posts.filter((post) => post.id !== id);
    await writeFile(this.FILE_NAME, JSON.stringify(filteredPosts));
  }
}
