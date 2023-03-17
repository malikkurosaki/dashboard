import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()
const getUser = async (req: NextApiRequest, res: NextApiResponse) => {
    const data = await prisma.user.findMany()
    res.status(200).json(data)
}

export default getUser