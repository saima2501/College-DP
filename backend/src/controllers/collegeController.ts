import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getColleges = async (req: Request, res: Response) => {
  try {
    const { name, location, maxFees, type, page, limit } = req.query as any;

    const pageNum = Number(page) || 1;
    const limitNum = Number(limit) || 10;
    const skip = (pageNum - 1) * limitNum;
    const take = limitNum;

    const where: any = {};
    if (name) where.name = { contains: String(name), mode: "insensitive" };
    if (location) where.location = { contains: String(location), mode: "insensitive" };
    if (type && typeof type === "string") {
      where.type = type;
    }
    if (maxFees && !isNaN(Number(maxFees))) where.fees = { lte: Number(maxFees) };

    const [colleges, total] = await Promise.all([
      prisma.college.findMany({
        where,
        skip,
        take,
        orderBy: { rating: "desc" },
      }),
      prisma.college.count({ where }),
    ]);

    res.json({
      data: colleges,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch colleges" });
  }
};

export const getCollegeById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const college = await prisma.college.findUnique({
      where: { id },
    });

    if (!college) {
      return res.status(404).json({ error: "College not found" });
    }

    res.json(college);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch college details" });
  }
};
