import { Entity, Column, CreateDateColumn, UpdateDateColumn, Unique, PrimaryGeneratedColumn } from 'typeorm';

@Entity('shopify_store_theme_custom_content')
@Unique(['key'])
export class ShopifyStoreThemeCustomContent {
  @PrimaryGeneratedColumn()
  id: string;

  @Column('text')
  store: string;

  @Column('text')
  themeId: string;

  @Column('text')
  key: string;

  @Column('text')
  value: string;

  @CreateDateColumn({ type: 'timestamp', precision: 3, default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', precision: 3, default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}