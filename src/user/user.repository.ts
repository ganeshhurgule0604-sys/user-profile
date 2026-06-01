import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";

export class UserRepository{
    constructor(@InjectRepository(User) private readonly userRepo:Repository<User>){

    }
    
}