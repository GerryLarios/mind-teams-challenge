import { LenguageLevel } from '../types';

export class CreateProfileDto {
  resume: string;
  lenguageLevel: LenguageLevel;
  technologies: Array<{ id: string; name: string; years: number }>;
}
