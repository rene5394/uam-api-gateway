import {  Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('balanceTransaction')
export class BalanceTransaction {
    @PrimaryColumn({ type: 'bigint', nullable: false })
    id: number;

    @Column({ type: 'smallint', nullable: false })
    balanceId: number;

    @Column({ type: 'tinyint', nullable: false })
    typeId: number;

    @Column({ type: 'tinyint', nullable: false })
    operation: number;

    @Column({ type: 'tinyint', nullable: false })
    amount: number;

    @Column({ type: 'smallint', nullable: false })
    updateBy: number;

    @Column({ type: 'datetime' })
    createdAt: Date;

    @Column({ type: 'datetime' })
    updatedAt: Date;
}
