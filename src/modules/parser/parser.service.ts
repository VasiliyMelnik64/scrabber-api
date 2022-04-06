import { Injectable, Query } from '@nestjs/common';
import { CheerioAPI, Cheerio, Element } from 'cheerio';

import { getCommonData } from '../../services/api/dataApi';
import Scrabber from '../../utils/Scrabber';

const searchSelector = '#maincontent .nhsuk-list li';

export interface IParserService {
  getData(): Promise<string | Buffer>;
  getScriber(data: string | Buffer): CheerioAPI;
  findData(data: string | Buffer): Promise<Cheerio<Element>>;
  parseData(data: string | Buffer, points, query: string): Promise<string[]>;
  highlightFoundValues(
    foundValues: string[],
    queryStringParamsArray: string[],
  ): string[];
}

@Injectable()
export class ParserService implements IParserService {
  async getData(): Promise<string | Buffer> {
    const data = await getCommonData();

    return data;
  }

  getScriber(data: string | Buffer): CheerioAPI {
    return new Scrabber().loadData(data);
  }

  async findData(data: string | Buffer): Promise<Cheerio<Element>> {
    const $ = this.getScriber(data);
    const container = $(searchSelector);
    const points = container.filter(
      (__i, item: Element): boolean => !$(item).attr('class'),
    );

    return points;
  }

  async parseData(
    data: string | Buffer,
    points,
    @Query() query,
  ): Promise<string[]> {
    const $ = this.getScriber(data);
    const { querySearch } = query;
    const values = querySearch.replace(/[, ]+/g, ' ').trim().split(' ');

    const foundValues = await Promise.all(
      points
        .map((__i, item: Element) => $(item).text().trim())
        .filter((__i, item) =>
          values.some((value) =>
            item.toLowerCase().includes(value.toLowerCase()),
          ),
        ),
    );

    return this.highlightFoundValues(foundValues, values);
  }

  highlightFoundValues(
    foundValues: string[],
    queryStringParamsArray: string[],
  ): string[] {
    const regexArray = queryStringParamsArray.map(
      (qsItem) => new RegExp(qsItem, 'ig'),
    );

    const higlightedValues = foundValues
      .map((value) =>
        regexArray
          .map((re, i) =>
            value.replace(re, `<mark>${queryStringParamsArray[i]}</mark>`),
          )
          .filter((re) => !value.match(re)),
      )
      .flat();

    return higlightedValues;
  }
}
