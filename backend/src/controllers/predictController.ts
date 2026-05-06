import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const predictColleges = async (req: Request, res: Response) => {
  try {
    const { exam, rank } = req.body;

    if (!exam || rank === undefined) {
      return res.status(400).json({ error: "Exam and rank are required" });
    }

    // Rule-based prediction: find colleges where exam matches and cutoff rank is greater than or equal to user rank
    // We add a buffer of 20% to the rank for "possible" matches
    const predictedColleges = await prisma.college.findMany({
      where: {
        examType: exam,
        examCutoffRank: {
          gte: Number(rank),
        },
      },
      orderBy: {
        examCutoffRank: "asc",
      },
    });

    res.json(predictedColleges);
  } catch (error) {
    res.status(500).json({ error: "Failed to predict colleges" });
  }
};
