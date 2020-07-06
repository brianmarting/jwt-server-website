import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Language {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'text', name: 'external_id', unique: true, nullable: false})
    externalId: string;

    @Column({type: 'text', nullable: false})
    name: string;

    @Column({type: 'text', nullable: false})
    summary: string;

    @Column({type: 'text', nullable: false})
    description: string;
}
