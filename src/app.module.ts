import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ParserModule } from './modules/parser/parser.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `${process.env.NODE_ENV}.env` }),
    ParserModule,
  ],
})
export class AppModule {}
