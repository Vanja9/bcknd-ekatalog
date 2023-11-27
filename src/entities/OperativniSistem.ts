import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Artikl } from "./Artikl";

@Entity("operativni_sistem", { schema: "vol_ekatalog" })
export class OperativniSistem {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "operativni_sistem_id",
    unsigned: true,
  })
  operativniSistemId: number;

  @Column("varchar", { name: "naziv", length: 64 })
  naziv: string;

  @OneToMany(() => Artikl, (artikl) => artikl.operativniSistem)
  artikls: Artikl[];
}
