import express from 'express';
import {
  getDataFromGovernmentDataPortal,
  getDepartmentInfo,
  getDepartmentInfoWithPlaces,
  getEmployeeCareerInfo,
  getEmployeeInfo
} from "./controller";

const router = express.Router()

/**
 * @swagger
 * /api/company/employee/{employeeId}:
 *   get:
 *     summary: 특정 사원 정보 조회 API
 *     description: 특정 사원의 정보를 조회하는 API 를 구현합니다.
 *     parameters:
 *       - in: path
 *         name: employeeId
 *         required: true
 *         description: 특정 사원 ID(PK)
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  employee_id:
 *                    type: integer
 *                  first_name:
 *                    type: string
 *                  last_name:
 *                    type: string
 *                  email:
 *                    type: string
 *                  phone_number:
 *                    type: string
 *                  hire_date:
 *                    type: string
 *                    format: date-time
 *                  salary:
 *                    type: integer
 *                  commission_pct:
 *                    type: number
 */

router.get("/company/employee/:employeeId", getEmployeeInfo);

/**
 * @swagger
 * /api/company/departments:
 *   get:
 *     summary: 부서 및 위치 정보 조회 가능한 API
 *     responses:
 *       '200':
 *         description: 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 department_id:
 *                   type: integer
 *                 department_name:
 *                   type: string
 *                 manager_id:
 *                   type: integer
 *                   nullable: true
 *                 location_id:
 *                   type: integer
 *                 locations:
 *                   type: object
 *                   properties:
 *                     location_id:
 *                       type: integer
 *                     street_address:
 *                       type: string
 *                     postal_code:
 *                       type: string
 *                     city:
 *                       type: string
 *                     state_province:
 *                       type: string
 *                     country_id:
 *                       type: string
 */

router.get("/company/departments", getDepartmentInfoWithPlaces);

/**
 * @swagger
 * /api/company/employee/{employeeId}/career:
 *   get:
 *     summary: 특정 사원의 이력 정보 조회 API
 *     parameters:
 *       - in: path
 *         name: employeeId
 *         required: true
 *         schema:
 *           type: string
 *         description: 특정 사원 ID(PK)
 *     responses:
 *       '200':
 *         description: 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: object
 *                   properties:
 *                     employee_id:
 *                       type: integer
 *                     jobs:
 *                       type: object
 *                       properties:
 *                         job_id:
 *                           type: string
 *                         job_title:
 *                           type: string
 *                         min_salary:
 *                           type: string
 *                         max_salary:
 *                           type: string
 *                     job_history:
 *                       type: array
 *                       items:
 *                         type: object
 */

router.get("/company/employee/:employeeId/career", getEmployeeCareerInfo);


/**
 * @swagger
 * /api/company/department:
 *   patch:
 *     summary: 특정 부서 급여 인상 API
 *     description: 특정 부서의 급여를 특정 비율로 인상하고 사원 정보 업데이트하는 API 구현
 *     parameters:
 *       - in: query
 *         name: departmentName
 *         schema:
 *           type: string
 *         required: true
 *         description: 인상할 부서의 이름, 예) Marketing
 *       - in: query
 *         name: rate
 *         schema:
 *           type: string
 *         required: true
 *         description: 급여 인상 비율 (정수, 예) 30% = 30)
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                 message:
 *                   type: string
 */

router.patch("/company/department", getDepartmentInfo)

/**
 * @swagger
 * /api/government:
 *   get:
 *     summary: 공공 데이터 포털 API 구현(인천서구 치과기공소 목록)
 *     description: RDBMS 스키마와 별개로 공공 데이터 포털( www.data.go.kr ) 등에서 임의의 API 선택 후 조회 가능하도록 커스터마이징된 API 구현
 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 // Define the properties of the response object here
 */

router.get("/government", getDataFromGovernmentDataPortal);

export default router;