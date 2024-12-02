// src/app/api/cpap-machines/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '../../../../prisma/prisma-client';

export async function GET() {
  try {
    const cpapMachines = await prisma.cPAPMachine.findMany();
    return NextResponse.json({ cpapMachines });
  } catch (error) {
    console.error('Ошибка при загрузке данных', error);
    return NextResponse.json({ error: 'Ошибка при загрузке данных' }, { status: 500 });
  }
}
