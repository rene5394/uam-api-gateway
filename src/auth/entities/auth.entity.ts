import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('users')
export class Auth {
    @PrimaryColumn({ type: 'int', nullable: false })
    id: number;

    @Column({ type: 'varchar', nullable: false })
    firstname: string;

    @Column({ type: 'varchar', nullable: false })
    secondname: string;

    @Column({ type: 'varchar', nullable: false })
    lastname: string;

    @Column({ type: 'varchar', nullable: false })
    email: string;

    @Column({ type: 'varchar', nullable: false })
    password: string;

    @Column({ type: 'int', nullable: false })
    role_id: number;

    @Column({ type: 'tinyint', nullable: false })
    hr: number;

    @Column({ type: 'int', nullable: false })
    status_id: number;
}