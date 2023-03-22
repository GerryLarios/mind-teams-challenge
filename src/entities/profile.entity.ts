import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import UserProfileTechnology from './user-profile-technology.entity';
import { LenguageLevel } from 'src/profiles/types';
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
