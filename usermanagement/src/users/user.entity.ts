import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'BE' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ default: 'SINHQ', name: 'ofc_cd' })
  ofc_cd: string;

  @Column({ default: 'VN', name: 'cntr_cd' })
  cntr_cd: string;

  @UpdateDateColumn({ default: () => 'NOW()', name: 'upd_dt' })
  @Column({ default: true, name: 'upd_dt' })
  upd_dt: Date;

  @Column({ default: 'admin', name: 'upd_usr' })
  upd_usr: string;

  @Column({ default: 'user', name: 'role' })
  role: string;
}
