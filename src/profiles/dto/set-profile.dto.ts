import { LenguageLevel } from '../types';

export default class CreateProfileDto {
  resume: string;
  lenguageLevel: LenguageLevel;
  technologies: Array<{ id: string; years: number }>;
}
