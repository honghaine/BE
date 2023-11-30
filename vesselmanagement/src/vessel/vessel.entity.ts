import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity({name: 'vsl_skd'})
export class Vessel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'vsl_cd'})
    vsl_cd: string;

    @Column({name: 'vsl_eng_nm'})
    vsl_eng_nm: string;

    @Column({name: 'crr_cd'})
    crr_cd: string;

    @Column({name: 'crr_nm'})
    crr_nm: string;

    @Column({name: 'net_ton'})
    net_ton: number;

    @Column({name: 'gross_ton'})
    gross_ton: number;

    @Column({name: 'imo'})
    imo: string;

    @Column({name: 'feeder_div'})
    feeder_div: string;
}