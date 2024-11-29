import { eq as equal } from "drizzle-orm"
import { db } from "../../database/connection"
import { address } from "../../database/schema"
import { randomUUIDv7 } from "bun"
import { env } from "../../config/env"

type AddressCreateDTO = Omit<typeof address.$inferInsert, 'addressId'>
type AddressUpdateDTO = Partial<Omit<AddressCreateDTO, 'owner'>>

type AddressId = typeof address.$inferSelect.addressId

const returnAddress = {
	addressId: address.addressId,
	owner: address.owner,
	addressLine1: address.addressLine1,
	addressLine2: address.addressLine2,
	addressNo: address.addressNo,
	city: address.city,
	state: address.state,
	postalCode: address.postalCode,
	country: address.country,
}

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
		const addr = await db
			.insert(address)
			.values({
				...addressDto,
				addressId: randomUUIDv7()
			})
			.returning(returnAddress)

		return addr[0]
	}

	async updateById(id: AddressId, addressDto: AddressUpdateDTO) {
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

		const updateAddress = await db
			.update(address)
			.set({
				...addressDto,
				updatedAt: updateDate,
			})
			.where(equal(address.addressId, id))
			.returning(returnAddress)

		return updateAddress[0]
	}

	async deleteById(id: AddressId) {
		return await db
			.delete(address)
			.where(equal(address.addressId, id))
	}
}
