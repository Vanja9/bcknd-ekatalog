import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Artikl } from "./Artikl";

@Entity("t_standard", { schema: "vol_ekatalog" })
export class TStandard {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "t_standard_id",
    unsigned: true,
  })
  tStandardId: number;

  @Column("varchar", { name: "naziv", length: 64 })
  naziv: string;

  @OneToMany(() => Artikl, (artikl) => artikl.tStandard_2)
  artikls: Artikl[];
}
