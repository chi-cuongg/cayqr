"use client";

import { useState, FormEvent } from "react";
import { io } from "socket.io-client";
import styles from "./submit.module.css";
import { Leaf, Star, Sparkles, Send } from "lucide-react";

export default function SubmitForm() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [leafType, setLeafType] = useState("green");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Connect to same host
    const socket = io(window.location.origin);
    
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
        <h2 className={styles.successTitle}>Wish Sent!</h2>
        <p className={styles.successText}>Look up at the tree to see your leaf appear.</p>
        <button className={styles.button} onClick={() => setSubmitted(false)}>
          Make Another Wish
        </button>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1 className={styles.title}>Make a Wish</h1>
      <p className={styles.subtitle}>Add your message to our digital tree</p>

      <div className={styles.inputGroup}>
        <label htmlFor="name" className={styles.label}>Your Name (Optional)</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="How should we call you?"
          className={styles.input}
          maxLength={30}
        />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="message" className={styles.label}>Your Wish *</label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write something meaningful..."
          className={styles.textarea}
          required
          maxLength={150}
        />
        <div className={styles.charCount}>{message.length}/150</div>
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Choose Leaf Style</label>
        <div className={styles.typeSelector}>
          <button
            type="button"
            className={`${styles.typeOption} ${leafType === 'green' ? styles.activeGreen : ''}`}
            onClick={() => setLeafType('green')}
          >
            <Leaf size={24} className={styles.greenIcon} />
            <span>Classic</span>
          </button>
          
          <button
            type="button"
            className={`${styles.typeOption} ${leafType === 'gold' ? styles.activeGold : ''}`}
            onClick={() => setLeafType('gold')}
          >
            <Sparkles size={24} className={styles.goldIcon} />
            <span>Golden</span>
          </button>

          <button
            type="button"
            className={`${styles.typeOption} ${leafType === 'star' ? styles.activeStar : ''}`}
            onClick={() => setLeafType('star')}
          >
            <Star size={24} className={styles.starIcon} />
            <span>Star</span>
          </button>
        </div>
      </div>

      <button type="submit" className={styles.submitButton} disabled={!message.trim()}>
        <span>Send Wish</span>
        <Send size={18} />
      </button>
    </form>
  );
}
