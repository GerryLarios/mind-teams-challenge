import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Technology {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
}
