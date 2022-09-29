export enum BalanceMSG {
    CREATE = 'createBalance',
    FIND_ALL = 'findAllBalance',
    FIND_ONE = 'findOneBalance',
    FIND_ONE_USER_ID = 'findOneUserIdBalance',
    UPDATE = 'updateBalance',
    UPDATE_USER_ID = 'updateUserIdBalance',
}

export enum BalanceTransactionMSG {
    CREATE = 'createBalanceTransaction',
    FIND_ALL = 'findAllBalanceTransaction',
    FIND_ALL_USER_ID = 'findAllUserIdBalanceTransaction',
    FIND_ONE = 'findOneBalanceTransaction',
}

export enum RequestMSG {
    CREATE = 'createRequest',
    CREATE_USER_ID = 'createUserIdRequest',
    FIND_ALL = 'findAllRequest',
    FIND_ALL_USER_ID = 'findAllUserIdRequest',
    FIND_REQUEST_YEAR_AND_MONTH = 'findRequestByYearAndMonth',
    FIND_REQUEST_DATE_RANGE = 'findRequestByDateRange',
    FIND_NUMBER_OF_REQUEST_YEAR_AND_MONTH = 'findNumberOfRequestByYearAndMonth',
    FIND_NUMBER_OF_REQUEST_DATE_RANGE = 'findNumberOfRequestByDateRange',
    FIND_ONE = 'findOneRequest',
}

export enum StatusMSG {
    FIND_ALL = 'findAllStatus',
    FIND_ONE = 'findOneStatus',
}

export enum TransctionMSG {
    CREATE = 'createTransaction',
    FIND_ALL = 'findAllTransaction',
    FIND_ALL_USER_ID = 'findAllUserIdTransaction',
    FIND_ALL_REQUEST_ID = 'findAllRequestIdTransaction',
    FIND_ONE = 'findOneTransaction',
}

export enum TransactionStatusMSG {
    FIND_ALL = 'findAllTransactionStatus',
    FIND_ONE = 'findOneTransactionStatus',
}

export enum TypeMSG {
    FIND_ALL = 'findAllType',
    FIND_ONE = 'findOneType',
}