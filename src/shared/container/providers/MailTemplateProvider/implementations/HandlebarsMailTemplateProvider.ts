import { compile } from 'handlebars';
import { readFile } from 'fs/promises';
import IMailTemplateProvider from '../models/IMailTemplateProvider';
import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';

export default class HandlebarsMailTemplateProvider
  implements IMailTemplateProvider {
  public async parse({
    file,
    variables,
  }: IParseMailTemplateDTO): Promise<string> {
    const templateFileContent = await readFile(file, {
      encoding: 'utf-8',
    });
    const parsedTemplate = compile(templateFileContent);
    return parsedTemplate(variables);
  }
}
