import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoClient } from 'mongodb'; // 👈 Import MongoClient
import config from '../config';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigType<typeof config>) => {
        const { connection, user, password, host, port, name } =
          configService.database;
        return {
          uri: `${connection}://${host}:${port}`,
          user,
          pass: password,
          dbName: name,
        };
      },
      inject: [config.KEY],
    }),
  ],
  providers: [
    // {
    //   provide: 'API_KEY', ////remember add real keys to providers
    //   useValue: process.env.API_KEY,
    // },
  ],
  exports: [
    // 'API_KEY',
    //'Database',
    MongooseModule,
  ],
})
export class DatabaseModule {}
