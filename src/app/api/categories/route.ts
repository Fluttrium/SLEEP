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

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'ID категории обязательно' },
        { status: 400 }
      )
    }

    const deletedCategory = await prisma.category2.delete({
      where: { id: Number(id) }
    })

    return NextResponse.json(deletedCategory)
  } catch (error) {
    return NextResponse.json(
      { error: 'Ошибка при удалении категории' },
      { status: 500 }
    )
  }
}