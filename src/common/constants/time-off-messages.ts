export enum BalanceMSG {
    CREATE = 'createBalance',
    FIND_ALL = 'findAllBalance',
    FIND_ONE = 'findOneBalance',
    FIND_ONE_USER_ID = 'findOneUserIdBalance',
    UPDATE = 'updateBalance',
}

export enum BalanceTransactionMSG {
    CREATE = 'createBalanceTransaction',
    FIND_ALL = 'findAllBalanceTransaction',
    FIND_ALL_USER_ID = 'findAllUserIdBalanceTransaction',
    FIND_ONE = 'findOneBalanceTransaction',
}

export enum TypeMSG {
    FIND_ALL = 'findType',
    FIND_ONE = 'findOneType',
}