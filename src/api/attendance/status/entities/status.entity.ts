import {  Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('attendance_status')
export class Status {
    @PrimaryColumn({ type: 'int', nullable: false })
    id: number;

    @Column({ type: 'varchar', nullable: false })
    status: string;

    @Column({ type: 'int', nullable: false })
    update_by: number;

    @Column({ type: 'varchar', nullable: false })
    category: string;

    @Column({ type: 'tinyint', nullable: false })
    active: number;
}
