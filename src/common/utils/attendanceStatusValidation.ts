import { AttendanceStatus } from "../enums/attendanceStatus.enum";
import { RequestType } from "../enums/requestType.enum";

export function timeOffTypeToAttendanceStatus(type: number): number {
  if (type === RequestType.compDay) {
    return AttendanceStatus.compDay;
  } if (type === RequestType.vacation) {
    return AttendanceStatus.vacation;
  } if (type === RequestType.licenciaExtraordinaria) {
    return AttendanceStatus.lE;
  } if (type === RequestType.medicalLeave) {
    return AttendanceStatus.aJ;
  } if (type === RequestType.permisoSinGoce) {
    return AttendanceStatus.pSG;
  }
}