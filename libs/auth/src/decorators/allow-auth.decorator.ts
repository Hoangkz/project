import { applyDecorators, CanActivate, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

export function AllowAuth(...guards: (CanActivate | Function)[]) {
  return applyDecorators(
    UseGuards(JwtAuthGuard, ...(guards || [])),
    ApiBearerAuth('x-token'),
  );
}
