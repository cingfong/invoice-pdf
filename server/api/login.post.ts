import { defineEventHandler, createError, readBody } from 'h3'
import { pool } from '@/server/utils/db'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  try {
    const result = await pool.query('SELECT * FROM "users" WHERE password = $1', [body.password])
    return result.rows
  } catch (error) {
    console.error(error)
    throw createError({
      statusCode: 500,
      message: '連線錯誤'
    })
  }
})