import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Category } from '../../category/entities/category.entity'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number
  @Column()
  email: string
  @Column()
  password: string
  @OneToMany(() => Category, (category) => category.user, { onDelete: 'CASCADE' })
  categories: Category[]
  @CreateDateColumn()
  created_at: Date
  @UpdateDateColumn()
  updated_at: Date
}
