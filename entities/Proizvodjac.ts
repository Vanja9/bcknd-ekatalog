import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Telefon } from "./Telefon";

@Entity("proizvodjac", { schema: "vol_ekatalog" })
export class Proizvodjac {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "proizvodjac_id",
    unsigned: true,
  })
  proizvodjacId: number;

  @Column("varchar", { name: "naziv", length: 64 })
  naziv: string;

  @OneToMany(() => Telefon, (telefon) => telefon.proizvodjac)
  telefons: Telefon[];
}
