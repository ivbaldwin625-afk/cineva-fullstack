import Link from "next/link";
import { ArrowRight, HeartHandshake, ShieldCheck } from "lucide-react";

export default function SupportPage() {
  return (
    <section className="container support-page">
      <Link href="/" className="back-link dark-back"><ArrowRight size={16} /> برگشت به خانه</Link>
      <div className="support-hero-card">
        <div className="support-emblem"><HeartHandshake size={30} /></div>
        <span className="section-kicker">همراه سینوا</span>
        <h1>برای ادامه‌ی این قصه، کنار ما باش.</h1>
        <p>حمایت مالی در نسخه فعلی نمایشی است. اتصال به درگاه پرداخت، ثبت تراکنش و تأیید سمت سرور پیش از دریافت وجه باید به‌صورت امن پیاده‌سازی شود.</p>
        <div className="support-security"><ShieldCheck size={17} /> در این نسخه هیچ پرداخت واقعی انجام نمی‌شود.</div>
        <Link href="/" className="primary-button">بازگشت به سینوا <ArrowRight size={17} /></Link>
      </div>
    </section>
  );
}
