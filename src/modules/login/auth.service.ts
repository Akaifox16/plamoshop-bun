import Elysia, { t } from "elysia"
import { jwtConfig } from "./jwt.config"

const AuthService = new Elysia()
	.use(jwtConfig)
	.model({
		session: t.Cookie({
			token: t.String()
		}, {
			secure: true,
			sameSite: true,
			secrets: ['secure', 'secret', 'rotation'],
		})
	})
	.model((model) => ({
		...model,
		optionalSession: t.Optional(model.session),
	}))
	.macro(({ onBeforeHandle }) => ({
		isSignIn(enabled: boolean) {
			if (!enabled) return

			onBeforeHandle(
				async ({ error, cookie: { token }, jwt_access_token }) => {
					if (!token) return error(401, { success: false, message: "Unauthorized" })

					const user = await jwt_access_token.verify(token.value)
					if (!user) return error(401, { success: false, message: 'Unauthorized' })
				}
			)
		}
	}))

const getEmployeeId = new Elysia()
	.use(AuthService)
	.guard({
		as: 'scoped',
		isSignIn: true,
		cookie: 'session',
	})
	.resolve(
		{ as: 'scoped' },
		(async ({ cookie: { token }, jwt_access_token, error }) => {
			const employee = await jwt_access_token.verify(token.value)
			if (employee) return { eid: employee.id }

			return error(401, 'invalid token')
		})
	)

export default AuthService

export {
	getEmployeeId
}
