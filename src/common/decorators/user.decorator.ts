import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const user = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    const request=ctx.switchToHttp().getRequest()

  return request.user
});