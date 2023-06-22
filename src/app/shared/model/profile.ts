import { Queue } from './queue';
import { Company } from "./companie";

export class Profile {
  profileId: string;
  description: string;
  dtChange: string;
  status: string;
  queues: Queue[];
  company: Company;
}
