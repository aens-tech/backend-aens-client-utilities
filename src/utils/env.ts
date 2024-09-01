import 'dotenv/config'

export const ENVIRONMENT = process.env.ENVIRONMENT ?? ""
export const MASTER_KEY = process.env.MASTER_KEY ?? ""
export const ELEVATE_MASTER_KEY = process.env.ELEVATE_MASTER_KEY ?? ""
export const JWT_SECRET = process.env.JWT_SECRET ?? ""
export const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET ?? ""