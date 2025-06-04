import { defineEventHandler, createError, readBody, getCookie } from 'h3'
import { pool } from '@/server/utils/db'
import type { FormItem } from '~/constant/form';
import { COOKIE_KEY } from '~/constant/cookie';

export type FormOrderBody = {
  id: number;
  updated_at: string;
  order_list: FormItem[];
  order_title: string;
  token: string;
  is_visible:boolean;
  user_id:number;
  order_type:boolean;
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event) as FormOrderBody
  const token = getCookie(event, COOKIE_KEY.TOKEN);
  
  try {
    const result = await pool.query('UPDATE "history_order" SET "is_visible" = false,"updated_at" = CURRENT_TIMESTAMP WHERE "id" = $1 AND "token" = $2', [body.id, token])

    
    if (result.rowCount === 0) {
      throw createError({
        statusCode: 403,
        message: '無權限刪除此訂單或訂單不存在'
      })
    }
    
    return result.rows
  } catch (error) {
    console.error(error)
    throw createError({
      statusCode: 500,
      message: '連線錯誤'
    })
  }
})