import { jwt } from '@elysiajs/jwt'
import { env } from '../../config/env'

export const jwtConfig = jwt({
	name: 'jwt_access_token',
	secret: env.JWT_ACCESS_SECRET,
})
