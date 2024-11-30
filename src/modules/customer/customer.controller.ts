import { Elysia } from "elysia";
import { CustomerRepository } from "./customer.repository";
import CustomerModel from "./customer.model";
import { getEmployeeId } from "../login/auth.service";


const customerController = new Elysia({ prefix: '/customers' })
	.decorate('customer', new CustomerRepository())
	.use(CustomerModel)
	.use(getEmployeeId)
	.get('/', async ({ customer }) => {
		return await customer.getAll()
	}, {
		detail: {
			summary: 'List all customers',
			tags: ['customer'],
		}
	})
	.post('/', async ({ customer, eid, body }) => {
		return await customer.create({
			...body,
			responder: eid,
		})
	}, {
		body: 'customer.create',
		detail: {
			summary: 'Create new customer',
			tags: ['customer']
		}
	})
	.guard({
		params: 'customer.params.common'
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
		body: 'customer.update',
		detail: {
			summary: 'Update customer information',
			tags: ['customer'],
		}
	})

export default customerController
