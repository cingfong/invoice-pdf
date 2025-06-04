import { defineEventHandler, createError, readBody, getCookie } from 'h3'
import { pool } from '@/server/utils/db'
import type { FormItem } from '~/constant/form';
import { COOKIE_KEY } from '~/constant/cookie';

export type FormOrderBody = {
  id: number;
  updated_at: string;
  order_list: FormItem[];
  order_title: string;
  order_type:boolean;
  token: string;
  user_id:number;
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event) as FormOrderBody
  const token = getCookie(event, COOKIE_KEY.TOKEN);
  
  try {
    const result = await pool.query(
      `UPDATE "history_order" 
       SET "order_title" = $1,
           "updated_at" = CURRENT_TIMESTAMP,
           "order_list" = $2,
           "order_type" = $3,
           "is_visible" = true,
           "user_id" = $4
       WHERE "id" = $5 AND "token" = $6`,
      [
        body.order_title,
        JSON.stringify(body.order_list),
        body.order_type,
        body.user_id,
        body.id,
        token
      ]
    )
    
    if (result.rowCount === 0) {
      throw createError({
        statusCode: 403,
        message: '無權限更新此訂單或訂單不存在'
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