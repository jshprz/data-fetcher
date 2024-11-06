import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopifyStoreThemeCustomContent } from './entities/shopify-store-theme-custom-content.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'the-test-db.cyfmba7wz4ia.ap-southeast-2.rds.amazonaws.com',
      port: 5432,
      username: 'dev',
      password: 'convU3-nuhpob-xiwjez',
      database: 'dev_db',
      entities: [ShopifyStoreThemeCustomContent], // Ensure the entity is listed here
      synchronize: true,  // Only use in development
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