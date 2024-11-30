import { Elysia } from "elysia";
import { EmployeeRepository } from "../employee/employee.repository";
import { jwtConfig } from "./jwt.config";
import { LoginRepository } from "./login.repository";
import LoginModel from "./login.model";

const loginController = new Elysia()
	.decorate('employees', new EmployeeRepository())
	.decorate('logins', new LoginRepository())
	.use(jwtConfig)
	.use(LoginModel)
	.post('/signup', async ({ employees, logins, jwt_access_token, body, error }) => {
		const existUser = await logins.getById(body.eid)

		if (existUser) return error(400, "Username taken!!")

		const [newLoginRecord, newUser] = await Promise.all([
			employees.create(body),
			logins.create({ eid: body.eid, password: body.password })
		])

		if (!newLoginRecord || !newUser) return error(400, 'Error occur when create user')

		const token = jwt_access_token.sign({ id: newUser.eid })

		return ({ access_token: token })
	}, {
		body: 'auth.signup',
		detail: {
			summary: "Signup new employee",
			tags: ['login'],
		},
	})
	.post('/signin', async ({ logins, jwt_access_token, body, error }) => {
		const existUser = await logins.getById(body.eid)
		if (!existUser) return error(400, "Invalid User or Password")

		const isPasswordCorrect = await logins.verifyPassword(body.password, existUser.password)
		if (!isPasswordCorrect) return error(400, "Invalid User or Password")

		const token = await jwt_access_token.sign({ id: existUser.eid })
		return ({ access_token: token })
	}, {
		body: 'auth.login',
		detail: {
			summary: "Login with employee credential",
			tags: ['login'],
		},
	})

export default loginController
