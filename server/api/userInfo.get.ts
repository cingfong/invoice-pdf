import { getCookie,defineEventHandler, createError} from 'h3'
import { pool } from '@/server/utils/db'
import { COOKIE_KEY } from '~/constant/cookie';

export type UserInfo = {
  id: number;
  company: string;
  address: string;
  name: string;
  phone: string
  img_base64: string
}

export default defineEventHandler(async (event) => {

  const token = getCookie(event, COOKIE_KEY.TOKEN);
  try{
  const result = await pool
    .query('SELECT * FROM "users" WHERE token = $1', [token])
    return result.rows[0] as UserInfo

  }catch(error){
    console.error(error)
    throw createError({
      statusCode: 500,
      message: '連線錯誤'
    })
  }
})