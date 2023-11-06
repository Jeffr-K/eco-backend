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
exports.getCompanyDepartmentsPerGovernmentService = exports.getDepartmentInfoWithPlace = exports.increaseEmployeeSalarySpecificDepartment = exports.getEmployeeHistory = exports.getEmployeeInfoService = void 0;
const main_1 = require("./main");
const getEmployeeInfoService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield main_1.prisma.employees.findUnique({
            select: {
                employee_id: true,
                first_name: true,
                last_name: true,
                email: true,
                phone_number: true,
                hire_date: true,
                salary: true,
                commission_pct: true,
                employees: true,
                jobs: true,
                departments_departments_manager_idToemployees: true,
                departments_employees_department_idTodepartments: true,
                job_history: true
            },
            where: { employee_id: data.id },
        });
    }
    catch (e) {
        console.log(e);
        throw e;
    }
});
exports.getEmployeeInfoService = getEmployeeInfoService;
const getEmployeeHistory = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield main_1.prisma.employees.findUnique({
            where: {
                employee_id: data.id
            },
            select: {
                employee_id: true,
                jobs: true,
                job_history: true
            }
        });
    }
    catch (e) {
        console.log(e);
        throw e;
    }
});
exports.getEmployeeHistory = getEmployeeHistory;
const increaseEmployeeSalarySpecificDepartment = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const department = yield main_1.prisma.departments.findFirst({
            where: { department_name: { startsWith: `${data.departmentName}` } },
            include: { employees_employees_department_idTodepartments: true }
        });
        const employees = department === null || department === void 0 ? void 0 : department.employees_employees_department_idTodepartments;
        employees === null || employees === void 0 ? void 0 : employees.map((employee) => __awaiter(void 0, void 0, void 0, function* () {
            const salary = Number(employee.salary);
            const increasePercentage = data.increasePercentage;
            const increasedSalary = salary + (salary * (increasePercentage / 100));
            yield main_1.prisma.employees.update({
                data: {
                    salary: increasedSalary
                },
                where: {
                    employee_id: employee.employee_id
                }
            });
        }));
    }
    catch (e) {
        console.log(e);
        throw e;
    }
});
exports.increaseEmployeeSalarySpecificDepartment = increaseEmployeeSalarySpecificDepartment;
const getDepartmentInfoWithPlace = () => __awaiter(void 0, void 0, void 0, function* () {
    return main_1.prisma.departments.findMany({
        include: {
            locations: true
        }
    });
});
exports.getDepartmentInfoWithPlace = getDepartmentInfoWithPlace;
const getCompanyDepartmentsPerGovernmentService = () => __awaiter(void 0, void 0, void 0, function* () {
    // await prisma.jobs.findFirst();
});
exports.getCompanyDepartmentsPerGovernmentService = getCompanyDepartmentsPerGovernmentService;
