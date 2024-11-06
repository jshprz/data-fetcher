import { Injectable } from '@nestjs/common';
import { ShopifyStoreThemeCustomContent } from './entities/shopify-store-theme-custom-content.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AppService {
  @InjectRepository(ShopifyStoreThemeCustomContent)
  private readonly shopifyStoreThemeCustomContentRepository: Repository<ShopifyStoreThemeCustomContent>;

  findBy(store: string, themeId: string, key: string): Promise<ShopifyStoreThemeCustomContent> {
    return this.shopifyStoreThemeCustomContentRepository.findOne(
      { 
        where: {
          store,
          themeId,
          key 
        } 
      });
  }
}
