import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BlogService } from './blog.service';

@Controller('blog')
export class BlogController {
  constructor(private blogService: BlogService) {}

  @Get()
  async getAllPosts() {
    return await this.blogService.getAllPosts();
  }

  @Get('/:id')
  async getPostById(@Param('id') id: string) {
    return await this.blogService.getPost(id);
  }

  @Post()
  async createPost(@Body() body: any) {
    return await this.blogService.createPost(body);
  }

  @Put('/:id')
  async updatePost(@Param('id') id: string, @Body() body: any) {
    return await this.blogService.updatePost(id, body);
  }

  @Delete('/:id')
  async deletePost(@Param('id') id: string) {
    return await this.blogService.deletePost(id);
  }
}
