import { PrismaClient, MediaType, ReleaseStatus } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const genres = [
    { name: "علمی‌تخیلی", slug: "sci-fi" },
    { name: "درام", slug: "drama" },
    { name: "اکشن", slug: "action" },
    { name: "معمایی", slug: "mystery" },
  ];

  for (const genre of genres) {
    await prisma.genre.upsert({
      where: { slug: genre.slug },
      update: { name: genre.name },
      create: genre,
    });
  }

  const movies = [
    {
      slug: "interstellar",
      title: "میان‌ستاره‌ای",
      originalTitle: "Interstellar",
      synopsis: "در آینده‌ای که زمین با بحران زیست‌محیطی روبه‌رو شده، گروهی از فضانوردان برای یافتن خانه‌ای تازه برای بشر سفری فراتر از مرزهای شناخته‌شده آغاز می‌کنند.",
      posterUrl: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
      backdropUrl: "https://image.tmdb.org/t/p/w1280/xJHokMbljvjADYdit5fK5VQsXEG.jpg",
      releaseYear: 2014,
      durationMinutes: 169,
      rating: 8.7,
      type: MediaType.MOVIE,
      status: ReleaseStatus.COMPLETED,
      isFeatured: true,
      genreSlugs: ["sci-fi", "drama"],
    },
    {
      slug: "dune-part-two",
      title: "تلماسه: بخش دوم",
      originalTitle: "Dune: Part Two",
      synopsis: "پل آتریدیس در مسیر پیوستن به فرمن‌ها و مقابله با کسانی قرار می‌گیرد که خانواده‌اش را نابود کردند؛ سفری که سرنوشت یک سیاره را تغییر می‌دهد.",
      posterUrl: "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
      backdropUrl: "https://image.tmdb.org/t/p/w1280/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg",
      releaseYear: 2024,
      durationMinutes: 166,
      rating: 8.5,
      type: MediaType.MOVIE,
      status: ReleaseStatus.COMPLETED,
      isFeatured: true,
      genreSlugs: ["sci-fi", "action"],
    },
    {
      slug: "dark",
      title: "دارک",
      originalTitle: "Dark",
      synopsis: "ناپدید شدن یک کودک، چهار خانواده را وارد معمایی پیچیده می‌کند که رازهای چند نسل و ارتباط زمان را آشکار می‌سازد.",
      posterUrl: "https://image.tmdb.org/t/p/w500/apbrbWs8M9lyOpJYU5WXrpFbk1Z.jpg",
      backdropUrl: "https://image.tmdb.org/t/p/w1280/5LoHuHWA4H8jElFlZDvsmU2n63b.jpg",
      releaseYear: 2017,
      rating: 8.7,
      type: MediaType.SERIES,
      status: ReleaseStatus.COMPLETED,
      episodeCount: 26,
      airedEpisodes: 26,
      isFeatured: true,
      genreSlugs: ["sci-fi", "mystery", "drama"],
    },
    {
      slug: "severance",
      title: "سِوِرنس",
      originalTitle: "Severance",
      synopsis: "گروهی از کارمندان تحت روشی قرار گرفته‌اند که خاطرات کاری و زندگی شخصی‌شان را از هم جدا می‌کند؛ اما این جدایی آن‌قدرها هم ساده نیست.",
      posterUrl: "https://image.tmdb.org/t/p/w500/lFf6LLrQjYldcZItzOkGmMMigP7.jpg",
      backdropUrl: "https://image.tmdb.org/t/p/w1280/6oH378KUfCEitzJkm07r97L0RsZ.jpg",
      releaseYear: 2022,
      rating: 8.7,
      type: MediaType.SERIES,
      status: ReleaseStatus.AIRING,
      episodeCount: 19,
      airedEpisodes: 17,
      isFeatured: false,
      genreSlugs: ["sci-fi", "mystery", "drama"],
    },
    {
      slug: "the-batman",
      title: "بتمن",
      originalTitle: "The Batman",
      synopsis: "بتمن در دومین سال فعالیتش، با پرونده‌ای روبه‌رو می‌شود که فساد گسترده شهر گاتهام را به سطح می‌آورد.",
      posterUrl: "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg",
      backdropUrl: "https://image.tmdb.org/t/p/w1280/b0PlSFdDwbyK0cf5RxwDpaOJQvQ.jpg",
      releaseYear: 2022,
      durationMinutes: 176,
      rating: 7.8,
      type: MediaType.MOVIE,
      status: ReleaseStatus.COMPLETED,
      isFeatured: false,
      genreSlugs: ["action", "mystery"],
    },
    {
      slug: "breaking-bad",
      title: "بریکینگ بد",
      originalTitle: "Breaking Bad",
      synopsis: "یک معلم شیمی پس از تشخیص بیماری، وارد دنیای تولید مواد مخدر می‌شود؛ تصمیمی که زندگی او و اطرافیانش را دگرگون می‌کند.",
      posterUrl: "https://image.tmdb.org/t/p/w500/ztkUQFLlC19CCMYHW9o1zWhJRNq.jpg",
      backdropUrl: "https://image.tmdb.org/t/p/w1280/eSzpy96DwBujGFj0xMbXBcGcfxX.jpg",
      releaseYear: 2008,
      rating: 9.5,
      type: MediaType.SERIES,
      status: ReleaseStatus.COMPLETED,
      episodeCount: 62,
      airedEpisodes: 62,
      isFeatured: false,
      genreSlugs: ["drama", "action"],
    },
  ];

  for (const item of movies) {
    const { genreSlugs, ...data } = item;
    const movie = await prisma.movie.upsert({
      where: { slug: data.slug },
      update: data,
      create: data,
    });

    for (const slug of genreSlugs) {
      const genre = await prisma.genre.findUnique({ where: { slug } });
      if (!genre) continue;
      await prisma.movieGenre.upsert({
        where: { movieId_genreId: { movieId: movie.id, genreId: genre.id } },
        update: {},
        create: { movieId: movie.id, genreId: genre.id },
      });
    }
  }

  console.log("Seed completed: demo movies and genres are ready.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => prisma.$disconnect());
