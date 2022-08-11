import {  Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('balances')
export class Balance {
    @PrimaryColumn({ type: 'smallint', nullable: false })
    id: number;

    @Column({ type: 'smallint', nullable: false })
    user_id: number;

    @Column({ type: 'tinyint', nullable: false })
    comp_days: number;

    @Column({ type: 'tinyint', nullable: false })
    vacation_days: number;
}
