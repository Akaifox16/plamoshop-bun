import { Elysia } from "elysia";
import { EmployeeRepository } from "../employee/employee.repository";
import { LoginRepository } from "./login.repository";
import LoginModel from "./login.model";
import AuthService, { getEmployeeId } from "./auth.service";

const loginController = new Elysia()
	.decorate('employees', new EmployeeRepository())
	.decorate('logins', new LoginRepository())
	.use(LoginModel)
	.use(AuthService)
	.put('/signup', async ({ employees, logins, body, error }) => {
		const existUser = await logins.getById(body.eid)

		if (existUser) return error(400, "Username taken!!")

		const [newLoginRecord, newUser] = await Promise.all([
			employees.create(body),
			logins.create({ eid: body.eid, password: body.password })
		])

		if (!newLoginRecord || !newUser) return error(400, 'Error occur when create user')

		return { success: true, message: "User created" }
	}, {
		isSignIn: false,
		body: 'auth.signup',
		detail: {
			summary: "Signup new employee",
			tags: ['login'],
		},
	})
	.post('/signin', async ({ logins, cookie: { token: tokenCookie }, jwt_access_token, body, error }) => {
		const existUser = await logins.getById(body.eid)
		if (!existUser) return error(400, "Invalid User or Password")

		const isPasswordCorrect = await logins.verifyPassword(body.password, existUser.password)
		if (!isPasswordCorrect) return error(400, "Invalid User or Password")

		const token = await jwt_access_token.sign({ id: existUser.eid })
		tokenCookie.value = token

		return { success: true, message: "Logged in" }
	}, {
		isSignIn: false,
		body: 'auth.login',
		cookie: 'optionalSession',
		detail: {
			summary: "Login with employee credential",
			tags: ['login'],
		},
	})
	.use(getEmployeeId)
	.get('/signout', ({ cookie: { token } }) => {
		token.remove()

		return { success: true, message: "Signed out" }
	}, {
		detail: {
			summary: "Sign out",
			tags: ['login'],
		}
	})
	.get('/me', async ({ employees, eid }) => {
		return await employees.getById(eid)
	}, {
		detail: {
			summary: "Get user information of current user",
			tags: ['login'],

		}
	})

export default loginController
