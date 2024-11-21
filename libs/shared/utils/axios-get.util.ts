import { HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import https from 'https';

export async function axiosGet(
  apiUrl: string,
  apiQuery: string,
  retryCount: number,
) {
  const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  });
  const requestUrl = `${apiUrl}${apiQuery}`;
  try {
    const response = await axios.get(requestUrl, {
      httpsAgent,
      timeout: 120000,
    });
    if (response.status !== 200) {
      throw new HttpException(
        'Lỗi kết quả trả về không lấy được dữ liệu',
        HttpStatus.BAD_REQUEST,
      );
    }
    return response.data;
  } catch (error) {
    if (retryCount > 0) {
      console.log(
        `Gặp lỗi khi gọi axios, đang thử lại. Số lần thử lại còn lại: ${retryCount}`,
      );
      return axiosGet(apiUrl, apiQuery, retryCount - 1);
    }
    throw new HttpException(
      'Lỗi axios lấy dữ liệu ' + error.toString(),
      HttpStatus.BAD_REQUEST,
    );
  }
}
