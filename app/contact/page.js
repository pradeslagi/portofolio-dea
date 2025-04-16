'use client';

import { useState, useEffect } from 'react';
import { database } from '../firebase_connection';
import { ref, push, onValue } from 'firebase/database';
import '../styles/contact.css';

export default function ContactPage() {
  // STATE
  const [feedback, setFeedback] = useState({ name: '', email: '', message: '' });
  const [comment, setComment] = useState({ name: '', text: '' });
  const [rating, setRating] = useState({ name: '', value: 0 });
  const [comments, setComments] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const [feedbackList, setFeedbackList] = useState([]);

  // HANDLE SUBMIT
  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    push(ref(database, 'feedback'), feedback);
    setFeedbackList((prev) => [...prev, feedback]); // langsung tambahkan ke list
    setFeedback({ name: '', email: '', message: '' });
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    push(ref(database, 'comments'), comment);
    setComment({ name: '', text: '' });
  };

  const handleRatingSubmit = (e) => {
    e.preventDefault();
    push(ref(database, 'ratings'), rating);
    setRating({ name: '', value: 0 });
  };

  // FIREBASE READ
  useEffect(() => {
    const feedbackRef = ref(database, 'feedback');
    onValue(feedbackRef, (snapshot) => {
      const data = snapshot.val() || {};
      const list = Object.values(data);
      setFeedbackList(list);
    });

    const commentsRef = ref(database, 'comments');
    onValue(commentsRef, (snapshot) => {
      const data = snapshot.val() || {};
      const list = Object.values(data);
      setComments(list);
    });

    const ratingsRef = ref(database, 'ratings');
    onValue(ratingsRef, (snapshot) => {
      const data = snapshot.val() || {};
      const list = Object.values(data);
      setRatings(list);

      // Hitung rata-rata rating
      const total = list.reduce((sum, r) => sum + Number(r.value), 0);
      const avg = list.length ? (total / list.length).toFixed(1) : 0;
      setAvgRating(avg);
    });
  }, []);

  return (
    <main className="contact-page">
      <h1>🌸 Hubungi Aku</h1>

      {/* Masukan & Kritik */}
      <section className="contact-section">
        <h2>Masukan & Kritik</h2>
        <form onSubmit={handleFeedbackSubmit}>
          <input
            type="text"
            placeholder="Nama"
            value={feedback.name}
            onChange={(e) => setFeedback({ ...feedback, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={feedback.email}
            onChange={(e) => setFeedback({ ...feedback, email: e.target.value })}
            required
          />
          <textarea
            placeholder="Pesanmu..."
            value={feedback.message}
            onChange={(e) => setFeedback({ ...feedback, message: e.target.value })}
            required
          ></textarea>
          <button type="submit">Kirim</button>
        </form>

        {/* Menampilkan Daftar Feedback */}
        <div className="feedback-list">
          <h3>Masukan yang masuk:</h3>
          {feedbackList.map((f, i) => (
            <div key={i} className="feedback-item">
              <p><strong>{f.name}</strong> ({f.email}):</p>
              <p>{f.message}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Komentar */}
      <section className="contact-section">
        <h2>Komentar</h2>
        <form onSubmit={handleCommentSubmit}>
          <input
            type="text"
            placeholder="Nama"
            value={comment.name}
            onChange={(e) => setComment({ ...comment, name: e.target.value })}
            required
          />
          <textarea
            placeholder="Komentarmu..."
            value={comment.text}
            onChange={(e) => setComment({ ...comment, text: e.target.value })}
            required
          ></textarea>
          <button type="submit">Kirim Komentar</button>
        </form>

        {/* Menampilkan Daftar Komentar */}
        <div className="comment-list">
          {comments.map((c, i) => (
            <div key={i} className="comment-item">
              <strong>{c.name}</strong>: {c.text}
            </div>
          ))}
        </div>
      </section>

      {/* Rating */}
      <section className="contact-section">
        <h2>Rating</h2>
        <form onSubmit={handleRatingSubmit}>
          <input
            type="text"
            placeholder="Nama"
            value={rating.name}
            onChange={(e) => setRating({ ...rating, name: e.target.value })}
            required
          />
          <select
            value={rating.value}
            onChange={(e) => setRating({ ...rating, value: e.target.value })}
            required
          >
            <option value="">Pilih Rating</option>
            {[1, 2, 3, 4, 5].map((val) => (
              <option key={val} value={val}>{val} ⭐</option>
            ))}
          </select>
          <button type="submit">Kirim Rating</button>
        </form>
        <p><strong>Rata-rata Rating: {avgRating} ⭐</strong></p>
        <ul className="rating-list">
          {ratings.map((r, i) => (
            <li key={i}>{r.name}: {r.value} ⭐</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
