export enum RabbitMQ {
  // Team Queues
  TeamUserQueue = 'teamUser',
  TeamTeamQueue = 'teamTeam',
  TeamMemberQueue = 'teamMember',
  // TimeOff Queues
  TimeOffBalanceQueue = 'timeoffBalance',
  TimeOffBalanceTransactionQueue = 'timeoffBalanceTransaction',
  TimeOffRequestQueue = 'timeoffRequest',
  TimeOffStatusQueue = 'timeoffStatus',
  TimeOffTransactionQueue = 'timeoffTransaction',
  timeoffTransactionStatusQueue = 'timeoffTransactionStatus',
  TimeOffTypeQueue = 'timeoffType',
  // Attendance Queues
  AttendanceEntryQueue = 'attendanceEntry',
  AttendanceStatusQueue = 'attendanceStatus'
}
