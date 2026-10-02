import Link from "next/link";
export default function NotFound() {
  return <section className="container not-found"><span className="section-kicker">خطای ۴۰۴</span><h1>این عنوان در آرشیو نیست.</h1><p>شاید آدرس اشتباه باشد یا عنوان هنوز اضافه نشده باشد.</p><Link className="primary-button" href="/browse">رفتن به آرشیو</Link></section>;
}
