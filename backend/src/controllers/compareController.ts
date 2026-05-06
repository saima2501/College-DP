import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const compareColleges = async (req: Request, res: Response) => {
  try {
    const { ids } = req.body; // Expecting array of UUIDs

    if (!Array.isArray(ids) || ids.length < 2 || ids.length > 3) {
      return res.status(400).json({ error: "Select 2 or 3 colleges to compare" });
    }

    const colleges = await prisma.college.findMany({
      where: {
        id: { in: ids },
      },
    });

    res.json(colleges);
  } catch (error) {
    res.status(500).json({ error: "Failed to compare colleges" });
  }
};
