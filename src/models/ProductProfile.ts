import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('product_profiles')
class ProductProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  aroma: string;

  @Column()
  quantity_ml: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default ProductProfile;
