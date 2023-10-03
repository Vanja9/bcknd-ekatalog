import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "korisnik"})
export class User {
    @PrimaryGeneratedColumn({ name: 'korisnik_id', type: 'int', unsigned: true })
    userId: number;

    @Column({ type: 'varchar', length: '64', unique: true })
    username: string;

    @Column({ name: 'password_hash', type: 'varchar', length: '255' })
    passwordHash: string;

    @Column({ type: 'varchar', length: '64'})
    email: string;

    @Column({ name: 'is_admin', type: 'bool',})
    isAdmin: boolean;
}