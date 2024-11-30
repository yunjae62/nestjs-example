import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: any): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    if (request.cookies['login']) {
      return true;
    }

    if (!request.body.email || !request.body.password) {
      return false;
    }

    const user = await this.authService.validateUser(
      request.body.email,
      request.body.password,
    );

    if (!user) {
      return false;
    }

    request.user = user;
    return true;
  }
}

@Injectable()
// AuthGuard : passport 제공 가드 - local 스트레티지 실행(id+pw)
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: any): Promise<boolean> {
    const result = (await super.canActivate(context)) as boolean;
    const request = context.switchToHttp().getRequest();
    await super.logIn(request);
    return result;
  }
}

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    return request.isAuthenticated(); // 세션에서 정보 읽어 인증 체크
  }
}
