import { Request, Response, NextFunction } from "express";
import {
  getDepartmentInfoWithPlace,
  getEmployeeHistory,
  getEmployeeInfoService,
  increaseEmployeeSalarySpecificDepartment
} from "./service";
import axios from "axios";

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
  const response = await axios.get('https://api.odcloud.kr/api/15068805/v1/uddi:5859269c-b8d7-4a4f-aee1-a7e2c046a52b?page=1&perPage=10', {
    headers: {
      Authorization: `Infuser zC9yS3aTT0aNiiGk4izh4Jbs9qwK4tNLFEFLYo6ksiL32798JLOEKvJDkyHXmK9CgXSfQFGWheP8fn9mfSMvSg==`
    }
  });

  console.log(response.data);
  res.status(200).send({ message: response.data });
}