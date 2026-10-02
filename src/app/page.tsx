import Link from "next/link";
import { ArrowLeft, Play, Sparkles, ShieldCheck } from "lucide-react";
import { MovieCard } from "@/components/MovieCard";
import { demoMovies, type MovieCardData } from "@/lib/demo-movies";
import { prisma } from "@/lib/prisma";

async function getMovies(): Promise<MovieCardData[]> {
  try {
    const movies = await prisma.movie.findMany({
      include: { genres: { include: { genre: true } } },
      orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
    });
    if (movies.length) return movies as unknown as MovieCardData[];
  } catch {
    // The UI remains previewable before the local database is started.
  }
  return demoMovies;
}

export default async function HomePage() {
  const movies = await getMovies();
  const featured = movies.find((movie) => movie.isFeatured) ?? movies[0];
  const latest = movies.filter((movie) => movie.id !== featured?.id);

  return (
    <>
      <section className="hero-section">
        <div className="hero-backdrop" style={{ backgroundImage: `url("${featured?.backdropUrl ?? featured?.posterUrl}")` }} />
        <div className="hero-gradient" />
        <div className="container hero-content">
          <div className="hero-copy">
            <div className="eyebrow"><Sparkles size={15} /> انتخاب سردبیر سینوا</div>
            <p className="hero-kicker">فراتر از قاب، نزدیک‌تر به قصه</p>
            <h1>{featured?.title ?? "دنیای فیلم و سریال"}</h1>
            <div className="hero-meta">
              <span>{featured?.releaseYear}</span><span className="meta-dot" />
              <span>{featured?.type === "SERIES" ? "سریال" : "فیلم سینمایی"}</span><span className="meta-dot" />
              <span className="hero-rating">★ {featured?.rating.toFixed(1)}</span>
            </div>
            <p className="hero-description">{featured?.synopsis}</p>
            <div className="hero-actions">
              <Link className="primary-button" href={`/title/${featured?.slug}`}><Play size={17} fill="currentColor" /> مشاهده عنوان <ArrowLeft size={17} /></Link>
              <Link className="ghost-button" href="/browse">کاوش در آرشیو</Link>
            </div>
            <div className="hero-trust"><ShieldCheck size={15} /> اطلاعات منظم، تجربه تماشای ساده</div>
          </div>
          <div className="hero-index"><span>۰۱</span><i /><span>۰۳</span></div>
        </div>
      </section>

      <section className="container value-strip" aria-label="ویژگی‌ها">
        <div><span className="value-icon">01</span><div><strong>همه‌چیز مرتب</strong><p>اطلاعات، قسمت‌ها و جزئیات در یک مسیر</p></div></div>
        <div><span className="value-icon">02</span><div><strong>پیدا کردن سریع</strong><p>آرشیو قابل جست‌وجو و دسته‌بندی‌شده</p></div></div>
        <div><span className="value-icon">03</span><div><strong>تجربه بی‌حاشیه</strong><p>طراحی برای موبایل و دسکتاپ</p></div></div>
      </section>

      <section className="container content-section" id="latest">
        <div className="section-heading">
          <div><span className="section-kicker">انتخاب‌های سینوا</span><h2>برای تماشای بعدی</h2><p>قصه‌ای که امشب دنبالش می‌گردی، شاید همین‌جاست.</p></div>
          <Link className="text-link" href="/browse">دیدن همه <ArrowLeft size={16} /></Link>
        </div>
        <div className="movie-grid">
          {movies.slice(0, 6).map((movie) => <MovieCard key={movie.id} movie={movie} />)}
        </div>
      </section>

      <section className="container archive-banner">
        <div><span className="section-kicker">آرشیو را کشف کن</span><h2>عنوان بعدی‌ات را پیدا کن.</h2><p>بین فیلم‌ها و سریال‌ها بگرد و جزئیات هر عنوان را یک‌جا ببین.</p></div>
        <Link href="/browse" className="primary-button">رفتن به آرشیو <ArrowLeft size={17} /></Link>
      </section>
    </>
  );
}
