"use client";

import { QRCodeSVG } from "qrcode.react";
import styles from "./qr.module.css";
import { Zap } from "lucide-react";

export default function QRCodeDisplay() {
  const url = "http://13.208.49.40/submit";

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div style={{ marginBottom: '24px', color: '#4ade80' }}>
          <Zap size={48} />
        </div>
        <h1 className={styles.title}>Tham Gia Cây Điều Ước</h1>
        <p className={styles.subtitle}>
          Quét mã QR bằng camera điện thoại để thêm điều ước của bạn lên cây.
        </p>
        
        <div className={styles.qrWrapper}>
          <QRCodeSVG 
            value={url} 
            size={300} 
            bgColor={"#ffffff"} 
            fgColor={"#020c1b"} 
            level={"H"}
            includeMargin={true}
          />
        </div>
        
        <div className={styles.footer}>
          Hoặc truy cập trực tiếp:
          <span className={styles.url}>{url}</span>
        </div>
      </div>
    </div>
  );
}
