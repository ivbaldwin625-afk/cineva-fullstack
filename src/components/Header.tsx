import Link from "next/link";
import { Clapperboard, Search, Heart } from "lucide-react";

export function Header() {
  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <Link href="/" className="brand" aria-label="سینوا، صفحه اصلی">
          <span className="brand-mark"><Clapperboard size={21} /></span>
          <span>سینوا<span className="brand-dot">.</span></span>
        </Link>
        <nav className="main-nav" aria-label="ناوبری اصلی">
          <Link href="/">خانه</Link>
          <Link href="/browse?type=MOVIE">فیلم‌ها</Link>
          <Link href="/browse?type=SERIES">سریال‌ها</Link>
          <a href="#latest">تازه‌ها</a>
        </nav>
        <div className="nav-actions">
          <Link href="/browse" className="icon-button" aria-label="جست‌وجو"><Search size={19} /></Link>
          <Link href="/support" className="support-button"><Heart size={16} /> حمایت</Link>
        </div>
      </div>
    </header>
  );
}
