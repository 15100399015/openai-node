import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from "typeorm";

@Entity({})
export class Texture {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ext: string;
  @Column()
  type: string;
  @Column()
  title: string;
  @Column()
  description: string;
  @Column({ unique: true })
  resourceId: string;
  @Column()
  layer: string;
}
