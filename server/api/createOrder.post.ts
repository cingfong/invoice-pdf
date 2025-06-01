import { defineEventHandler, createError, readBody } from 'h3'
import { pool } from '@/server/utils/db'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  try {



    const result = await pool.query(
      `INSERT INTO "history_order" ("order_title", "token", "user_id", "order_type", "order_list", "disable", "created_at", "updated_at") VALUES ($1, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING *`, 
      [body.order_title, body.token, body.user_id, body.order_type, JSON.stringify(body.order_list), body.disable])
    return result.rows
  } catch (error) {
    console.error(error)
    throw createError({
      statusCode: 500,
      message: '連線錯誤'
    })
  }
})