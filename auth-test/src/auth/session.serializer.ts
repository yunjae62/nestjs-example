import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UserService } from '../user/user.service';

type DoneCallback = (err: Error, payload: any) => void;

@Injectable()
// 아래의 2개 말고도 getPassportInstance를 제공하지만 사용하지 않음
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly userService: UserService) {
    super();
  }

  // 세션에 정보를 저장
  serializeUser(user: any, done: DoneCallback): any {
    done(null, user.email); // 유저 식별에 사용할 최소한의 정보인 이메일 사용
  }

  // 세션에서 가져온 정보로 유저 정보를 반환
  async deserializeUser(payload: any, done: DoneCallback): Promise<any> {
    const user = await this.userService.getUser(payload);

    if (!user) {
      done(new Error('No User'), null);
      return;
    }

    const { password, ...userInfo } = user;

    done(null, userInfo);
  }
}
