export const defaultNumbers = ' hai ba bốn năm sáu bảy tám chín';

export const chuHangDonVi = ('1 một' + defaultNumbers).split(' ');
export const chuHangChuc = ('lẻ mười' + defaultNumbers).split(' ');
export const chuHangTram = ('không một' + defaultNumbers).split(' ');
export const dvBlock = '1 nghìn triệu tỷ'.split(' ');

export function convertBlockThree(number) {
  if (number == '000') return '';
  const _a = number + ''; //Convert biến 'number' thành kiểu string

  //Kiểm tra độ dài của khối
  switch (_a.length) {
    case 0:
      return '';
    case 1:
      return chuHangDonVi[_a];
    case 2:
      return convertBlockTwo(_a);
    case 3:
      let chuc_dv = '';
      if (_a.slice(1, 3) != '00') {
        chuc_dv = convertBlockTwo(_a.slice(1, 3));
      }
      const tram = chuHangTram[_a[0]] + ' trăm';
      return tram + ' ' + chuc_dv;
  }
}

export function convertBlockTwo(number) {
  let dv = chuHangDonVi[number[1]];
  const chuc = chuHangChuc[number[0]];
  let append = '';

  // Nếu chữ số hàng đơn vị là 5
  if (number[0] > 0 && number[1] == 5) {
    dv = 'lăm';
  }

  // Nếu số hàng chục lớn hơn 1
  if (number[0] > 1) {
    append = ' mươi';

    if (number[1] == 1) {
      dv = ' mốt';
    }
  }

  return chuc + '' + append + ' ' + dv;
}

export function toVietnamese(number) {
  const str = parseInt(number) + '';
  let i = 0;
  const arr = [];
  let index = str.length;
  const result = [];
  let rsString = '';

  if (index == 0 || str == 'NaN') {
    return '';
  }

  // Chia chuỗi số thành một mảng từng khối có 3 chữ số
  while (index >= 0) {
    arr.push(str.substring(index, Math.max(index - 3, 0)));
    index -= 3;
  }

  // Lặp từng khối trong mảng trên và convert từng khối đấy ra chữ Việt Nam
  for (i = arr.length - 1; i >= 0; i--) {
    if (arr[i] != '' && arr[i] != '000') {
      result.push(convertBlockThree(arr[i]));

      // Thêm đuôi của mỗi khối
      if (dvBlock[i]) {
        result.push(dvBlock[i]);
      }
    }
  }

  // Join mảng kết quả lại thành chuỗi string
  rsString = result.join(' ');

  // Trả về kết quả kèm xóa những ký tự thừa
  const resultString = rsString
    .replace(/[0-9]/g, '')
    .replace(/ /g, ' ')
    .replace(/ $/, '');
  return resultString.charAt(0).toUpperCase() + resultString.slice(1);
}

export function colNumberToName(colNumber) {
  let columnName = '';
  while (colNumber > 0) {
    let remainder = colNumber % 26;
    if (remainder === 0) {
      columnName = 'Z' + columnName;
      colNumber = Math.floor(colNumber / 26) - 1;
    } else {
      columnName = String.fromCharCode(64 + remainder) + columnName;
      colNumber = Math.floor(colNumber / 26);
    }
  }
  return columnName;
}
