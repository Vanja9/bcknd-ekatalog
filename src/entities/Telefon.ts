import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Artikl } from "./Artikl";
import { Proizvodjac } from "./Proizvodjac";

@Index("fk_proizvodjac_telefon", ["proizvodjacId"], {})
@Entity("telefon", { schema: "vol_ekatalog" })
export class Telefon {
  @PrimaryGeneratedColumn({ type: "int", name: "telefon_id", unsigned: true })
  telefonId: number;

  @Column("int", { name: "proizvodjac_id", unsigned: true })
  proizvodjacId: number;

  @Column("varchar", { name: "model", length: 64 })
  model: string;

  @Column("year", { name: "godina_proizvodnje" })
  godinaProizvodnje: number;

  @OneToMany(() => Artikl, (artikl) => artikl.telefon)
  artikls: Artikl[];

  @ManyToOne(() => Proizvodjac, (proizvodjac) => proizvodjac.telefons, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([
    { name: "proizvodjac_id", referencedColumnName: "proizvodjacId" },
  ])
  proizvodjac: Proizvodjac;
}
