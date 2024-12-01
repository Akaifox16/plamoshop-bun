import { env } from "../config/env"

const getCurrentTimestamp = () => {
  return new Intl.DateTimeFormat(env.TIME_LOCALE, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  })
    .format(Date.now())
    .replace(',', '')
}

export {
  getCurrentTimestamp
}
