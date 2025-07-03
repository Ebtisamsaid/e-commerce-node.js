import { v2  as cloudinary, UploadApiOptions}  from 'cloudinary';
import { Injectable } from "@nestjs/common";
export interface Iimage{
    secure_url:string;
    public_id:string
}
@Injectable()
export class CloudService{
constructor(){
    cloudinary.config({
        cloud_name:process.env.Cloud_name , 
        api_key:process.env.API_KEY, 
        api_secret:process.env.API_secret
    })
    
}


async uploadfile(file:Express.Multer.File,options?:UploadApiOptions){
 return   await cloudinary.uploader.upload(file.path,options)
}
async uploadfiles(files:Express.Multer.File[],options?:UploadApiOptions):Promise<Iimage[]|[]>{
    let image:Iimage[]=[]
    for (const file of files) {
      const{secure_url,public_id} = await cloudinary.uploader.upload(file.path,options)
      image.push({secure_url,public_id})

    }
    return image
}

async destoryfile(public_id:string):Promise<void>{
   return await cloudinary.uploader.destroy(public_id)
}
async destoryfileRes(path:string):Promise<void>{
  return  await cloudinary.api.delete_resources_by_prefix(path)
}
async destoryfolder(path:string):Promise<void>{
    this.destoryfile(path)
    return  await cloudinary.api.delete_folder(path)
  }

}