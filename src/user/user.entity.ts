import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User{
 
    @PrimaryGeneratedColumn()
    id!:number;


    @Column({length:255,nullable:false})
    name!:string;

    @Column({length:20,nullable:true})
    phone?:string;

    @Column({nullable:true,length:500})
    profileImage?:string;
}