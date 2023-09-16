import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({})
export class Model {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  size: string;
  @Column()
  type: string;
  @Column()
  title: string;
  @Column()
  version: number;
  @Column()
  preview: string;
  @Column()
  description: string;
  @Column({ unique: true })
  resourceId: string;
  @Column()
  layer: string;
}
