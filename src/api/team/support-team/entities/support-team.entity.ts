import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('support_teams')
export class SupportTeam {
  @PrimaryColumn({ type: 'int', nullable: false })
  id: number;
  
  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'tinyint', nullable: false })
  active: number;

  @Column({ type: 'varchar', nullable: false })
  ticket_placeholder: number;
}
