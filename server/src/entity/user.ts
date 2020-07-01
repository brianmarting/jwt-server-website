import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'text', name: 'external_id', unique: true, nullable: false})
    externalId: string;

    @Column({type: 'text', unique: true, nullable: false})
    username: string;

    @Column({type: 'text'})
    password: string;

    @Column({type: 'int', default: 0})
    tokenVersion: number;
}
