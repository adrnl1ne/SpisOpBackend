import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './User';
import { Company } from './Company';
import { Community } from './Community';
import { Allergy } from './Allergy';

@Entity({ name: 'FoodPost' })
export class FoodPost {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 255 })
  image?: string;

  @Column({ length: 255 })
  title!: string;

  @Column('text')
  description!: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price!: number

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  lastUpdated!: Date;

  @ManyToOne(() => User, (user) => user.foodPosts, { nullable: true })
  authorUser!: User;

  @ManyToOne(() => Company, (company) => company.foodPosts, { nullable: true })
  authorCompany?: Company;

  @ManyToOne(() => Community, (community) => community.foodPosts, { nullable: true })
  community?: Community;

  @ManyToMany(() => Allergy)
  @JoinTable({
    name: 'FoodPost_Allergy',
    joinColumn: { name: 'postId' },
    inverseJoinColumn: { name: 'allergyId' },
  })
  allergies?: Allergy[];

  constructor(title: string, description: string, price: number) {
    this.setTitle(title);
    this.setDescription(description);
    this.setPrice(price);
    this.createdAt = new Date();
  }

  setTitle(title: string): void {
    if (!title || title.trim() === '') {
      throw new Error('Title cannot be empty');
    }
    if ([...title].length > 50) {
      throw new Error('Title cannot be longer than 50 characters');
    }
    this.title = title;
  }

  setDescription(description: string): void {
    if (!description || description.trim() === '') {
      this.description = '';
    } else {
      if ([...description].length > 255) {
        throw new Error('Description cannot be longer than 255 characters');
      }
      this.description = description;
    }
  }

  setPrice(price: number): void {
    this.price = price;
  }

  addAllergy(allergy: Allergy): void {
    if (!this.allergies) {
      this.allergies = [];
    }
    this.allergies.push(allergy);
  }

  updateFoodPost(foodPostDetails: FoodPost): void {
    this.id = foodPostDetails.id;
    this.image = foodPostDetails.image;
    this.title = foodPostDetails.title;
    this.description = foodPostDetails.description;
    this.price = foodPostDetails.price;
    this.authorUser = foodPostDetails.authorUser;
    this.authorCompany = foodPostDetails.authorCompany;
    this.community = foodPostDetails.community;
    this.allergies = foodPostDetails.allergies;
    this.lastUpdated = new Date();
  }
}
