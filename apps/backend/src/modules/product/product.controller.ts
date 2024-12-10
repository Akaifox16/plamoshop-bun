import Elysia from "elysia";
import { ProductRepository } from "./product.repository";
import ProductModel from "./product.model";
import AuthService from "../login/auth.service";

const productController = new Elysia({ prefix: '/products', tags: ['product'] })
	.decorate('product', new ProductRepository())
	.use(ProductModel)
	.use(AuthService)
	.guard({
		isSignIn: true
	})
	.get('/', async ({ product }) => {
		return await product.list()
	}, {
		detail: {
			summary: "List all products"
		}
	})
	.post('/', async ({ product, body, error }) => {
		const newProduct = await product.create(body)
		if (!newProduct) return error(400, 'Invalid product information')

		return newProduct
	}, {
		body: 'product.create',
		detail: {
			summary: "Create in product"
		}
	})
	.guard({
		params: 'product.params.common',
	})
	.get('/:pid', async ({ product, params: { pid }, error }) => {
		const foundProduct = await product.getById(pid)
		if (!foundProduct) return error(404, 'Product not found.')

		return foundProduct
	}, {
		detail: {
			summary: "Get product by its id"
		}
	})
	.patch('/:pid', async ({ product, params: { pid }, body, error }) => {
		const updateProduct = await product.edit(pid, body)
		if (!updateProduct) return error(404, 'Product not found')

		return updateProduct
	}, {
		body: 'product.update',
		detail: {
			summary: "Update product information"
		}
	})
	.delete('/:pid', async ({ product, params: { pid }, error }) => {
		const removed = await product.delete(pid)
		if (!removed) return error(404, 'Product not found.')

		return { success: true, message: "Product removed." }
	}, {
		detail: {
			summary: "Remove specific product id"
		}
	})

export default productController
