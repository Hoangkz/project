import { applyDecorators, CanActivate, UseGuards } from '@nestjs/common';
import { WsGuard } from '../guards/ws.guard';

export function WsAuth(...guards: (CanActivate | Function)[]) {
  return applyDecorators(UseGuards(WsGuard, ...(guards || [])));
}
