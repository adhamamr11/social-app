
import { Model, MongooseBaseQueryOptions, MongooseUpdateQueryOptions, ProjectionType, QueryOptions, RootFilterQuery, UpdateQuery } from "mongoose";

export abstract class AbstractRepo<T>{
    constructor(protected model:Model<T>){}

    async create(item:Partial<T>){
        const doc = new this.model(item);
        doc["isNew"] = true;
        return await doc.save();
    }

    async exist(filter:RootFilterQuery<T>,projection?: ProjectionType<T>,options?:QueryOptions){
        return await this.model.findOne(filter,projection,options)
    }

    async find(filter:RootFilterQuery<T>,projection?: ProjectionType<T>,options?:QueryOptions){
        return await this.model.findOne(filter,projection,options)
    }

    async update(filter:RootFilterQuery<T>,update: UpdateQuery<Partial<T>>,options?: MongooseUpdateQueryOptions<T>){
        return await this.model.updateOne(filter,update,options)
    }

    async delete(filter:RootFilterQuery<T>,options?:MongooseBaseQueryOptions){
        return await this.model.deleteOne(filter,options)
    }

    async findAndUpdate(filter:RootFilterQuery<T>,update: UpdateQuery<Partial<T>>,options?: QueryOptions<T>) {
        return await this.model.findOneAndUpdate (filter,update,options);        
    }
}