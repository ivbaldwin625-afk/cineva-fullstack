/* eslint-disable @typescript-eslint/no-explicit-any */

import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Clock3, Play, Star, CalendarDays, Download, Subtitles, Users, Images, MessageCircle, HeartHandshake } from "lucide-react";
import { demoMovies } from "@/lib/demo-movies";
import { prisma } from "@/lib/prisma";

type Props = { params: Promise<{ slug: string }> };

export default async function TitlePage({ params }: Props) {
  const { slug } = await params;
  let movie: any = null;
  try {
    movie = await prisma.movie.findUnique({
      where: { slug },
      include: {
        genres: { include: { genre: true } },
        episodes: { orderBy: [{ seasonNumber: "asc" }, { episodeNumber: "asc" }] },
        downloads: { where: { isActive: true }, orderBy: { quality: "desc" } },
        subtitles: true,
        cast: { include: { person: true } },
        gallery: { orderBy: { sortOrder: "asc" } },
        comments: { where: { status: "APPROVED" }, orderBy: { createdAt: "desc" } },
      },
    });
  } catch {}
  if (!movie) movie = demoMovies.find((item) => item.slug === slug);
  if (!movie) notFound();

  const isSeries = movie.type === "SERIES";
  return (
    <>
      <section className="detail-hero">
        <div className="detail-backdrop" style={{ backgroundImage: `url("${movie.backdropUrl ?? movie.posterUrl}")` }} />
        <div className="detail-overlay" />
        <div className="container detail-hero-inner">
          <Link href="/browse" className="back-link"><ArrowRight size={16} /> برگشت به آرشیو</Link>
          <div className="detail-main">
            <img className="detail-poster" src={movie.posterUrl} alt={`پوستر ${movie.title}`} />
            <div className="detail-copy">
              <span className="section-kicker">{isSeries ? "سریال" : "فیلم سینمایی"} · {movie.releaseYear}</span>
              <h1>{movie.title}</h1>
              <p className="original-title">{movie.originalTitle}</p>
              <div className="detail-meta">
                <span className="detail-rating"><Star size={15} fill="currentColor" /> {movie.rating.toFixed(1)}</span>
                <span><CalendarDays size={15} /> {movie.releaseYear}</span>
                {movie.durationMinutes ? <span><Clock3 size={15} /> {movie.durationMinutes} دقیقه</span> : null}
                {isSeries ? <span>{movie.airedEpisodes ?? 0}/{movie.episodeCount ?? 0} قسمت</span> : null}
              </div>
              <div className="genre-list">{movie.genres?.map((item: any) => <span key={item.genre?.slug ?? item.genre?.name}>{item.genre?.name}</span>)}</div>
              <p className="detail-synopsis">{movie.synopsis}</p>
              <div className="hero-actions">
                <a href="#watch" className="primary-button"><Play size={17} fill="currentColor" /> پخش آنلاین</a>
                <a href="#downloads" className="ghost-button"><Download size={17} /> لینک‌های دانلود</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container detail-layout">
        <div className="detail-content">
          <section className="detail-panel" id="watch">
            <div className="panel-heading"><div><span className="section-kicker">تماشای عنوان</span><h2>پخش آنلاین</h2></div><span className="panel-note">پلیر نمایشی</span></div>
            <div className="player-placeholder">
              <div className="player-orbit"><Play size={27} fill="currentColor" /></div>
              <h3>آماده تماشا؟</h3>
              <p>پس از افزودن منبع ویدیویی مجاز از پنل مدیریت، پخش این عنوان از این بخش فعال می‌شود.</p>
            </div>
            {isSeries ? <div className="episode-empty"><strong>فصل‌ها و قسمت‌ها</strong><p>{movie.episodes?.length ? `${movie.episodes.length} قسمت ثبت شده` : "هنوز قسمتی ثبت نشده است. قسمت‌ها از دیتابیس مدیریت می‌شوند."}</p>{movie.episodes?.slice(0, 12).map((episode: any) => <div className="episode-row" key={episode.id}><span>فصل {episode.seasonNumber} · قسمت {episode.episodeNumber}</span><span>{episode.title}</span></div>)}</div> : null}
          </section>

          <section className="detail-panel" id="downloads">
            <div className="panel-heading"><div><span className="section-kicker">دسترسی‌ها</span><h2>لینک‌های دانلود</h2></div><Download size={19} /></div>
            {movie.downloads?.length ? <div className="download-list">{movie.downloads.map((link: any) => <a className="download-row" key={link.id} href={link.url} rel="noreferrer"><span><strong>{link.quality}</strong><small>{link.label} · {link.size ?? "حجم نامشخص"}</small></span><span className="download-action">دریافت <Download size={15} /></span></a>)}</div> : <div className="soft-empty">لینک دانلودی ثبت نشده است. لینک‌های مجاز بعداً از پنل مدیریت اضافه می‌شوند.</div>}
          </section>

          <section className="detail-panel" id="subtitles">
            <div className="panel-heading"><div><span className="section-kicker">زبان‌ها</span><h2>زیرنویس</h2></div><Subtitles size={19} /></div>
            {movie.subtitles?.length ? <div className="download-list">{movie.subtitles.map((sub: any) => <a className="download-row" key={sub.id} href={sub.url} rel="noreferrer"><span><strong>{sub.language}</strong><small>{sub.format}{sub.isForced ? " · اجباری" : ""}</small></span><span className="download-action">دریافت <Download size={15} /></span></a>)}</div> : <div className="soft-empty">هنوز زیرنویسی برای این عنوان ثبت نشده است.</div>}
          </section>

          <section className="detail-panel" id="comments">
            <div className="panel-heading"><div><span className="section-kicker">گفت‌وگو</span><h2>نظرات کاربران</h2></div><MessageCircle size={19} /></div>
            <div className="soft-empty">نظرات پس از پیاده‌سازی ورود کاربران و ثبت امن دیدگاه‌ها در این بخش نمایش داده می‌شوند.</div>
          </section>
        </div>

        <aside className="detail-sidebar">
          <div className="side-card" id="info"><h3>اطلاعات عنوان</h3><div className="info-line"><span>عنوان اصلی</span><strong>{movie.originalTitle ?? "—"}</strong></div><div className="info-line"><span>سال انتشار</span><strong>{movie.releaseYear}</strong></div><div className="info-line"><span>نوع</span><strong>{isSeries ? "سریال" : "فیلم"}</strong></div><div className="info-line"><span>امتیاز</span><strong>★ {movie.rating.toFixed(1)}</strong></div></div>
          <div className="side-card" id="cast"><h3><Users size={16} /> بازیگران</h3>{movie.cast?.length ? movie.cast.map((item: any) => <p key={item.personId}>{item.person.name}{item.role ? ` · ${item.role}` : ""}</p>) : <p className="muted-text">اطلاعات بازیگران هنوز اضافه نشده است.</p>}</div>
          <div className="side-card" id="gallery"><h3><Images size={16} /> گالری</h3>{movie.gallery?.length ? <div className="gallery-grid">{movie.gallery.map((item: any) => <img key={item.id} src={item.imageUrl} alt={item.caption ?? movie.title} />)}</div> : <p className="muted-text">تصویری برای گالری ثبت نشده است.</p>}</div>
          <div className="support-card" id="support"><HeartHandshake size={22} /><h3>حمایت از سینوا</h3><p>با حمایتت به بهتر شدن تجربه سینوا کمک کن.</p><Link href="/support" className="support-wide">صفحه حمایت <ArrowRight size={15} /></Link></div>
        </aside>
      </div>
    </>
  );
}
