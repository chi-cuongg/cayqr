"use client";

import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import styles from "./qr.module.css";
import { Zap } from "lucide-react";

export default function QRCodeDisplay() {
  const [url, setUrl] = useState("");

  useEffect(() => {
    // Generate URL dynamically based on where the app is hosted
    setUrl(`${window.location.origin}/submit`);
  }, []);

  if (!url) {
    return <div className={styles.container}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div style={{ marginBottom: '24px', color: '#4ade80' }}>
          <Zap size={48} />
        </div>
        <h1 className={styles.title}>Join the Wish Tree</h1>
        <p className={styles.subtitle}>
          Scan the QR code with your phone camera to add your wish to our live tree.
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
          Or visit directly:
          <span className={styles.url}>{url}</span>
        </div>
      </div>
    </div>
  );
}
