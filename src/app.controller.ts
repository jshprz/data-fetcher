import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { ShopifyStoreThemeCustomContent } from './entities/shopify-store-theme-custom-content.entity';
import { ApiQuery } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('getStoreThemeCustomContent')
  @ApiQuery({ name: 'store', required: true, type: String })
  @ApiQuery({ name: 'themeId', required: true, type: String })
  @ApiQuery({ name: 'key', required: true, type: String })
  async getStoreThemeCustomContent(
    @Query('store') store: string,
    @Query('themeId') themeId: string,
    @Query('key') key: string,
  ): Promise<ShopifyStoreThemeCustomContent> {
    return await this.appService.findBy(store, themeId, key);
  }
}
