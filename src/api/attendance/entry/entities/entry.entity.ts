import {  Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('attendance')
export class Entry {
    @PrimaryColumn({ type: 'smallint', nullable: false })
    id: number;

    @Column({ type: 'smallint', nullable: false })
    employee_id: number;

    @Column({ type: 'smallint', nullable: false })
    team_id: number;

    @Column({ type: 'smallint', nullable: false })
    date: number;

    @Column({ type: 'smallint', nullable: false })
    comment: number;

    @Column({ type: 'smallint', nullable: false })
    user_id: number;

    @Column({ type: 'smallint', nullable: false })
    attendance_status: number;

    @Column({ type: 'tinyint', nullable: false })
    days: number;

    @Column({ type: 'tinyint', nullable: false })
    update_by: number;

    @Column({ type: 'tinyint', nullable: false })
    created_at: number;

    @Column({ type: 'tinyint', nullable: false })
    updated_at: number;

    @Column({ type: 'tinyint', nullable: false })
    paid: number;
}
