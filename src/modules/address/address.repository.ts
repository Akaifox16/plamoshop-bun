import { eq as equal } from "drizzle-orm"
import { db } from "../../database/connection"
import { address } from "../../database/schema"
import { randomUUIDv7 } from "bun"

type AddressCreateDTO = Omit<typeof address.$inferInsert, 'addressId'>
type AddressUpdateDTO = Omit<typeof address.$inferInsert, 'addressId' | 'owner'>

type AddressId = typeof address.$inferSelect.addressId

export class AddressRepository {

	async getByOwner(cid: AddressId) {
		return await db.select()
			.from(address)
			.where(equal(address.owner, cid))
	}

	async getById(id: AddressId) {
		return await db
			.select()
			.from(address)
			.where(equal(address.addressId, id))
	}

	async create(addressDto: AddressCreateDTO) {
		return await db
			.insert(address)
			.values({
				...addressDto,
				addressId: randomUUIDv7()
			})
	}

	async updateById(id: AddressId, addressDto: AddressUpdateDTO) {
		return await db
			.update(address)
			.set({
				...addressDto,
				updatedAt: Date.now().toLocaleString(),
			})
			.where(equal(address.addressId, id))
	}

	async deleteById(id: AddressId) {
		return await db
			.delete(address)
			.where(equal(address.addressId, id))
	}
}
