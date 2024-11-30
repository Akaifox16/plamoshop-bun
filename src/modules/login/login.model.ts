import { Elysia, t } from "elysia";
import { dbScheme } from "../../database/model";

const {
	insert: { employees, logins }
} = dbScheme

const loginDTO = t.Object({
	eid: logins.eid,
	password: logins.password,
})

const signupDTO = t.Object({
	eid: logins.eid,
	password: logins.password,
	fname: employees.fname,
	lname: employees.lname,
	reportsTo: employees.reportsTo,
	email: employees.email,
	ext: employees.ext,
	officeCode: employees.officeCode,
})

const LoginModel = new Elysia()
	.model({
		'auth.signup': signupDTO,
		'auth.login': loginDTO,
	})

export default LoginModel
