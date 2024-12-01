import { eq } from "drizzle-orm";
import { db } from "../../database/connection";
import { env } from "../../config/env";
import { logins } from "../../database/schema";
import { getCurrentTimestamp } from "../../utils/timestamp";

type LoginCreateDTO = typeof logins.$inferInsert
type LoginUpdateDTO = Pick<LoginCreateDTO, 'password'>

type EmployeeId = typeof logins.$inferSelect.eid
type Password = typeof logins.$inferInsert.password

const returnCredential = {
	eid: logins.eid,
	hash: logins.password,
}

export class LoginRepository {

	async getById(id: EmployeeId) {
		const loginRecord = await db
			.select()
			.from(logins)
			.where(eq(logins.eid, id))

		return loginRecord[0]
	}

	async create(data: LoginCreateDTO) {
		const login = await db
			.insert(logins)
			.values({
				...data,
				password: await Bun.password.hash(data.password),
			})
			.returning(returnCredential)

		return login[0]
	}

	async updateById(id: EmployeeId, data: LoginUpdateDTO) {

		const updateCreds = await db
			.update(logins)
			.set({
				...data,
				updatedAt: getCurrentTimestamp(),
			})
			.where(eq(logins.eid, id))
			.returning(returnCredential)

		return updateCreds[0]
	}

	async verifyPassword(password: Password, hash: Password) {
		return await Bun.password.verify(password, hash)
	}

}
