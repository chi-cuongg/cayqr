"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import styles from "./tree.module.css";
import LeafNode from "./LeafNode";

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
    const socket = io(window.location.origin);

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
    
    // We imagine a tree crown roughly elliptical in the center
    // Coordinates relative to a container of say 100% width and height
    // Center at x=50, y=40, rx=35, ry=30
    
    const angle = Math.random() * Math.PI * 2;
    const radiusX = Math.random() * 35;
    const radiusY = Math.random() * 30;
    
    const x = 50 + radiusX * Math.cos(angle);
    const y = 40 + radiusY * Math.sin(angle);
    
    return { ...wish, x, y };
  };

  const handleReset = () => {
    if (confirm("Are you sure you want to clear all wishes?")) {
      const socket = io(window.location.origin);
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
            <span className={styles.online}>● Live</span>
          ) : (
             <span className={styles.offline}>● Disconnected</span>
          )}
        </div>
        <div className={styles.counter}>
          Total Wishes: <span>{wishes.length}</span>
        </div>
        <button onClick={handleReset} className={styles.adminButton}>
          Reset
        </button>
      </div>

      <div className={styles.treeArea}>
        {/* Simple SVG Tree Trunk */}
        <svg viewBox="0 0 100 100" className={styles.treeTrunk} preserveAspectRatio="xMidYMax meet">
          <path 
            d="M50 100 C 45 80, 48 70, 48 60 C 42 50, 30 40, 20 30 M48 60 C 52 50, 65 40, 75 35 M50 100 C 55 80, 52 70, 52 60 C 52 50, 50 40, 50 25 M52 60 C 60 55, 75 50, 85 40" 
            stroke="#2d1b0d" 
            strokeWidth="4" 
            fill="none" 
            strokeLinecap="round"
          />
        </svg>

        {/* Render Leaves */}
        {wishes.map((wish) => (
          <LeafNode key={wish.id} wish={wish} />
        ))}
      </div>
    </div>
  );
}
