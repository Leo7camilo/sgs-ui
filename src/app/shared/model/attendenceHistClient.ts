import { AttendenceResume } from "./attendenceResume";

export interface AttendenceHistClient {
  parenteAttendence: AttendenceResume;
  childAttendence: AttendenceResume[];
}
