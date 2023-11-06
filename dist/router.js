"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = require("./controller");
const router = express_1.default.Router();
// 특정 사원의 현재 정보 조회 API
router.get("/company/employee/:employeeId", controller_1.getEmployeeInfo);
// 부서 및 위치 정보 조회 가능한 API 구현
router.get("/company/departments", controller_1.getDepartmentInfoWithPlaces);
// 특정 사원의 이력 정보 조회 API
router.get("/company/employee/:employeeId/career", controller_1.getEmployeeCareerInfo);
// 특정 부서의 급여를 특정 비율로 인상 및 사원 정보 업데이트 할 수 있는 API 구현
router.patch("/company/department", controller_1.getDepartmentInfo);
// RDBMS 스키마와 별개로 공공 데이터 포털( www.data.go.kr ) 등에서 임의의 API 선택 후 조회 가능하도록 커스터마이징된 API 구현
router.get("/government", controller_1.getDataFromGovernmentDataPortal);
exports.default = router;
