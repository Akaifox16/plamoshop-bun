import { edenTreaty } from '@elysiajs/eden'
import type { App } from '@apps/plamo-mng'

export const api = edenTreaty<App>('http://0.0.0.0:3000/')
