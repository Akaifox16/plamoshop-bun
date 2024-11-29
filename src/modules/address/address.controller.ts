import { Elysia, t } from 'elysia'
import { AddressRepository } from './address.repository';
import { dbScheme } from '../../database/model';

const { address: addressSelect } = dbScheme.select
const { address } = dbScheme.insert

const addressController = new Elysia({ prefix: '/address' })
	.decorate('address', new AddressRepository())
	.onTransform(function log({ body, params, path, request: { method } }) {
		console.log(`${method} ${path}`, {
			body,
			params
		})
	})
	.guard({
		params: t.Object({
			cid: addressSelect.owner,
		})
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
		body: t.Object({
			addressLine1: address.addressLine1,
			addressLine2: address.addressLine2,
			addressNo: address.addressNo,
			city: address.city,
			state: address.state,
			postalCode: address.postalCode,
			country: address.country,
		}),
		detail: {
			summary: 'Create address for customer',
			tags: ['customer']
		},
	})
	.patch('/:cid/:aid', async ({ address, params: { aid }, body }) => {
		return await address.updateById(aid, body)
	}, {
		params: t.Object({
			cid: addressSelect.owner,
			aid: addressSelect.addressId
		}),
		body: t.Object({
			addressLine1: address.addressLine1,
			addressLine2: address.addressLine2,
			addressNo: address.addressNo,
			city: address.city,
			state: address.state,
			postalCode: address.postalCode,
			country: address.country,
		}),
		detail: {
			summary: 'Update address information for given address id',
			tags: ['customer']
		},
	})
	.delete(':cid/:aid', async ({ address, params: { aid } }) => {
		await address.deleteById(aid)
		return { status: 'OK' }
	}, {
		params: t.Object({
			cid: addressSelect.owner,
			aid: addressSelect.addressId
		}),
		detail: {
			summary: 'Delete a customer\'s address for given address id',
			tags: ['customer']
		},
	})


export default addressController;
