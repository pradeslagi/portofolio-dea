// HomePage.js
'use client';
import './styles/homepage.css';
import { Star, Heart, Candy, Sparkles, Moon, Flower, Sun, IceCream, Lollipop } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect } from 'react';

export default function HomePage() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
          } else {
            entry.target.style.opacity = 0;
            entry.target.style.transform = 'translateY(30px)';
          }
        });
      },
      { threshold: 0.2 }
    );

    const targets = document.querySelectorAll('.reveal-on-scroll');

    targets.forEach(target => {
      target.style.opacity = 0;
      target.style.transform = 'translateY(30px)';
      target.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      observer.observe(target);
    });

    return () => {
      targets.forEach(target => observer.unobserve(target));
    };
  }, []);

  return (
    <main>
      <section className="hero-section reveal-on-scroll">
      <div className="floating-icons">
  <Star className="floating-icon icon-1" />
  <Heart className="floating-icon icon-2" />
  <Candy className="floating-icon icon-3" />
  <Sparkles className="floating-icon icon-4" />
  <Moon className="floating-icon icon-5" />
  <Flower className="floating-icon icon-6" />
  <Sun className="floating-icon icon-7" />
  <IceCream className="floating-icon icon-8" />
  <Lollipop className="floating-icon icon-9" />
</div>


        <div className="hero-content">
          <h1 className="hero-title">Hii, I&#39;m Dey 👋</h1>
          <p className="hero-subtitle">
            Mahasiswi yang senang membangun tampilan web yang menarik dan fungsional — dengan sentuhan manis dan penuh semangat!
          </p>
          <Link href="/about" className="hero-button">
            Kenalan Lebih Lanjut ✨
          </Link>
          <div className="scroll-indicator">↓</div>
        </div>
      </section>

      <section className="about-section reveal-on-scroll">
        <Image
          src="/images/profil-dea.jpg"
          alt="Foto Dea Pradestiawati"
          className="about-photo"
          width={200}
          height={300}
        />
        <div className="about-text">
          <p>
            Hai! Aku <strong>Dea Pradestiawati</strong>, mahasiswi komputerisasi akuntansi asal Sumedang yang suka
            membaca dan menonton di waktu luang. Aku tertarik pada <strong>pengembangan web</strong> dan <strong>akuntansi</strong>, serta terbiasa bekerja dalam tim.
          </p>
        </div>
      </section>
    </main>
  );
}
