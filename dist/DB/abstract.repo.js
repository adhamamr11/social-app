"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractRepo = void 0;
class AbstractRepo {
    model;
    constructor(model) {
        this.model = model;
    }
    async create(item) {
        const doc = new this.model(item);
        doc["isNew"] = true;
        return await doc.save();
    }
    async exist(filter, projection, options) {
        return await this.model.findOne(filter, projection, options);
    }
    async find(filter, projection, options) {
        return await this.model.findOne(filter, projection, options);
    }
    async update(filter, update, options) {
        return await this.model.updateOne(filter, update, options);
    }
    async delete(filter, options) {
        return await this.model.deleteOne(filter, options);
    }
}
exports.AbstractRepo = AbstractRepo;
