export enum EmployeeMSG {
  FIND_ALL = 'findAllEmployee',
  FIND_ONE = 'findOneEmployee'
}

export enum MemberMSG {
  FIND_ALL = 'findAllMember',
  FIND_ALL_TEAM_ID = 'findAllTeamId',
  FIND_ONE = 'findOneMember'
}

export enum TeamMSG {
  FIND_ALL = 'findAllTeam',
  FIND_ONE = 'findOneTeam',
  FIND_ONE_USER_ID = 'findOneTeamUserid'
}

export enum UserMSG {
  FIND_ALL =  'findAllUser',
  FIND_ALL_EMPLOYEES = 'findAllUserEmployee',
  FIND_ALL_EMPLOYEES_TEAM_ID = 'findAllUserEmployeeTeamId',
  FIND_ALL_TEAM_EMPLOYEES_USER_ID = 'findAllTeamUserEmployeeUserId',
  FIND_ONE = 'findOneUser'
}
