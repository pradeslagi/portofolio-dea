'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Code2, Paintbrush2, Smartphone } from 'lucide-react';
import '../styles/portfolio.css'; // Impor file CSS
import { motion } from 'framer-motion';

const projects = [
  {
    title: 'Website Portofolio',
    description:
      'Situs pribadi bertema minimalis dan interaktif, dilengkapi dark/light mode, animasi scroll, dan chatbot AI dengan Gemini.',
    image: '/images/website.jpg',
    tech: ['React.js', 'Next.js', 'Tailwind CSS', 'Firebase'],
    link: '/',
    icon: <Paintbrush2 size={18} />,
  },
  {
    title: 'Jasa Akuntansi',
    description:
      'Jasa Akuntansi yang siap bantu catat, kelola dan laporan keuangan bisnismu dengan rapih.',
    image: '/images/accounting.jpg',
    tech: ['PHP', 'Firebase', 'HTML/CSS'],
    link: '#',
    icon: <Code2 size={18} />,
  },
  {
    title: 'Aplikasi E-commerce',
    description:
      'Platform belanja online dengan fitur login, checkout, CRUD produk, dan migrasi database dari MySQL ke Firebase.',
    image: '/images/commerce.jpg',
    tech: ['PHP', 'Firebase', 'Bootstrap'],
    link: '#',
    icon: <Smartphone size={18} />,
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function PortfolioPage() {
  return (
    <main className="portfolio-section">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        🌸 My Project Showcase
      </motion.h1>

      <div className="project-grid">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            className="project-card"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <Image
              src={project.image}
              alt={project.title}
              width={600}
              height={350}
              className="project-image"
            />
            <h2 className="project-title">
              {project.icon} {project.title}
            </h2>
            <p className="project-description">{project.description}</p>
            <div className="project-tech">{project.tech.join(' • ')}</div>
            <Link href={project.link} className="project-link" target="_blank">
              Lihat Proyek <ExternalLink size={16} />
            </Link>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
