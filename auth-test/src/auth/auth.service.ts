import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/user.dto';
import * as bcrypt from 'bcrypt';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async register(userDto: CreateUserDto): Promise<User> {
    const user = await this.userService.getUser(userDto.email);
    if (user) {
      throw new HttpException(
        '해당 유저가 이미 있습니다.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const encryptedPassword = bcrypt.hashSync(userDto.password, 10);

    try {
      const user = await this.userService.createUser({
        ...userDto,
        password: encryptedPassword,
      });

      user.password = undefined;
      return user;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new HttpException('서버 에러', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.getUser(email);

    if (!user) {
      return null;
    }

    const { password: hashedPassword, ...userInfo } = user;

    if (bcrypt.compareSync(password, hashedPassword)) {
      return userInfo;
    }

    return null;
  }
}
