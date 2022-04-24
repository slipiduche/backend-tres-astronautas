import { Module, Global } from '@nestjs/common';

@Global()
@Module({
  providers: [
    // {
    //   provide: 'API_KEY', ////remember add real keys to providers
    //   useValue: process.env.API_KEY,
    // },
    {
      provide: 'Database',
      useFactory: async () => {},
    },
  ],
  exports: [
    // 'API_KEY',
    'Database',
  ],
})
export class DatabaseModule {}
