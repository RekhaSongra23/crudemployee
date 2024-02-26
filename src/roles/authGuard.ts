import { CanActivate, ExecutionContext, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtservice: JwtService) {}
  canActivate(context: ExecutionContext):boolean {
    const req = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(req);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = this.jwtservice.verify(token, {secret: `${process.env.JWT_SECRET}`,});
      req['user'] = payload;
    } catch {
      throw new NotFoundException();
    }
    return true;
    
  }
  async validate(payload: any) {
    const user = {
      id: payload.sub,
      username: payload.username,
      role: payload.role,
    };

    return user;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}

