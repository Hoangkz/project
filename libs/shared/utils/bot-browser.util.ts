import { NotAcceptableException } from '@nestjs/common';
import { execFileSync } from 'child_process';
import { randomUUID } from 'crypto';
import * as fs from 'fs';
import * as jwt from 'jsonwebtoken';
import * as path from 'path';

export async function waitForTimer(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

export function getExpirationTime(token: string) {
  try {
    const decoded = jwt.decode(token);
    if (decoded && typeof decoded === 'object' && decoded.exp) {
      return decoded.exp;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Lỗi khi giải mã token:', error);
    return null;
  }
}

export function captchaResolve(base64Svg: string) {
  const fileName = randomUUID() + '.svg';
  const filePath = path.resolve(__dirname, fileName);
  const svg = Buffer.from(
    base64Svg.replace('data:image/svg+xml;base64,', ''),
    'base64',
  ).toString('utf-8');
  if (!svg.startsWith('<svg')) {
    throw new NotAcceptableException('Không chứa hình ảnh SVG');
  }
  fs.writeFileSync(filePath, svg, 'utf-8');
  const buffData = execFileSync('svg-captcha-solver.exe', [filePath]);
  console.log(buffData.toString('utf-8'));
  fs.unlinkSync(filePath);
  return buffData.toString('utf-8');
}
