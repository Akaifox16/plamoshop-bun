import Elysia, { t } from "elysia";
import { dbScheme } from "../../database/model";

const { insert: { products } } = dbScheme

const productDTO = t.Object({
	productName: products.productName,
	productScale: products.productScale,
	productLine: products.productLine,
	productVendor: products.productVendor,
	price: products.price,
	buyPrice: products.buyPrice,
	stockQuantity: products.stockQuantity,
})

const productCommonParams = t.Object({
	pid: products.productId,
})

const ProductModel = new Elysia()
	.model({
		'product.create': productDTO,
		'product.update': t.Partial(productDTO),
		'product.params.common': productCommonParams,
	})

export default ProductModel
