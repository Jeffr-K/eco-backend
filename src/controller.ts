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
  } catch (e) {
    res.status(404).send({ message: "hello, world" });
  }
};

export const getEmployeeCareerInfo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const employeeId = req.params.employeeId;
    const history = await getEmployeeHistory({ id: Number(employeeId) });
    res.status(200).send({ message: history });
  } catch (e) {
    console.log(e);
    res.status(404).send({ message: null });
    throw e;
  }
};

export const getDepartmentInfoWithPlaces = async (req: Request, res: Response, next: NextFunction) => {
  const department = await getDepartmentInfoWithPlace();
  res.status(200).send(department);
}

export const getDepartmentInfo = async (req: Request, res: Response, next: NextFunction) => {
  const departmentName = req.query.departmentName as string;
  const increasePercentage = req.query.rate as string;
  await increaseEmployeeSalarySpecificDepartment({ departmentName: departmentName, increasePercentage: Number(increasePercentage) });

  res.status(200).send({ message: "hello, world!" });
}

export const getDataFromGovernmentDataPortal = async (req: Request, res: Response, next: NextFunction) => {
  const result = await getCompanyDepartmentsPerGovernmentService();

  res.status(200).send({ message: result });
}