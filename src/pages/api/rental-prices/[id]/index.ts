import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { rentalPriceValidationSchema } from 'validationSchema/rental-prices';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.rental_price
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getRentalPriceById();
    case 'PUT':
      return updateRentalPriceById();
    case 'DELETE':
      return deleteRentalPriceById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getRentalPriceById() {
    const data = await prisma.rental_price.findFirst(convertQueryToPrismaUtil(req.query, 'rental_price'));
    return res.status(200).json(data);
  }

  async function updateRentalPriceById() {
    await rentalPriceValidationSchema.validate(req.body);
    const data = await prisma.rental_price.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteRentalPriceById() {
    const data = await prisma.rental_price.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
