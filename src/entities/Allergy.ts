import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'Allergy' })
export class Allergy {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 255 })
  name!: string;

  @Column({ length: 255 })
  icon!: string;

  @Column('text')
  description!: string;
}
