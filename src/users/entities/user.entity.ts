import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { PrimaryGeneratedColumn } from "typeorm";
import { UserRoles } from "../user.types";
import { Task } from "src/task/entities/task.entity";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id:number;
    @Column({length:100, unique:true})
    username :string;
    @Column()
    password:string;
    @Column({length:100, unique:true})
    email:string;
    @Column({ default: UserRoles.USER,enum: UserRoles,type: 'enum' })
    role:string;

    //relations

    @OneToMany(()=> Task,(task)=>task.user)
    tasks: Task[]
}