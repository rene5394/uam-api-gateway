import {  Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('attendance_status')
export class Status {
    @PrimaryColumn({ type: 'smallint', nullable: false })
    id: number;

    @Column({ type: 'smallint', nullable: false })
    status: string;

    @Column({ type: 'tinyint', nullable: false })
    update_by: number;

    @Column({ type: 'smallint', nullable: false })
    category: string;

    @Column({ type: 'tinyint', nullable: false })
    active: number;
}
