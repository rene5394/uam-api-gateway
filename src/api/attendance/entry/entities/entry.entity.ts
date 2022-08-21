import {  Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('attendance')
export class Entry {
    @PrimaryColumn({ type: 'int', nullable: false })
    id: number;

    @Column({ type: 'int', nullable: false })
    employee_id: number;

    @Column({ type: 'int', nullable: false })
    team_id: number;

    @Column({ type: 'datetime', nullable: false })
    date: Date;

    @Column({ type: 'varchar', nullable: false })
    comment: string;

    @Column({ type: 'int', nullable: false })
    user_id: number;

    @Column({ type: 'int', nullable: false })
    attendance_status: number;

    @Column({ type: 'int', nullable: false })
    days: number;

    @Column({ type: 'int', nullable: false })
    update_by: number;

    @Column({ type: 'datetime', nullable: false })
    created_at: Date;

    @Column({ type: 'datetime', nullable: false })
    updated_at: Date;

    @Column({ type: 'tinyint', nullable: false })
    paid: number;
}
