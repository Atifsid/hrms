import axios from 'axios';
import { MMKV } from 'react-native-mmkv';
import employeesData from './employees_data.json';

export type Employee = {
  id: number;
  name: string;
  email: string;
  role: string;
  arrivalTime: string;
  username?: string;
  password?: string;
};

const storage = new MMKV();
const EMPLOYEE_KEY = 'employees_data';

export function seedEmployees() {
  storage.set(EMPLOYEE_KEY, JSON.stringify(employeesData));
}

export async function getEmployees(
  page: number,
  pageSize: number,
): Promise<Employee[]> {
  let all: Employee[] = [];
  const local = storage.getString(EMPLOYEE_KEY);

  if (local) {
    all = JSON.parse(local);
  }
  const start = (page - 1) * pageSize;
  return all.slice(start, start + pageSize);
}

export async function updateEmployee(employee: Employee): Promise<Employee> {
  let all: Employee[] = [];
  const local = storage.getString(EMPLOYEE_KEY);
  if (local) all = JSON.parse(local);
  const idx = all.findIndex(e => e.id === employee.id);
  if (idx > -1) {
    all[idx] = employee;
  } else {
    all.push(employee);
  }
  storage.set(EMPLOYEE_KEY, JSON.stringify(all));
  return employee;
}

export async function getEmployeeByUsername(
  username: string,
): Promise<Employee | undefined> {
  try {
    let all: Employee[] = [];
    const local = storage.getString(EMPLOYEE_KEY);
    if (local) all = JSON.parse(local);
    return all.find(e => e.username === username);
  } catch (err) {
    return undefined;
  }
}
