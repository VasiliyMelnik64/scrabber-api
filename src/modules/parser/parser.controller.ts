import { Controller, Get, Query } from '@nestjs/common';
import { ParserService } from './parser.service';
import { ApplicationError } from '../../utils/Errors';

interface IParserController {
  getData(query: string): Promise<string[]>;
}

@Controller()
export class ParserController implements IParserController {
  constructor(private readonly parserService: ParserService) {}

  @Get('/data')
  async getData(@Query() query): Promise<string[]> {
    try {
      const data = await this.parserService.getData();
      const points = await this.parserService.findData(data);
      const parsedData = await this.parserService.parseData(
        data,
        points,
        query,
      );

      return parsedData;
    } catch (e) {
      throw ApplicationError.getServerError();
    }
  }
}
