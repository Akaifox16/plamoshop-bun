import { eq } from "drizzle-orm";
import { db } from "../../database/connection";
import { customers } from "../../database/schema";
import { randomUUIDv7 } from "bun";
import { env } from "../../config/env";

type CustomerCreateDTO = Omit<typeof customers.$inferInsert, 'cid'>
type CustomerUpdateDTO = Partial<CustomerCreateDTO>

type CustomerId = typeof customers.$inferSelect.cid

const returnCustomer = {
	cid: customers.cid,
	fname: customers.fname,
	lname: customers.lname,
	phone: customers.phone
}

export class CustomerRepository {

	async getAll() {
		return await db
			.select()
			.from(customers)
	}

	async getById(id: CustomerId) {
		return await db
			.select()
			.from(customers)
			.where(eq(customers.cid, id))
	}


	async create(data: CustomerCreateDTO) {
		const customer = await db
			.insert(customers)
			.values({
				...data,
				cid: randomUUIDv7(),
			})
			.returning(returnCustomer)

		return customer[0]
	}

	async updateById(id: CustomerId, data: CustomerUpdateDTO) {
		const updateDate = new Intl.DateTimeFormat('en-CA', {
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

		const updatedCustomer = await db
			.update(customers)
			.set({
				...data,
				updatedAt: updateDate,
			})
			.where(eq(customers.cid, id))
			.returning(returnCustomer)

		return updatedCustomer[0]
	}

	async deleteById(id: CustomerId) {
		return await db
			.delete(customers)
			.where(eq(customers.cid, id))
	}
}
