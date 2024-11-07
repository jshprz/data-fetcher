import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopifyStoreThemeCustomContent } from './entities/shopify-store-theme-custom-content.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'the-test-db.c3caug6qsry2.ap-southeast-1.rds.amazonaws.com',
      port: 5432,
      username: 'dev',
      password: 'convU3-nuhpob-xiwjez',
      database: 'dev_db',
      entities: [ShopifyStoreThemeCustomContent],
      synchronize: false,
      ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
    }),
    TypeOrmModule.forFeature([ShopifyStoreThemeCustomContent]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}