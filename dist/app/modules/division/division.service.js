"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DivisionService = void 0;
const cloudinary_config_1 = require("../../config/cloudinary.config");
const QueryBuilder_1 = require("../../utils/QueryBuilder");
const division_constant_1 = require("./division.constant");
const division_model_1 = require("./division.model");
const createDivision = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingDivision = yield division_model_1.Division.findOne({ name: payload.name });
    if (existingDivision) {
        throw new Error("A division with this name already exists.");
    }
    //   const baseSlug = payload.name.toLowerCase().split(" ").join("-");
    //   let slug = `${baseSlug}-division`;
    //   let counter = 0;
    //   while (await Division.exists({ slug })) {
    //     slug = `${slug}-${counter++}`;
    //   }
    //   payload.slug = slug;
    const division = yield division_model_1.Division.create(payload);
    return division;
});
// get all division
const getAllDivisions = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const queryBuilder = new QueryBuilder_1.QueryBuilder(division_model_1.Division.find(), query);
    const divisionsData = queryBuilder
        .search(division_constant_1.divisionSearchableFields)
        .filter()
        .sort()
        .fields()
        .paginate();
    const [data, meta] = yield Promise.all([
        divisionsData.build(),
        queryBuilder.getMeta(),
    ]);
    return {
        data,
        meta,
    };
});
// get single division
const getSingleDivision = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    const division = yield division_model_1.Division.findOne({ slug });
    return {
        data: division,
    };
});
// update division
const updateDivision = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingDivision = yield division_model_1.Division.findById(id);
    if (!existingDivision) {
        throw new Error("Division not found.");
    }
    const duplicateDivision = yield division_model_1.Division.findOne({
        name: payload.name,
        _id: { $ne: id },
    });
    if (duplicateDivision) {
        throw new Error("A division with this name already exists.");
    }
    //   if (payload.name) {
    //       const baseSlug = payload.name.toLowerCase().split(" ").join("-")
    //       let slug = `${baseSlug}-division`
    //       let counter = 0;
    //       while (await Division.exists({ slug })) {
    //           slug = `${slug}-${counter++}` // dhaka-division-2
    //       }
    //       payload.slug = slug
    //   }
    const updatedDivision = yield division_model_1.Division.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    // if(payload.thumbnail && existingDivision.thumbnail){
    //   await deleteFromCloudinary(existingDivision.thumbnail)
    // }
    if (payload.thumbnail && existingDivision.thumbnail) {
        yield (0, cloudinary_config_1.deleteImageFromCloudinary)(existingDivision.thumbnail);
    }
    return updatedDivision;
});
const deleteDivision = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield division_model_1.Division.findByIdAndDelete(id);
    return null;
});
exports.DivisionService = {
    createDivision,
    getAllDivisions,
    getSingleDivision,
    updateDivision,
    deleteDivision,
};
