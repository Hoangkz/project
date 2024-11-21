import contentDisposition from "content-disposition";
import DocxMerger from 'docx-merger';
import Docxtemplater from "docxtemplater";
import * as fs from "fs";
import path from "path";
import PizZip from "pizzip";

export function deleteLocalDirectory(dirPath: string) {
	const files = fs.readdirSync(dirPath);
	while (files.length === 0) {
		const fpath = files.shift();
		if (fs.statSync(fpath).isDirectory()) {
			this.deleteLocalDirectory(fpath);
			fs.rmdirSync(fpath);
		} else {
			fs.unlinkSync(fpath);
		}
	}
}

export function addFileNameSuffix(fileName: string, suffix:string){
	let name = fileName.substring(0, fileName.lastIndexOf('.')-1 )
	let ext = fileName.substring(fileName.lastIndexOf('.'))
	return name + suffix + ext
}

export function renameFileToIndex(fileName:string, index:number){
	let name = fileName.substring(0, fileName.lastIndexOf('.')-1 )
	let ext = fileName.substring(fileName.lastIndexOf('.'))
	if(/^(.*)(\([0-9]+\))$/.test(name)){
		return name.substring(0, name.indexOf('(')-1) + `(${index})${ext}`
	} else {
		return name + `(${index})${ext}`
	}
}

export async function createFileDocx(
    pathFile: string,
    fileName: string,
    data: any,
    outputFile: string,
  ) {
    const content = fs.readFileSync(path.resolve(pathFile, fileName), 'binary');
    const files = data.map((item, index) => {
      const zip = new PizZip(content);

      const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
      });

      doc.render(item);

      const buf = doc.getZip().generate({
        type: 'nodebuffer',
        compression: 'DEFLATE',
      });

      const output = `output${index}.docx`;
      fs.writeFileSync(path.resolve(pathFile, output), buf);
      const fileItem = fs.readFileSync(
        path.resolve(pathFile, output),
        'binary',
      );
      return fileItem;
    });
    const merger = new DocxMerger({}, files);
    merger.save('nodebuffer', function (data) {
      fs.writeFileSync(path.resolve(pathFile, outputFile), data);
    });
    data.forEach((_, index) => {
      fs.unlinkSync(pathFile + `/output${index}.docx`);
    });
  }

  export async function downloadFileDocx(pathFile: string, res: Response, outputFile: string) {
    try {
      const filePath = path.resolve(pathFile, outputFile);
      (res as any).set({
        'Content-Length': fs.statSync(filePath).size,
        'Content-Type': 'docx',
        'Content-Disposition': contentDisposition(outputFile),
      });
      fs.createReadStream(filePath).pipe(res as any);
      setTimeout(() => {
        fs.unlinkSync(pathFile + `/${outputFile}`);
      }, 10000);
    } catch (err: any) {
      console.log(err);
    }
  }
