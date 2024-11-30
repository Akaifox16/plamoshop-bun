import { eq } from "drizzle-orm";
import { db } from "../../database/connection";
import { env } from "../../config/env";
import { employees } from "../../database/schema/employee";

type EmployeeCreateDTO = typeof employees.$inferInsert
type EmployeeUpdateDTO = Partial<EmployeeCreateDTO>

type EmployeeId = typeof employees.$inferSelect.eid

const returnEmployee = {
  eid: employees.eid,
  reportsTo: employees.reportsTo,
  fname: employees.fname,
  lname: employees.lname,
  ext: employees.ext,
  email: employees.email,
  officeCode: employees.officeCode,
}

export class EmployeeRepository {

  async getAll() {
    return await db
      .select()
      .from(employees)
  }

  async getById(id: EmployeeId) {
    return await db
      .select()
      .from(employees)
      .where(eq(employees.eid, id))
  }

  async create(data: EmployeeCreateDTO) {
    const employee = await db
      .insert(employees)
      .values(data)
      .returning(returnEmployee)

    return employee[0]
  }

  async updateById(id: EmployeeId, data: EmployeeUpdateDTO) {
    const updateDate = new Intl.DateTimeFormat(env.TIME_LOCALE, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    })
      .format(Date.now())
      .replace(',', '')

    const updatedEmployee = await db
      .update(employees)
      .set({
        ...data,
        updatedAt: updateDate,
      })
      .where(eq(employees.eid, id))
      .returning(returnEmployee)

    return updatedEmployee[0]
  }

  async deleteById(id: EmployeeId) {
    return await db
      .delete(employees)
      .where(eq(employees.eid, id))
  }
}

