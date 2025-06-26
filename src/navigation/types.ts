import { Employee } from '../api/employees';

export type AdminStackParamList = {
  EmployeeList: undefined;
  EmployeeEdit: { mode: 'add' } | { mode: 'edit'; employee: Employee };
  Attendance: undefined;
  SetOfficeLocation: undefined;
};

export type EmployeeStackParamList = {
  EmployeeHome: undefined;
  EmployeeDetails: undefined;
  Attendance: undefined;
};
