import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import UserProfileTechnology from './user-profile-technology.entity';

enum LenguageLevel {
  C1 = 'C1',
  C2 = 'C2',
  B2 = 'B2',
  B1 = 'B1',
  A2 = 'A2',
  A1 = 'A1',
}

@Entity()
export default class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  resume: string;

  @Column({ type: 'enum', enum: LenguageLevel, nullable: true })
  lenguageLevel: LenguageLevel;

  @OneToMany(() => UserProfileTechnology, (technology) => technology.profile)
  technologies: UserProfileTechnology[];

  @CreateDateColumn({
    default: () => 'CURRENT_TIMESTAMP(6)',
    type: 'timestamp',
  })
  createdAt: Date;

  @UpdateDateColumn({
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
    type: 'timestamp',
  })
  updatedAt: Date;
}
