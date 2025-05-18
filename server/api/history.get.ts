import { getCookie,defineEventHandler, createError} from 'h3'
import { pool } from '@/server/utils/db'
import { COOKIE_KEY } from '~/constant/cookie';
import type { FormOrderBody } from '@/server/api/updateOrder.patch';

export default defineEventHandler(async (event) => {

  const token = getCookie(event, COOKIE_KEY.TOKEN);
  try{
  const result = await pool
    .query('SELECT * FROM "history_order" WHERE token = $1', [token])
    return result.rows as FormOrderBody[]

  }catch(error){
    console.error(error)
    throw createError({
      statusCode: 500,
      message: '連線錯誤'
    })
  }
})