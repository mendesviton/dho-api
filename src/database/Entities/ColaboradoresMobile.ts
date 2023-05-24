import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ColaboradorRegistroPonto } from "./ColaboradoresRegistroPonto";

@Entity("colaboradores_mobile")
export class ColaboradorMobile implements IColaboradorMobile {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  colaborador_id!: number;
  @Column({
    length: 150,
    nullable: false,
  })
  image_profile?: string;
  @Column({
    default: true,
    nullable: false,
  })
  first_time?: boolean;
  @Column({
    length: 150,
    nullable: false,
  })
  password!: string;

  nome_empresa?: string;

  @OneToMany(
    () => ColaboradorRegistroPonto,
    (registroPonto) => registroPonto.colaborador_id
  )
  registro_ponto!: ColaboradorRegistroPonto[];
}
