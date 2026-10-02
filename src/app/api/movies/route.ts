import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { demoMovies } from "@/lib/demo-movies";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const q = searchParams.get("q")?.trim();

  try {
    const movies = await prisma.movie.findMany({
      where: {
        ...(type === "MOVIE" || type === "SERIES" ? { type } : {}),
        ...(q ? { OR: [
          { title: { contains: q, mode: "insensitive" } },
          { originalTitle: { contains: q, mode: "insensitive" } },
        ] } : {}),
      },
      include: { genres: { include: { genre: true } } },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ data: movies, source: "database" });
  } catch {
    const data = demoMovies.filter((movie) =>
      (!type || movie.type === type) &&
      (!q || `${movie.title} ${movie.originalTitle ?? ""}`.toLowerCase().includes(q.toLowerCase()))
    );
    return NextResponse.json({ data, source: "demo" });
  }
}
