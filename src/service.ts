import { prisma } from "./main";
import axios from "axios";
import { config } from "dotenv";
config();


export const getEmployeeInfoService = async (data: { id: number; }) => {
  try {
    return await prisma.employees.findUnique({
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
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export const getEmployeeHistory = async (data: { id: number }) => {
  try {
    return await prisma.employees.findUnique({
      where: {
        employee_id: data.id
      },
      select: {
        employee_id: true,
        jobs: true,
        job_history: true
      }
    })
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export const increaseEmployeeSalarySpecificDepartment = async (data: {
  departmentName: string,
  increasePercentage: number;
}) => {
  try {
    const department = await prisma.departments.findFirst({
      where: { department_name: { startsWith: `${data.departmentName}` }},
      include: { employees_employees_department_idTodepartments: true }
    });

    const employees = department?.employees_employees_department_idTodepartments;
      employees?.map(async(employee) => {
        const salary = Number(employee.salary);
        const increasePercentage = data.increasePercentage;
        const increasedSalary = salary + (salary * (increasePercentage / 100));
        await prisma.employees.update({
          data: {
            salary: increasedSalary
          },
          where: {
            employee_id: employee.employee_id
          }
        })
      });
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export const getDepartmentInfoWithPlace = async () => {
  return prisma.departments.findMany({
    include: {
      locations: true
    }
  });
}

export const getCompanyDepartmentsPerGovernmentService = async () => {
  const response = await axios.get(process.env.AXIOS_URL as string, {
    headers: {
      Authorization: process.env.ACCESS_KEY
    }
  });

  return response.data;
}