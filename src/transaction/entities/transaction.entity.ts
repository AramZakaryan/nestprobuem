import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { User } from '../../user/entities/user.entity'
import { Category } from '../../category/entities/category.entity'

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn({ name: 'transaction_id' })
  id: number
  @Column({ nullable: true })
  type: string // income / expense / null
  @Column()
  title: string
  @Column()
  amount: number
  @Column()
  user_id: string
  @ManyToOne(() => User, (user) => user.transactions)
  @JoinColumn({ name: 'user_id' })
  user: User
  @Column()
  category_id: number
  @ManyToOne(() => Category, (category) => category.transactions)
  @JoinColumn({ name: 'category_id' })
  category: Category
  @CreateDateColumn()
  created_at: Date
  @UpdateDateColumn()
  updated_at: Date
}
