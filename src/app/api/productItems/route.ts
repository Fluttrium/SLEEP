import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const productItems = await prisma.productItem.findMany({
      include: { product: true }
    })
    return NextResponse.json(productItems)
  } catch (error) {
    return NextResponse.json(
      { error: 'Ошибка при загрузке элементов продукта' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const { price, size, pizzaType, productId } = await request.json()
    
    const productItem = await prisma.productItem.create({
      data: { 
        price: Number(price),
        size: size ? Number(size) : null,
        pizzaType: pizzaType ? Number(pizzaType) : null,
        productId: Number(productId)
      }
    })
    
    return NextResponse.json(productItem, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Ошибка при создании элемента продукта' },
      { status: 500 }
    )
  }
}