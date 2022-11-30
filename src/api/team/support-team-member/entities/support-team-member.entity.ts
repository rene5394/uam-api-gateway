import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('support_teammembers')
export class SupportTeamMember {
    @PrimaryColumn({ type: 'int', nullable: false})
    id: number;

    @Column({ type: 'int', nullable: false })
    employee_id: number;

    @Column({ type: 'int', nullable: false })
    support_team_id: number;

    @Column({ type: 'tinyint', nullable: false })
    active: number;

    @Column({ type: 'varchar', nullable: false })
    nickname: number;
}
