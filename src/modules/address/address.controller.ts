import { Elysia, t } from 'elysia'
import { AddressRepository } from './address.repository';
import AddressModel from './address.model';

const addressController = new Elysia({ prefix: '/addresses' })
	.decorate('address', new AddressRepository())
	.use(AddressModel)
	.guard({
		params: 'address.params.default'
	})
	.get('/:cid', async ({ address, params: { cid }, error }) => {
		return await address.getByOwner(cid) ?? error(404, 'Address Not Found')
	}, {
		detail: {
			summary: 'Get list of addresses of the customer',
			tags: ['customer']
		},
	})
	.post('/:cid', async ({ address, params: { cid }, body }) => {
		return await address.create({ ...body, owner: cid })
	}, {
		body: 'address.create',
		detail: {
			summary: 'Create address for customer',
			tags: ['customer']
		},
	})
	.patch('/:cid/:aid', async ({ address, params: { aid }, body }) => {
		return await address.updateById(aid, body)
	}, {
		params: 'address.params.byId',
		body: 'address.update',
		detail: {
			summary: 'Update address information for given address id',
			tags: ['customer']
		},
	})
	.delete(':cid/:aid', async ({ address, params: { aid } }) => {
		await address.deleteById(aid)
		return { status: 'OK' }
	}, {
		params: 'address.params.byId',
		detail: {
			summary: 'Delete a customer\'s address for given address id',
			tags: ['customer']
		},
	})


export default addressController;
