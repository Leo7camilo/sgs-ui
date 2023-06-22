import { Client } from "./client";
import { Company } from "./companie";
import { Queue } from "./queue";
import { Terminal } from "./terminal";

export class Attendence {
  attendenceId: string;
  password: number;
  queue: Queue;
  client: Client;
  dtCreated: string;
  dtUpdated: string;
  status: string;
  company: Company;
  terimnal: Terminal;
}
