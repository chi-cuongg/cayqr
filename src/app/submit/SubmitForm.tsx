"use client";

import { useState, FormEvent } from "react";
import { io } from "socket.io-client";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./submit.module.css";
import { Leaf, Star, Sparkles, Send, CheckCircle } from "lucide-react";
import { SOCKET_SERVER_URL } from "../constants";

export default function SubmitForm() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [leafType, setLeafType] = useState("green");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const socket = io(SOCKET_SERVER_URL || window.location.origin);
    
    socket.emit("new-wish", {
      name: name.trim() || "Anonymous",
      message: message.trim(),
      leafType: leafType,
    });

    setSubmitted(true);
    setTimeout(() => socket.disconnect(), 1000);
  };

  return (
    <div className={styles.container}>
      {/* Background Ambience (Same as Tree Page) */}
      <div className={styles.stars}></div>
      <div className={styles.twinkling}></div>
      <div className={styles.fogLayer}></div>

      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div 
            key="success"
            className={styles.successWrapper}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
          >
            <div className={styles.successCard}>
              <motion.div 
                className={styles.successIcon}
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: 360 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <CheckCircle size={80} color="#4ade80" />
              </motion.div>
              <h2 className={styles.successTitle}>Gửi Thành Công!</h2>
              <p className={styles.successText}>
                Lời chúc của bạn đang bay lên cây đại thụ đại diện cho những ước mơ.
              </p>
              
              {/* Animated flying leaf placeholder */}
              <motion.div 
                className={styles.flyingLeaf}
                initial={{ y: 0, opacity: 1 }}
                animate={{ y: -200, opacity: 0 }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
              >
                {leafType === 'green' && <Leaf size={32} color="#4ade80" fill="#22c55e" />}
                {leafType === 'gold' && <Sparkles size={32} color="#fbbf24" fill="#f59e0b" />}
                {leafType === 'star' && <Star size={32} color="#a78bfa" fill="#8b5cf6" />}
              </motion.div>

              <button className={styles.button} onClick={() => {
                setSubmitted(false);
                setMessage("");
              }}>
                Gửi Thêm Một Điều Ước
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.form 
            key="form"
            className={styles.form} 
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className={styles.formContent}>
              <h1 className={styles.title}>Gửi Điều Ước</h1>
              <p className={styles.subtitle}>Thắp sáng cây kỳ diệu bằng lời chúc của bạn</p>

              <div className={styles.inputGroup}>
                <label htmlFor="name" className={styles.label}>Tên Của Bạn</label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Để trống nếu muốn ẩn danh"
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
                  placeholder="Hãy viết điều bạn hằng mong ước..."
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
                    <Leaf size={24} strokeWidth={1.5} />
                    <span>Truyền Thống</span>
                  </button>
                  
                  <button
                    type="button"
                    className={`${styles.typeOption} ${leafType === 'gold' ? styles.activeGold : ''}`}
                    onClick={() => setLeafType('gold')}
                  >
                    <Sparkles size={24} strokeWidth={1.5} />
                    <span>Vàng</span>
                  </button>

                  <button
                    type="button"
                    className={`${styles.typeOption} ${leafType === 'star' ? styles.activeStar : ''}`}
                    onClick={() => setLeafType('star')}
                  >
                    <Star size={24} strokeWidth={1.5} />
                    <span>Ngôi Sao</span>
                  </button>
                </div>
              </div>

              <button type="submit" className={styles.submitButton} disabled={!message.trim()}>
                <span>Gửi Điều Ước</span>
                <Send size={18} />
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
