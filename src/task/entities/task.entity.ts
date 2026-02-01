import { User } from "../../users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TaskStatus } from "../task.types";


@Entity('tasks')
export class Task {
    @PrimaryGeneratedColumn()
    id : number;

    @Column({length:100})
    title : string;

    @Column('text')
    description : string;

    @Column({nullable:true})
    attachementUrl : string;

    @Column({type:'enum', enum: TaskStatus, default: TaskStatus.TODO})
    status : TaskStatus.TODO;

    @Column('text',{nullable:true})
    comments : string;

    //relation
    @ManyToOne(()=>User,(user)=>user.tasks,{onDelete:'CASCADE',nullable:false})
    @JoinColumn({ name: 'user_id' })
    user : User;

    @CreateDateColumn()
    createdAt : Date;

    @UpdateDateColumn()
    updatedAt : Date;
}
