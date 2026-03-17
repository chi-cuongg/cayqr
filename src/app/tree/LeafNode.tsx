"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Wish } from "./TreeDisplay";
import styles from "./tree.module.css";
import { Leaf, Star, Sparkles } from "lucide-react";

export default function LeafNode({ wish }: { wish: Wish }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isNew, setIsNew] = useState(false);
  
  // Decide if this is a newly added leaf (mounted within last 2 seconds)
  useEffect(() => {
    const age = Date.now() - new Date(wish.createdAt).getTime();
    if (age < 2000) {
      setIsNew(true);
      setShowTooltip(true); // Show tooltip automatically for new wishes
      
      const timer = setTimeout(() => {
        setIsNew(false);
        setShowTooltip(false);
      }, 5000); // Hide after 5 seconds
      
      return () => clearTimeout(timer);
    }
  }, [wish.createdAt]);

  const x = wish.x || 50;
  const y = wish.y || 40;

  // Render appropriate icon based on leafType
  const renderShape = () => {
    switch(wish.leafType) {
      case "gold":
        return <Sparkles className={styles.goldLeaf} fill="#f59e0b" color="#fbbf24" strokeWidth={1} />;
      case "star":
        return <Star className={styles.starLeaf} fill="#8b5cf6" color="#a78bfa" strokeWidth={1} />;
      case "green":
      default:
        return <Leaf className={styles.greenLeaf} fill="#22c55e" color="#4ade80" strokeWidth={1} />;
    }
  };

  return (
    <div 
      className={styles.leafContainer}
      style={{ left: `${x}%`, top: `${y}%` }}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => !isNew && setShowTooltip(false)}
    >
      {/* Floating text for brand new wishes */}
      {isNew && (
        <motion.div 
          className={styles.floatUpMessage}
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, type: "spring" }}
        >
          {wish.message}
        </motion.div>
      )}

      {/* The Leaf Icon */}
      <motion.div
        className={styles.leafWrapper}
        initial={{ scale: 0, opacity: 0, rotate: Math.random() * 180 - 90 }}
        animate={{ 
          scale: 1, 
          opacity: 1, 
          rotate: Math.random() * 40 - 20 
        }}
        transition={{ 
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: Math.random() * 0.5 
        }}
        whileHover={{ scale: 1.5, zIndex: 50 }}
      >
        {renderShape()}
      </motion.div>

      {/* Tooltip on hover or when new */}
      <motion.div 
        className={styles.tooltip}
        initial={{ opacity: 0, y: 10 }}
        animate={{ 
          opacity: showTooltip && !isNew ? 1 : 0, 
          y: showTooltip && !isNew ? 0 : 10,
          pointerEvents: showTooltip && !isNew ? 'auto' : 'none'
        }}
        transition={{ duration: 0.2 }}
      >
        <p className={styles.tooltipMsg}>"{wish.message}"</p>
        {wish.name && wish.name !== "Anonymous" && (
          <p className={styles.tooltipName}>- {wish.name}</p>
        )}
      </motion.div>
    </div>
  );
}
