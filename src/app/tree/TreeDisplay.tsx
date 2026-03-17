"use client";

import { useEffect, useState, useCallback } from "react";
import { io } from "socket.io-client";
import styles from "./tree.module.css";
import LeafNode from "./LeafNode";
import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";
import { SOCKET_SERVER_URL } from "../constants";

export type Wish = {
  id: string;
  name: string;
  message: string;
  leafType: "green" | "gold" | "star";
  createdAt: string;
  x?: number;
  y?: number;
};

export default function TreeDisplay() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [socketConnected, setSocketConnected] = useState(false);

  // Socket.io connection
  useEffect(() => {
    const socket = io(SOCKET_SERVER_URL || window.location.origin);

    socket.on("connect", () => {
      setSocketConnected(true);
      console.log("Connected to server");
    });

    socket.on("disconnect", () => {
      setSocketConnected(false);
      console.log("Disconnected from server");
    });

    socket.on("initial-wishes", (initialWishes: Wish[]) => {
      const positioned = initialWishes.map(wish => processNewWish(wish));
      setWishes(positioned);
    });

    socket.on("wish-added", (newWish: Wish) => {
      setWishes(prev => [...prev, processNewWish(newWish)]);
    });

    return () => {
      socket.disconnect();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Position leaves around the tree crown area
  const processNewWish = useCallback((wish: Wish) => {
    if (wish.x !== undefined && wish.y !== undefined) return wish;

    // The tree image crown area is roughly:
    // x: 15% to 85% (branches spread wide)
    // y: 5% to 55% (top half of the tree area)
    const area = Math.random();
    let x, y;

    if (area < 0.25) {
      // Top center
      x = 50 + (Math.random() - 0.5) * 25;
      y = 10 + Math.random() * 15;
    } else if (area < 0.5) {
      // Left branches
      x = 20 + Math.random() * 20;
      y = 20 + Math.random() * 25;
    } else if (area < 0.75) {
      // Right branches
      x = 60 + Math.random() * 20;
      y = 20 + Math.random() * 25;
    } else {
      // Mid area
      x = 35 + Math.random() * 30;
      y = 25 + Math.random() * 20;
    }

    x = Math.max(10, Math.min(90, x));
    y = Math.max(5, Math.min(55, y));

    return { ...wish, x, y };
  }, []);

  const handleReset = () => {
    if (confirm("Bạn có chắc chắn muốn xóa tất cả các điều ước không?")) {
      const socket = io(SOCKET_SERVER_URL || window.location.origin);
      socket.emit("reset-tree");
      setTimeout(() => socket.disconnect(), 1000);
    }
  };

  return (
    <div className={styles.container}>
      {/* Background Ambience */}
      <div className={styles.stars}></div>
      <div className={styles.twinkling}></div>
      
      {/* Atmospheric fog layer */}
      <div className={styles.fogLayer}></div>

      {/* QR Code Overlay */}
      <div className={styles.qrOverlay}>
        <div className={styles.qrHeader}>Quét để gửi điều ước</div>
        <div className={styles.qrBox}>
          <QRCodeSVG 
            value="https://cayqr-1.onrender.com/submit"
            size={140}
            bgColor={"#ffffff"}
            fgColor={"#020c1b"}
            level={"M"}
            includeMargin={true}
          />
        </div>
        <div className={styles.qrUrl}>cayqr-1.onrender.com/submit</div>
      </div>

      {/* Header info */}
      <div className={styles.header}>
        <div className={styles.status}>
          {socketConnected ? (
            <span className={styles.online}>● Trực Tuyến</span>
          ) : (
             <span className={styles.offline}>● Mất Kết Nối</span>
          )}
        </div>
        <div className={styles.counter}>
          Tổng Số Điều Ước: <span>{wishes.length}</span>
        </div>
        <button onClick={handleReset} className={styles.adminButton}>
          Làm Mới
        </button>
      </div>

      <div className={styles.treeArea}>
        {/* Tree Image */}
        <div className={styles.treeImageWrapper}>
          <Image 
            src="/cay.png" 
            alt="Cây Điều Ước" 
            fill
            className={styles.treeImage}
            priority
            draggable={false}
          />
        </div>

        {/* Render Leaves (overlay on top of tree image) */}
        {wishes.map((wish) => (
          <LeafNode key={wish.id} wish={wish} />
        ))}
      </div>
    </div>
  );
}
