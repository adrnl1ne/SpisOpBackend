import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'Address' })
export class Address {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 255 })
  streetName!: string;

  @Column()
  postalCode!: number;

  @Column({ length: 255 })
  city!: string;

  @Column({ length: 50 })
  houseNumber!: string;

  @Column({ length: 10 })
  countryCode!: string;

  @Column({ length: 255 })
  country!: string;
}
