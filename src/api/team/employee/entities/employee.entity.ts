import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('employees')
export class Employee {
    @PrimaryColumn({ type: 'bigint', nullable: false})
    id: number;

    @Column({ type: 'int', nullable: false })
    user_id: number;

    @Column({ type: 'varchar', nullable: false })
    hours: string;

    @Column({ type: 'varchar', nullable: false })
    skills: string;

    @Column({ type: 'varchar', nullable: false })
    position: string;

    @Column({ type: 'tinyint', nullable: false })
    custom_vertical: number;

    @Column({ type: 'tinyint', nullable: false })
    vertical_level_id: number;

    @Column({ type: 'tinyint', nullable: false })
    vertical_position_id: number;

    @Column({ type: 'varchar', nullable: false })
    dui: string;
}
