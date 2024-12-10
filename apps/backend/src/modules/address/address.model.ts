import { Elysia, t } from 'elysia'
import { dbScheme } from '../../database/model';

const { address: addressSelect } = dbScheme.select
const { address } = dbScheme.insert

const customerAddressDTO = t.Object({
	addressLine1: address.addressLine1,
	addressLine2: address.addressLine2,
	addressNo: address.addressNo,
	city: address.city,
	state: address.state,
	postalCode: address.postalCode,
	country: address.country,
})

const customerAddressCommonParams = t.Object({
	cid: addressSelect.owner,
})
const customerAddressByIdParams = t.Object({
	cid: addressSelect.owner,
	aid: addressSelect.addressId
})

const AddressModel = new Elysia()
	.model({
		'address.create': customerAddressDTO,
		'address.update': t.Partial(customerAddressDTO),
		'address.params.default': customerAddressCommonParams,
		'address.params.byId': customerAddressByIdParams,
	})

export default AddressModel
