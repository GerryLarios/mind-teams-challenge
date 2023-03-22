import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Profile from './profile.entity';
import Technology from './technology.entity';

@Entity()
export default class UserProfileTechnology {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  years: number;

  @ManyToOne(() => Profile, (profile) => profile.technologies)
  profile: Profile;

  @OneToOne(() => Technology)
  @JoinColumn()
  technology: Technology;
}
