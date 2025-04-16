'use client';
import Image from 'next/image';
import '../styles/about.css';
import { useEffect, useState } from 'react';
import { Book, School, GraduationCap, Star, Pen, ClipboardList } from 'lucide-react';

export default function AboutPage() {
  const [zoom, setZoom] = useState(1); // state untuk mengatur tingkat zoom gambar

  useEffect(() => {
    const items = document.querySelectorAll('.timeline-card');
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          } else {
            entry.target.classList.remove('visible'); // agar bisa animasi ulang saat naik/turun
          }
        });
      },
      { threshold: 0.3 }
    );
    items.forEach(item => observer.observe(item));
    return () => items.forEach(item => observer.unobserve(item));
  }, []);

  // Fungsi untuk mengatur zoom ketika gambar diklik
  const handleZoom = () => {
    setZoom(zoom === 1 ? 1.5 : 1); // toggle zoom antara 1 dan 1.5 (zoom in/out)
  };

  return (
    <main className="about-container">
      <section className="profile-section">
        <Image
          src="/images/about.jpg"
          alt="Foto Dea Pradestiawati"
          className="profile-photo"
          width={200}
          height={300}
        />
        <div className="profile-description">
          <h1>Dea Pradestiawati</h1>
          <p>
            Halo! Aku Dea, mahasiswi kelahiran Sumedang, 29 April 2005. Aku tinggal di Cimanggung dan suka membaca serta menonton film. 
            Aku punya ketertarikan dalam <strong>pengembangan web</strong> dan <strong>akuntansi</strong>. Selain itu, aku senang berorganisasi 
            dan bekerja sama dalam tim.
          </p>
        </div>
      </section>

      <section className="timeline-section">
        <h2>Pendidikan</h2>
        <div className="timeline">
          <div className="timeline-card">
            <Book className="timeline-icon" /> SDN Linggar III
          </div>
          <div className="timeline-card">
            <School className="timeline-icon" /> SMP PGRI Rancaekek
          </div>
          <div className="timeline-card">
            <GraduationCap className="timeline-icon" /> SMAN Cimanggung
          </div>
          <div className="timeline-card">
            <School className="timeline-icon" /> D3 Komputerisasi Akuntansi, Universitas Ma&#39;soem
          </div>
        </div>

        <h2>Pengalaman</h2>
        <div className="timeline">
          <div className="timeline-card portrait" onClick={handleZoom}>
            <Image 
              src="/images/smp.jpg" 
              alt="Ketua OSIS SMP" 
              className="timeline-image" 
              width={150}  // Ukuran gambar diperbesar
              height={200} // Ukuran gambar diperbesar
              style={{ transform: `scale(${zoom})`, transition: 'transform 0.3s ease' }}
            />
            <Star className="timeline-icon" /> Ketua OSIS SMP
          </div>
          <div className="timeline-card portrait" onClick={handleZoom}>
            <Image 
              src="/images/sma.jpg" 
              alt="Sekretaris Umum OSIS SMA" 
              className="timeline-image" 
              width={150} // Ukuran gambar diperbesar
              height={200} // Ukuran gambar diperbesar
              style={{ transform: `scale(${zoom})`, transition: 'transform 0.3s ease' }}
            />
            <Pen className="timeline-icon" /> Sekretaris Umum OSIS SMA
          </div>
          <div className="timeline-card portrait" onClick={handleZoom}>
            <Image 
              src="/images/kuliah.jpg"  // Gambar diubah menjadi kuliah.jpg
              alt="Sekretaris HIMA" 
              className="timeline-image" 
              width={150} // Ukuran gambar diperbesar
              height={200} // Ukuran gambar diperbesar
              style={{ transform: `scale(${zoom})`, transition: 'transform 0.3s ease' }}
            />
            <ClipboardList className="timeline-icon" /> Sekretaris HIMA
          </div>
        </div>
      </section>
    </main>
  );
}
