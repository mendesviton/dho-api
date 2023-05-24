import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { ColaboradorMobile } from "./ColaboradoresMobile";

@Entity("colaboradores_registros_ponto")
export class ColaboradorRegistroPonto {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(
    () => ColaboradorMobile,
    (colaborador) => colaborador.registro_ponto
  )
  @JoinColumn({ name: "colaborador_id" })
  colaborador_id!: ColaboradorMobile;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  data_hora!: Date;

  @Column({ type: "enum", enum: ["entrada", "saida"] })
  tipo!: "entrada" | "saida";
  @Column({
    length: 300,
    nullable: false,
  })
  image_point?: string;
}
