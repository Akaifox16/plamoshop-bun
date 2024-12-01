import { eq } from "drizzle-orm";
import { db } from "../../database/connection";
import { products } from "../../database/schema/product";
import { randomUUIDv7 } from "bun";
import { getCurrentTimestamp } from "../../utils/timestamp";

type ProductCreateDTO = Omit<typeof products.$inferInsert, 'productId'>
type ProductUpdateDTO = Partial<ProductCreateDTO>

type ProductId = typeof products.$inferSelect.productId

const returnProduct = {
	productId: products.productId,
	productVendor: products.productVendor,
	productLine: products.productLine,
	stockQuantity: products.stockQuantity,
	price: products.price,
}

export class ProductRepository {
	async getById(id: ProductId) {
		const product = await db
			.select()
			.from(products)
			.where(eq(products.productId, id))

		return product[0]
	}

	async list() {
		return await db.select()
			.from(products)
	}

	async create(dto: ProductCreateDTO) {
		return await db
			.insert(products)
			.values({
				...dto,
				productId: randomUUIDv7(),
			})
			.returning(returnProduct)
	}

	async edit(id: ProductId, updatedData: ProductUpdateDTO) {
		return await db
			.update(products)
			.set({
				...updatedData,
				updatedAt: getCurrentTimestamp(),
			})
			.where(eq(products.productId, id))
			.returning(returnProduct)
	}

	async delete(id: ProductId) {
		return await db
			.delete(products)
			.where(eq(products.productId, id))
	}
}
