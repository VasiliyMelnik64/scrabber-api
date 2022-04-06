import cheerio, { CheerioAPI } from 'cheerio';

export type LoadedDataType = CheerioAPI;

interface IScrabber {
  loadData(data: string | Buffer): CheerioAPI;
}

class Scrabber implements IScrabber {
  loadData(data: string | Buffer): CheerioAPI {
    return cheerio.load(data);
  }
}

export default Scrabber;
