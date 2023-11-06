import { Request, Response, NextFunction } from "express";
import {
  getCompanyDepartmentsPerGovernmentService,
  getDepartmentInfoWithPlace,
  getEmployeeHistory,
  getEmployeeInfoService,
  increaseEmployeeSalarySpecificDepartment
} from "./service";


export const getEmployeeInfo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const employeeId = req.params.employeeId;
    const employees = await getEmployeeInfoService({ id: Number(employeeId) });
    res.status(200).send({ message: employees });
  } catch (e: any) {
    console.log('Error Caused By ', e);
    res.status(404).send({ code: e.code, message: e.message });
  }
};

export const getEmployeeCareerInfo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const employeeId = req.params.employeeId;
    const history = await getEmployeeHistory({ id: Number(employeeId) });
    res.status(200).send({ message: history });
  } catch (e) {
    console.log('Error Caused By ', e);
    res.status(404).send({ message: null });
    throw e;
  }
};

export const getDepartmentInfoWithPlaces = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const department = await getDepartmentInfoWithPlace();
    res.status(200).send(department);
  } catch (e: any) {
    console.log('Error Caused By ', e);
    res.status(404).send({ code: e.code, message: e.message });
  }
}

export const getDepartmentInfo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const departmentName = req.query.departmentName as string;
    const increasePercentage = req.query.rate as string;
    const result = await increaseEmployeeSalarySpecificDepartment({ departmentName: departmentName, increasePercentage: Number(increasePercentage) });

    res.status(200).send({
      status: 200,
      message: `${departmentName} 부서의 급여가 모두 ${increasePercentage} 만큼 인상 되었습니다.`
    });
  } catch (e: any) {
    console.log('Error Caused By ', e);
    res.status(404).send({ code: e.code, message: e.message });
  }
}

export const getDataFromGovernmentDataPortal = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await getCompanyDepartmentsPerGovernmentService();

    res.status(200).send({
      code: 200,
      message: "성공적으로 조회되었습니다.",
      data: result
    });
  } catch (e: any) {
    console.log('Error Caused By ', e);
    res.status(404).send({ code: e.code, message: e.message });
  }
}