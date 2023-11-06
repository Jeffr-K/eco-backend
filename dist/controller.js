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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDataFromGovernmentDataPortal = exports.getDepartmentInfo = exports.getDepartmentInfoWithPlaces = exports.getEmployeeCareerInfo = exports.getEmployeeInfo = void 0;
const service_1 = require("./service");
const axios_1 = __importDefault(require("axios"));
const getEmployeeInfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employeeId = req.params.employeeId;
        const employees = yield (0, service_1.getEmployeeInfoService)({ id: Number(employeeId) });
        res.status(200).send({ message: employees });
    }
    catch (e) {
        res.status(404).send({ message: "hello, world" });
    }
});
exports.getEmployeeInfo = getEmployeeInfo;
const getEmployeeCareerInfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employeeId = req.params.employeeId;
        const history = yield (0, service_1.getEmployeeHistory)({ id: Number(employeeId) });
        res.status(200).send({ message: history });
    }
    catch (e) {
        console.log(e);
        res.status(404).send({ message: null });
        throw e;
    }
});
exports.getEmployeeCareerInfo = getEmployeeCareerInfo;
const getDepartmentInfoWithPlaces = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const department = yield (0, service_1.getDepartmentInfoWithPlace)();
    res.status(200).send(department);
});
exports.getDepartmentInfoWithPlaces = getDepartmentInfoWithPlaces;
const getDepartmentInfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const departmentName = req.query.departmentName;
    const increasePercentage = req.query.rate;
    yield (0, service_1.increaseEmployeeSalarySpecificDepartment)({ departmentName: departmentName, increasePercentage: Number(increasePercentage) });
    res.status(200).send({ message: "hello, world!" });
});
exports.getDepartmentInfo = getDepartmentInfo;
const getDataFromGovernmentDataPortal = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get('https://api.odcloud.kr/api/15068805/v1/uddi:5859269c-b8d7-4a4f-aee1-a7e2c046a52b?page=1&perPage=10', {
        headers: {
            Authorization: `Infuser zC9yS3aTT0aNiiGk4izh4Jbs9qwK4tNLFEFLYo6ksiL32798JLOEKvJDkyHXmK9CgXSfQFGWheP8fn9mfSMvSg==`
        }
    });
    console.log(response.data);
    res.status(200).send({ message: response.data });
});
exports.getDataFromGovernmentDataPortal = getDataFromGovernmentDataPortal;
