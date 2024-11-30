import { jwt } from '@elysiajs/jwt'
import { env } from '../../config/env'
import { t } from 'elysia'
import { dbScheme } from '../../database/model'

const { select: { employees } } = dbScheme

export const jwtConfig = jwt({
	name: 'jwt_access_token',
	secret: env.JWT_ACCESS_SECRET,
	schema: t.Object({
		id: employees.eid,
	}),
	exp: env.JWT_ACCESS_EXPIRE,
})
