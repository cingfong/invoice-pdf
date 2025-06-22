import { getCookie,defineEventHandler, createError} from 'h3'
import { pool } from '@/server/utils/db'
import { COOKIE_KEY } from '~/constant/cookie';
import type { FormOrderBody } from '@/server/api/updateOrder.patch';
import type { FormItem } from '~/constant/form';

export default defineEventHandler(async (event) => {

  const token = getCookie(event, COOKIE_KEY.TOKEN);
  try{
  const _result = await pool
    .query('SELECT * FROM "history_order" WHERE token = $1 AND is_visible = true ORDER BY "updated_at" DESC', [token])

    return _result.rows.map((row) => ({
      ...row,
      order_list: JSON.parse(row.order_list) as FormItem[]
    })) as FormOrderBody[]

  }catch(error){
    console.error(error)
    throw createError({
      statusCode: 500,
      message: '連線錯誤'
    })
  }
})