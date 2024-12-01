import { eq } from "drizzle-orm";
import { db } from "../../database/connection";
import { employees } from "../../database/schema/employee";
import { getCurrentTimestamp } from "../../utils/timestamp";

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
    const updatedEmployee = await db
      .update(employees)
      .set({
        ...data,
        updatedAt: getCurrentTimestamp(),
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

