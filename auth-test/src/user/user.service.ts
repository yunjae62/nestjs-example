import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createUser(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  async getUser(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }

  async updateUser(email: string, _user: User) {
    const user: User = await this.getUser(email);
    user.username = _user.username;
    user.password = _user.password;
    this.userRepository.save(user);
  }

  deleteUser(email: string) {
    return this.userRepository.delete({ email });
  }
}
