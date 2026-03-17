"use client";

import { useState, FormEvent } from "react";
import { io } from "socket.io-client";
import styles from "./submit.module.css";
import { Leaf, Star, Sparkles, Send } from "lucide-react";
import { SOCKET_SERVER_URL } from "../constants";

export default function SubmitForm() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [leafType, setLeafType] = useState("green");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Connect to backend
    const socket = io(SOCKET_SERVER_URL || window.location.origin);
    
    socket.emit("new-wish", {
      name: name.trim() || "Anonymous",
      message: message.trim(),
      leafType: leafType,
      // The server will assign id, createdAt and tree page will assign random positions
    });

    setSubmitted(true);
    
    // Disconnect after sending to save resources
    setTimeout(() => socket.disconnect(), 1000);
  };

  if (submitted) {
    return (
      <div className={styles.successContainer}>
        <div className={styles.successIcon}>✨</div>
        <h2 className={styles.successTitle}>Đã Gửi Điều Ước!</h2>
        <p className={styles.successText}>Hãy nhìn lên cây để thấy chiếc lá của bạn xuất hiện.</p>
        <button className={styles.button} onClick={() => setSubmitted(false)}>
          Gửi Thêm Một Điều Ước
        </button>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1 className={styles.title}>Gửi Điều Ước</h1>
      <p className={styles.subtitle}>Thêm thông điệp của bạn lên cây điều ước kỹ thuật số</p>

      <div className={styles.inputGroup}>
        <label htmlFor="name" className={styles.label}>Tên Của Bạn (Không Bắt Buộc)</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Chúng tôi nên gọi bạn là gì?"
          className={styles.input}
          maxLength={30}
        />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="message" className={styles.label}>Điều Ước Của Bạn *</label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Hãy viết một điều ý nghĩa..."
          className={styles.textarea}
          required
          maxLength={150}
        />
        <div className={styles.charCount}>{message.length}/150</div>
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Chọn Kiểu Lá</label>
        <div className={styles.typeSelector}>
          <button
            type="button"
            className={`${styles.typeOption} ${leafType === 'green' ? styles.activeGreen : ''}`}
            onClick={() => setLeafType('green')}
          >
            <Leaf size={24} className={styles.greenIcon} />
            <span>Truyền Thống</span>
          </button>
          
          <button
            type="button"
            className={`${styles.typeOption} ${leafType === 'gold' ? styles.activeGold : ''}`}
            onClick={() => setLeafType('gold')}
          >
            <Sparkles size={24} className={styles.goldIcon} />
            <span>Vàng</span>
          </button>

          <button
            type="button"
            className={`${styles.typeOption} ${leafType === 'star' ? styles.activeStar : ''}`}
            onClick={() => setLeafType('star')}
          >
            <Star size={24} className={styles.starIcon} />
            <span>Ngôi Sao</span>
          </button>
        </div>
      </div>

      <button type="submit" className={styles.submitButton} disabled={!message.trim()}>
        <span>Gửi Điều Ước</span>
        <Send size={18} />
      </button>
    </form>
  );
}
