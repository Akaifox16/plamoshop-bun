import Elysia, { t } from "elysia";
import { CustomerRepository } from "./customer.repository";
import { dbScheme } from "../../database/model";

const {
	select: { customers: customerSelect },
	insert: { customers },
} = dbScheme

const customerDTO = t.Object({
	fname: customers.fname,
	lname: customers.lname,
	phone: customers.phone,
})

const customerController = new Elysia({ prefix: '/customers' })
	.decorate('customer', new CustomerRepository())
	.onTransform(function log({ body, params, path, request: { method } }) {
		console.log(`${method} ${path}`, {
			body,
			params
		})
	})
	.get('/', async ({ customer }) => {
		return await customer.getAll()
	}, {
		detail: {
			summary: 'List all customers',
			tags: ['customer'],
		}
	})
	.post('/', async ({ customer, body }) => {
		return await customer.create(body)
	}, {
		body: customerDTO,
		detail: {
			summary: 'Create new customer',
			tags: ['customer']
		}
	})
	.guard({
		params: t.Object({
			cid: customerSelect.cid,
		})
	})
	.get('/:cid', async ({ customer, params: { cid } }) => {
		return await customer.getById(cid)
	}, {
		detail: {
			summary: 'Get customer information by customer id',
			tags: ['customer'],
		}
	})
	.patch('/:cid', async ({ customer, params: { cid }, body }) => {
		return await customer.updateById(cid, body)
	}, {
		body: t.Partial(customerDTO),
		detail: {
			summary: 'Update customer information',
			tags: ['customer'],
		}
	})

export default customerController
