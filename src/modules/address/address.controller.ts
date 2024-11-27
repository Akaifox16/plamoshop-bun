import { Elysia } from 'elysia'
import { AddressRepository } from './address.repository';

const addressController = new Elysia({ prefix: '/address' })
	.decorate('address', new AddressRepository())
	.get('/:cid', async ({ address, params: { cid } }) => {
		console.info(`Get addresses of user ${cid}`)
		return await address.get(cid)
	})


export default addressController;
