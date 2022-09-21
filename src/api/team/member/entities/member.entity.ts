import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('teammembers')
export class Member {
    @PrimaryColumn({ type: 'bigint', nullable: false})
    id: number;

    @Column({ type: 'int', nullable: false })
    employee_id: number;

    @Column({ type: 'int', nullable: false })
    team_id: number;

    @Column({ type: 'tinyint', nullable: false })
    deactivated: number;
}
