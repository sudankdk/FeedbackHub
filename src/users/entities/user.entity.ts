import { Column, Entity, PrimaryColumn } from "typeorm";
import { PrimaryGeneratedColumn } from "typeorm/browser";
import { UserRoles } from "../user.types";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id:number;
    @Column({length:100, unique:true})
    username :string;
    @Column()
    password:string;
    @Column({ default: UserRoles.USER,enum: UserRoles,type: 'enum' })
    role:string;
}