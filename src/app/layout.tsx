import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "سینوا | سینما، یک قدم نزدیک‌تر",
  description: "دنیای فیلم و سریال؛ جست‌وجو، اطلاعات، قسمت‌ها و راهنمای تماشا.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <Header />
        <main>{children}</main>
        <footer className="site-footer">
          <div className="container footer-inner">
            <span className="brand footer-brand">سینوا<span className="brand-dot">.</span></span>
            <p>برای قصه‌هایی که بعد از تیتراژ هم ادامه دارند.</p>
            <span className="footer-copy">© {new Date().getFullYear()} سینوا</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
