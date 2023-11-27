import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Artikl } from "./Artikl";

@Index("fk_artikl_photo", ["artiklId"], {})
@Index("image_path", ["imagePath"], { unique: true })
@Entity("photo", { schema: "vol_ekatalog" })
export class Photo {
  @PrimaryGeneratedColumn({ type: "int", name: "photo_id", unsigned: true })
  photoId: number;

  @Column("int", { name: "artikl_id", unsigned: true, default: () => "'0'" })
  artiklId: number;

  @Column("varchar", {
    name: "image_path",
    unique: true,
    length: 128,
    default: () => "'0'",
  })
  imagePath: string;

  @ManyToOne(() => Artikl, (artikl) => artikl.photos, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "artikl_id", referencedColumnName: "artiklId" }])
  artikl: Artikl;
}
