// app/api/test/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'API está funcionando!',
    timestamp: new Date().toISOString(),
    project: 'Além da Justiça'
  })
}