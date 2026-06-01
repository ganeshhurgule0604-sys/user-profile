import { IsNotEmpty, IsOptional } from "class-validator";

export class UserCreateDto{
    @IsNotEmpty()
    name!:string;

    @IsOptional()
    phone?:string;

    @IsOptional()
    profileImage?:string
}