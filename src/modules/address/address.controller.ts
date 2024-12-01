import { Elysia } from 'elysia'
import { AddressRepository } from './address.repository';
import AddressModel from './address.model';
import { jwtConfig } from '../login/jwt.config';
import AuthService from '../login/auth.service';

const addressController = new Elysia({ prefix: '/addresses', tags: ['customer', 'address'] })
	.decorate('address', new AddressRepository())
	.use(jwtConfig)
	.use(AddressModel)
	.use(AuthService)
	.guard({
		params: 'address.params.default',
		isSignIn: true,
	})
	.get('/:cid', async ({ address, params: { cid }, error }) => {
		return await address.getByOwner(cid) ?? error(404, 'Address Not Found')
	}, {
		detail: {
			summary: 'Get list of addresses of the customer',
		},
	})
	.post('/:cid', async ({ address, params: { cid }, body }) => {
		return await address.create({ ...body, owner: cid })
	}, {
		body: 'address.create',
		detail: {
			summary: 'Create address for customer',
		},
	})
	.patch('/:cid/:aid', async ({ address, params: { aid }, body }) => {
		return await address.updateById(aid, body)
	}, {
		params: 'address.params.byId',
		body: 'address.update',
		detail: {
			summary: 'Update address information for given address id',
		},
	})
	.delete(':cid/:aid', async ({ address, params: { aid } }) => {
		await address.deleteById(aid)
		return { status: 'OK' }
	}, {
		params: 'address.params.byId',
		detail: {
			summary: 'Delete a customer\'s address for given address id',
		},
	})


export default addressController;
