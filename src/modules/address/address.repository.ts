import { eq as equal } from "drizzle-orm"
import { db } from "../../database/connection"
import { address } from "../../database/schema/address"

export class AddressRepository {

	async get(cid: string) {
		return await db.select()
			.from(address)
			.where(equal(address.owner, cid))
	}

}
