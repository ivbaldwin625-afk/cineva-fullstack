export type MovieCardData = {
  id: string;
  slug: string;
  title: string;
  originalTitle?: string | null;
  synopsis: string;
  posterUrl: string;
  backdropUrl?: string | null;
  releaseYear: number;
  durationMinutes?: number | null;
  rating: number;
  type: "MOVIE" | "SERIES";
  status: "AIRING" | "COMPLETED" | "UPCOMING";
  episodeCount?: number | null;
  airedEpisodes?: number | null;
  isFeatured: boolean;
  genres?: { genre: { name: string } }[];
};

export const demoMovies: MovieCardData[] = [
  {
    id: "demo-1", slug: "interstellar", title: "میان‌ستاره‌ای", originalTitle: "Interstellar",
    synopsis: "در آینده‌ای که زمین با بحران روبه‌رو شده، گروهی از فضانوردان برای یافتن خانه‌ای تازه برای بشر سفری فراتر از مرزهای شناخته‌شده آغاز می‌کنند.",
    posterUrl: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/w1280/xJHokMbljvjADYdit5fK5VQsXEG.jpg",
    releaseYear: 2014, durationMinutes: 169, rating: 8.7, type: "MOVIE", status: "COMPLETED", isFeatured: true,
    genres: [{ genre: { name: "علمی‌تخیلی" } }, { genre: { name: "درام" } }]
  },
  {
    id: "demo-2", slug: "dune-part-two", title: "تلماسه: بخش دوم", originalTitle: "Dune: Part Two",
    synopsis: "پل آتریدیس در مسیر پیوستن به فرمن‌ها و مقابله با کسانی قرار می‌گیرد که خانواده‌اش را نابود کردند.",
    posterUrl: "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/w1280/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg",
    releaseYear: 2024, durationMinutes: 166, rating: 8.5, type: "MOVIE", status: "COMPLETED", isFeatured: true,
    genres: [{ genre: { name: "علمی‌تخیلی" } }, { genre: { name: "اکشن" } }]
  },
  {
    id: "demo-3", slug: "dark", title: "دارک", originalTitle: "Dark",
    synopsis: "ناپدید شدن یک کودک، چهار خانواده را وارد معمایی پیچیده می‌کند که رازهای چند نسل و ارتباط زمان را آشکار می‌سازد.",
    posterUrl: "https://image.tmdb.org/t/p/w500/apbrbWs8M9lyOpJYU5WXrpFbk1Z.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/w1280/5LoHuHWA4H8jElFlZDvsmU2n63b.jpg",
    releaseYear: 2017, rating: 8.7, type: "SERIES", status: "COMPLETED", episodeCount: 26, airedEpisodes: 26, isFeatured: true,
    genres: [{ genre: { name: "معمایی" } }, { genre: { name: "علمی‌تخیلی" } }]
  },
  {
    id: "demo-4", slug: "severance", title: "سِوِرنس", originalTitle: "Severance",
    synopsis: "گروهی از کارمندان با روشی روبه‌رو هستند که خاطرات کاری و زندگی شخصی‌شان را از هم جدا می‌کند.",
    posterUrl: "https://image.tmdb.org/t/p/w500/lFf6LLrQjYldcZItzOkGmMMigP7.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/w1280/6oH378KUfCEitzJkm07r97L0RsZ.jpg",
    releaseYear: 2022, rating: 8.7, type: "SERIES", status: "AIRING", episodeCount: 19, airedEpisodes: 17, isFeatured: false,
    genres: [{ genre: { name: "معمایی" } }, { genre: { name: "درام" } }]
  },
  {
    id: "demo-5", slug: "the-batman", title: "بتمن", originalTitle: "The Batman",
    synopsis: "بتمن در دومین سال فعالیتش، با پرونده‌ای روبه‌رو می‌شود که فساد گسترده شهر گاتهام را به سطح می‌آورد.",
    posterUrl: "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/w1280/b0PlSFdDwbyK0cf5RxwDpaOJQvQ.jpg",
    releaseYear: 2022, durationMinutes: 176, rating: 7.8, type: "MOVIE", status: "COMPLETED", isFeatured: false,
    genres: [{ genre: { name: "اکشن" } }, { genre: { name: "معمایی" } }]
  },
  {
    id: "demo-6", slug: "breaking-bad", title: "بریکینگ بد", originalTitle: "Breaking Bad",
    synopsis: "یک معلم شیمی پس از تشخیص بیماری، وارد دنیای تولید مواد مخدر می‌شود؛ تصمیمی که زندگی او را دگرگون می‌کند.",
    posterUrl: "https://image.tmdb.org/t/p/w500/ztkUQFLlC19CCMYHW9o1zWhJRNq.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/w1280/eSzpy96DwBujGFj0xMbXBcGcfxX.jpg",
    releaseYear: 2008, rating: 9.5, type: "SERIES", status: "COMPLETED", episodeCount: 62, airedEpisodes: 62, isFeatured: false,
    genres: [{ genre: { name: "درام" } }, { genre: { name: "اکشن" } }]
  }
];
