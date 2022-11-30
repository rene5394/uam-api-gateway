export enum EmployeeMSG {
  FIND_ALL = 'findAllEmployee',
  FIND_ONE = 'findOneEmployee',
  FIND_ONE_USER_ID = 'findOneEmployeeUserId'
}

export enum MemberMSG {
  FIND_ALL = 'findAllMember',
  FIND_ALL_TEAM_ID = 'findAllMemberTeamId',
  FIND_ONE = 'findOneMember'
}

export enum TeamMSG {
  FIND_ALL = 'findAllTeam',
  FIND_ONE = 'findOneTeam',
  FIND_ONE_USER_ID = 'findOneTeamUserid',
  FIND_ONE_BY_COACH_USER_ID = 'findOneTeamCoachUserid'
}

export enum SupportTeamMSG {
  FIND_ALL = 'findAllSupportTeam',
  FIND_ONE = 'findOneSupportTeam',
}

export enum SupportTeamMemberMSG {
  FIND_ALL = 'findAllSupportTeamMember',
  FIND_ALL_SUPPORT_TEAM_ID = 'findAllSupportTeamMemberSupportTeamId',
  FIND_ONE = 'findOneSupportTeamMember',
}

export enum UserMSG {
  FIND_ALL =  'findAllUser',
  FIND_ALL_EMPLOYEES = 'findAllUserEmployee',
  FIND_ALL_EMPLOYEES_HIRE_DATE = 'findAllUserEmployeeHireDate',
  FIND_ALL_EMPLOYEES_SEMESTER_HIRE_DATE = 'findAllUserEmployeeSemesterHireDate',
  FIND_ALL_EMPLOYEES_TEAM_ID = 'findAllUserEmployeeTeamId',
  FIND_ALL_TEAM_EMPLOYEES_USER_ID = 'findAllTeamUserEmployeeUserId',
  FIND_ONE = 'findOneUser',
  FIND_ONE_EMPLOYEE_ID = 'findOneUserEmployeeId'
}
