import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const categories = await prisma.category2.findMany()
    return NextResponse.json(categories)
  } catch (error) {
    return NextResponse.json(
      { error: 'Ошибка при загрузке категорий' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const { name } = await request.json()
    
    const category = await prisma.category2.create({
      data: { name }
    })
    
    return NextResponse.json(category, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Ошибка при создании категории' },
      { status: 500 }
    )
  }
}