import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("uq_username", ["username"], { unique: true })
@Entity("korisnik", { schema: "vol_ekatalog" })
export class Korisnik {
  @PrimaryGeneratedColumn({ type: "int", name: "korisnik_id", unsigned: true })
  korisnikId: number;

  @Column("varchar", { name: "username", unique: true, length: 64 })
  username: string;

  @Column("varchar", { name: "password_hash", length: 255 })
  passwordHash: string;

  @Column("varchar", { name: "email", length: 64, default: '' })
  email: string;

  @Column("tinyint", { name: "is_admin", width: 1, default: () => "'0'" })
  isAdmin: boolean;
}
