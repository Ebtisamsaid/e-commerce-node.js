import { FilterQuery, Model, PopulateOptions, RootFilterQuery, UpdateQuery, UpdateResult, UpdateWriteOpResult } from "mongoose";
import { Ipaginate } from "src/common/dto/query.filter.dto";

export abstract class DatabaseService<tdocument>{
    constructor(private readonly model:Model<tdocument>){}
  async  create(data:Partial<tdocument>):Promise<tdocument|null>{
        return await this.model.create(data)
    }

    async  find({filter,populate,select,sort,page=1}:
      {filter?:FilterQuery<tdocument>,
      populate?:PopulateOptions[],
      select?:string,
      sort?:string,
      page?:number}
    ):Promise<tdocument[]|Ipaginate<tdocument>>{

      let query=  await this.model.find(filter||{ })
      
      if(populate){
      return this.model.find(filter||{}).populate(populate)
       
      }
                  
                  
      if(sort){
        sort=sort.replaceAll(","," ")
    
      return  this.model.find(filter||{ }).sort(sort)
              }

              if(select){
               select=select.replaceAll(","," ")
             return  this.model.find(filter||{ }).select(select)
              
              
              
                      }

                      if(page){
                         page=page
                        const limit=10
                        const skip=(page-1)*limit
                        const items= await this.model.countDocuments(filter || {})
                        const pages=Math.ceil(items/limit)
                         const data=await this.model.find(filter ||{}).skip(skip).limit(limit).exec()
                         const itemsperPage=data.length
                         return{
                                itemsperPage,
                                items,
                                pages,
                                data,
                                currentPage:page



                         }
                              }
                   return  this.model.find(filter ||{}).exec()
      
     }


     async  findOne(filter?:FilterQuery<tdocument>,populate?:PopulateOptions[]
     ):Promise<tdocument|null>{
         return  await this.model.findOne(filter ||{}).populate(populate || [])
         }

        

         async update(filter:FilterQuery<tdocument>,updatedata:UpdateQuery<tdocument>):Promise<tdocument | null>{
            return await this.model.findOneAndUpdate(filter,updatedata,{new:true,runValidators:true})
         }
        async updateOne(filter:FilterQuery<tdocument>,updatedata:UpdateQuery<tdocument>):Promise<UpdateWriteOpResult>{
           return await this.model.updateOne(filter,updatedata)
        }
         async delete(filter:FilterQuery<tdocument>):Promise<boolean>{
            const result=  await this.model.deleteOne(filter)
            return result.deletedCount > 0
           
         }

           async  deleteMany(filter:RootFilterQuery<tdocument>){
                    return await this.model.deleteMany(filter)
             
                 }
 }


 
