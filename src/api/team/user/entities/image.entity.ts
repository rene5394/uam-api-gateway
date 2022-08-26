import {  Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('image')
export class Image {
  @PrimaryColumn({ type: 'int', nullable: false })
    id: number;

    @Column({ type: 'blob', nullable: false })
    image: string;
}
