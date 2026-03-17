"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import styles from "./tree.module.css";
import LeafNode from "./LeafNode";
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
      // Assign random positions if not present
      const positioned = initialWishes.map(wish => processNewWish(wish));
      setWishes(positioned);
    });

    socket.on("wish-added", (newWish: Wish) => {
      setWishes(prev => [...prev, processNewWish(newWish)]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // Helper to assign random coordinates within the "crown" of the tree
  const processNewWish = (wish: Wish) => {
    if (wish.x !== undefined && wish.y !== undefined) return wish;

    // Updated positioning for cinematic tree:
    // We want leaves clustered around the top branches (y=20 to 50) 
    // and side branches (x=10 to 90)
    
    // Choose a random branch area
    const area = Math.random();
    let x, y;

    if (area < 0.2) { // Top center cluster
      x = 50 + (Math.random() - 0.5) * 20;
      y = 25 + (Math.random() - 0.5) * 15;
    } else if (area < 0.6) { // Left branches
      x = 30 + (Math.random() - 0.5) * 35;
      y = 45 + (Math.random() - 0.5) * 25;
    } else { // Right branches
      x = 70 + (Math.random() - 0.5) * 35;
      y = 45 + (Math.random() - 0.5) * 25;
    }
    
    // Keep within bounds
    x = Math.max(10, Math.min(90, x));
    y = Math.max(15, Math.min(75, y));
    
    return { ...wish, x, y };
  };

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
        {/* Cinematic SVG Tree */}
        <svg viewBox="0 0 100 100" className={styles.treeTrunk} preserveAspectRatio="xMidYMax meet">
          <defs>
            <linearGradient id="trunkGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#4a3728" />
              <stop offset="100%" stopColor="#2d1b0d" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Main Trunk and Branches */}
          <g className={styles.treeGroup}>
            {/* Tapered Trunk (Filled Shape) */}
            <path 
              d="M42 100 Q 45 80 48 60 Q 49 40 50 20 Q 51 40 52 60 Q 55 80 58 100 Z" 
              fill="url(#trunkGradient)" 
            />
            
            {/* Left Main Branch */}
            <path 
              d="M48 65 Q 40 60 30 50 Q 20 45 15 35" 
              stroke="url(#trunkGradient)" 
              strokeWidth="4" 
              fill="none" 
              strokeLinecap="round" 
            />
            <path 
              d="M35 55 Q 30 50 25 40" 
              stroke="url(#trunkGradient)" 
              strokeWidth="2.5" 
              fill="none" 
              strokeLinecap="round" 
            />
            <path 
              d="M20 45 Q 15 45 10 40" 
              stroke="url(#trunkGradient)" 
              strokeWidth="1.5" 
              fill="none" 
              strokeLinecap="round" 
            />

            {/* Right Main Branch */}
            <path 
              d="M52 65 Q 60 60 70 50 Q 80 45 85 35" 
              stroke="url(#trunkGradient)" 
              strokeWidth="4" 
              fill="none" 
              strokeLinecap="round" 
            />
            <path 
              d="M65 55 Q 70 50 75 40" 
              stroke="url(#trunkGradient)" 
              strokeWidth="2.5" 
              fill="none" 
              strokeLinecap="round" 
            />
            <path 
              d="M80 45 Q 85 45 90 40" 
              stroke="url(#trunkGradient)" 
              strokeWidth="1.5" 
              fill="none" 
              strokeLinecap="round" 
            />

            {/* Middle Branches */}
            <path 
              d="M50 50 Q 55 40 50 30" 
              stroke="url(#trunkGradient)" 
              strokeWidth="3" 
              fill="none" 
              strokeLinecap="round" 
            />
            <path 
              d="M50 40 Q 45 35 40 25" 
              stroke="url(#trunkGradient)" 
              strokeWidth="2" 
              fill="none" 
              strokeLinecap="round" 
            />
            <path 
              d="M50 40 Q 55 35 60 25" 
              stroke="url(#trunkGradient)" 
              strokeWidth="2" 
              fill="none" 
              strokeLinecap="round" 
            />
          </g>
        </svg>

        {/* Render Leaves */}
        {wishes.map((wish) => (
          <LeafNode key={wish.id} wish={wish} />
        ))}
      </div>
    </div>
  );
}
