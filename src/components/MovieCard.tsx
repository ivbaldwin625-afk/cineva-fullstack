import Link from "next/link";
import { Star, Play } from "lucide-react";
import type { MovieCardData } from "@/lib/demo-movies";

const statusLabel = {
  AIRING: "در حال پخش",
  COMPLETED: "پایان‌یافته",
  UPCOMING: "به‌زودی",
};

export function MovieCard({ movie }: { movie: MovieCardData }) {
  const isSeries = movie.type === "SERIES";
  return (
    <article className="movie-card">
      <Link href={`/title/${movie.slug}`} className="poster-link" aria-label={`جزئیات ${movie.title}`}>
        <div className="poster-wrap">
          {/* Remote poster URLs are supplied by the movie record. */}
          <img className="poster-image" src={movie.posterUrl} alt={`پوستر ${movie.title}`} loading="lazy" />
          <div className="poster-shade" />
          <div className="card-topline">
            <span className={`status-pill ${movie.status.toLowerCase()}`}>{statusLabel[movie.status]}</span>
            <span className="rating"><Star size={12} fill="currentColor" /> {movie.rating.toFixed(1)}</span>
          </div>
          <div className="card-overlay">
            <span className="play-round"><Play size={20} fill="currentColor" /></span>
            <span className="overlay-label">مشاهده جزئیات</span>
            <p>{movie.synopsis}</p>
          </div>
          {isSeries && movie.episodeCount ? (
            <span className="episode-chip">{movie.airedEpisodes ?? 0}/{movie.episodeCount} قسمت</span>
          ) : null}
        </div>
        <div className="movie-card-info">
          <div>
            <h3>{movie.title}</h3>
            <p>{movie.originalTitle ?? (isSeries ? "سریال" : "فیلم")}</p>
          </div>
          <span className="movie-year">{movie.releaseYear}</span>
        </div>
      </Link>
    </article>
  );
}
