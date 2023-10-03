import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { OperativniSistem } from "./OperativniSistem";
import { Telefon } from "./Telefon";
import { TStandard } from "./TStandard";

@Index("fk_artikl_telefon", ["telefonId"], {})
@Index("fk_operativni_sistem_artikl", ["operativniSistemId"], {})
@Index("fk_t_standard_artikl", ["tStandardId"], {})
@Entity("artikl", { schema: "vol_ekatalog" })
export class Artikl {
  @PrimaryGeneratedColumn({ type: "int", name: "artikl_id", unsigned: true })
  artiklId: number;

  @Column("int", { name: "telefon_id", unsigned: true })
  telefonId: number;

  @Column("int", { name: "operativni_sistem_id", unsigned: true })
  operativniSistemId: number;

  @Column("int", { name: "t_standard_id", unsigned: true })
  tStandardId: number;

  @Column("varchar", { name: "memorija", length: 64 })
  memorija: string;

  @Column("varchar", { name: "ram_memorija", length: 64 })
  ramMemorija: string;

  @Column("varchar", { name: "baterija", nullable: true, length: 64 })
  baterija: string | null;

  @Column("varchar", { name: "velicina_dijagonale", length: 64 })
  velicinaDijagonale: string;

  @Column("varchar", { name: "t_standard", length: 64 })
  tStandard: string;

  @Column("text", { name: "opis", nullable: true })
  opis: string | null;

  @Column("varchar", { name: "cena", length: 64 })
  cena: string;

  @ManyToOne(
    () => OperativniSistem,
    (operativniSistem) => operativniSistem.artikls,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([
    {
      name: "operativni_sistem_id",
      referencedColumnName: "operativniSistemId",
    },
  ])
  operativniSistem: OperativniSistem;

  @ManyToOne(() => Telefon, (telefon) => telefon.artikls, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "telefon_id", referencedColumnName: "telefonId" }])
  telefon: Telefon;

  @ManyToOne(() => TStandard, (tStandard) => tStandard.artikls, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "t_standard_id", referencedColumnName: "tStandardId" }])
  tStandard_2: TStandard;
}
