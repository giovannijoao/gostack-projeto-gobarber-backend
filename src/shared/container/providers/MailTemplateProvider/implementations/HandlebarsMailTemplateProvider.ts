import { compile } from 'handlebars';
import IMailTemplateProvider from '../models/IMailTemplateProvider';

import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';

export default class HandlebarsMailTemplateProvider
  implements IMailTemplateProvider {
  public async parse({
    template,
    variables,
  }: IParseMailTemplateDTO): Promise<string> {
    const parsedTemplate = compile(template);
    return parsedTemplate(variables);
  }
}
