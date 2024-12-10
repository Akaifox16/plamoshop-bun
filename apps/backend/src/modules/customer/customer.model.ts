import Elysia, { t } from "elysia";
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

const customerCommonParams = t.Object({
	cid: customerSelect.cid,
})

const CustomerModel = new Elysia()
	.model({
		'customer.create': customerDTO,
		'customer.update': t.Partial(customerDTO),
		'customer.params.common': customerCommonParams,
	})

export default CustomerModel
