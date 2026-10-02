import Link from "next/link";
import { MovieCard } from "@/components/MovieCard";
import { demoMovies, type MovieCardData } from "@/lib/demo-movies";
import { prisma } from "@/lib/prisma";

type SearchParams = Promise<{ type?: string; q?: string }>;

async function getMovies(): Promise<MovieCardData[]> {
  try {
    const rows = await prisma.movie.findMany({ include: { genres: { include: { genre: true } } }, orderBy: { createdAt: "desc" } });
    if (rows.length) return rows as unknown as MovieCardData[];
  } catch {}
  return demoMovies;
}

export default async function BrowsePage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const type = params.type;
  const q = (params.q ?? "").trim().toLocaleLowerCase("fa");
  const all = await getMovies();
  const movies = all.filter((movie) => (!type || movie.type === type) &&
    (!q || `${movie.title} ${movie.originalTitle ?? ""} ${movie.synopsis}`.toLocaleLowerCase("fa").includes(q)));
  return (
    <section className="container browse-page">
      <div className="page-heading">
        <span className="section-kicker">کتابخانه سینوا</span>
        <h1>{type === "MOVIE" ? "فیلم‌ها" : type === "SERIES" ? "سریال‌ها" : "آرشیو فیلم و سریال"}</h1>
        <p>برای پیدا کردن عنوان موردنظرت جست‌وجو کن یا دسته‌بندی را انتخاب کن.</p>
      </div>
      <form className="search-form" action="/browse">
        <input type="search" name="q" defaultValue={params.q} placeholder="نام فیلم، سریال یا عنوان انگلیسی..." aria-label="جست‌وجو در آرشیو" />
        {type ? <input type="hidden" name="type" value={type} /> : null}
        <button type="submit">جست‌وجو</button>
      </form>
      <div className="filter-row">
        <Link className={!type ? "filter-chip active" : "filter-chip"} href="/browse">همه</Link>
        <Link className={type === "MOVIE" ? "filter-chip active" : "filter-chip"} href="/browse?type=MOVIE">فیلم‌ها</Link>
        <Link className={type === "SERIES" ? "filter-chip active" : "filter-chip"} href="/browse?type=SERIES">سریال‌ها</Link>
        <span className="result-count">{movies.length} عنوان</span>
      </div>
      {movies.length ? <div className="movie-grid browse-grid">{movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}</div> :
        <div className="empty-state"><h2>چیزی پیدا نشد</h2><p>املای عنوان را بررسی کن یا فیلتر دیگری را امتحان کن.</p><Link href="/browse" className="text-link">نمایش همه عنوان‌ها <span>←</span></Link></div>}
    </section>
  );
}
