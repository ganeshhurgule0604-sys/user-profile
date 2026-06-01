import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserCreateDto } from './user.dto';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('user')
export class UserController {
    
    @Post()
    @UseInterceptors(FileInterceptor('file',
        {
            storage:diskStorage({
                destination:'./public',
                filename:(req,file,                                                                                                                                                                                                                                                        cb)=>{
                    const uniqueName =Date.now()+'-'+Math.round(Math.random()*1e9);
                    cb(null,uniqueName+ extname(file.originalname))
                }
            })
        }
    ))
    createUser(@Body() dto:UserCreateDto, @UploadedFile() file:Express.Multer.File){
        return{

        }
    }
}
