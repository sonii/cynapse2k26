import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import './SciFiUI.css';

interface SciFiUIProps {
  isRevealed: boolean;
}

const SciFiUI = ({ isRevealed }: SciFiUIProps) => {
  const [statusText, setStatusText] = useState('INITIALIZING...');

  useEffect(() => {
    if (!isRevealed) return;
    
    const texts = ['STATUS: READY', 'SYSTEMS ONLINE', 'CYNAPSE ACTIVE', 'AWAITING INPUT'];
    let index = 0;
    
    const interval = setInterval(() => {
      index = (index + 1) % texts.length;
      setStatusText(texts[index]);
    }, 4000);

    return () => clearInterval(interval);
  }, [isRevealed]);

  const borderVariants = {
    hidden: { scaleX: 0, opacity: 0 },
    visible: { 
      scaleX: 1, 
      opacity: 1,
      transition: { duration: 0.4, ease: [0.33, 1, 0.68, 1] as const }
    }
  };

  const verticalBorderVariants = {
    hidden: { scaleY: 0, opacity: 0 },
    visible: { 
      scaleY: 1, 
      opacity: 1,
      transition: { duration: 0.4, ease: [0.33, 1, 0.68, 1] as const, delay: 0.1 }
    }
  };

  const cornerVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (i: number) => ({ 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.2, delay: 0.2 + i * 0.03, ease: [0.33, 1, 0.68, 1] as const }
    })
  };

  const circleVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (i: number) => ({ 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.15, delay: 0.3 + i * 0.02, ease: [0.33, 1, 0.68, 1] as const }
    })
  };

  return (
    <div className="scifi-ui fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {/* Top curved border SVG */}
      <motion.div 
        className="scifi-border-top absolute top-0 left-1/2 -translate-x-1/2 w-[620px] h-[30px]"
        initial={{ y: -30, opacity: 0 }}
        animate={isRevealed ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.3, delay: 0.15, ease: [0.33, 1, 0.68, 1] }}
      >
        <svg viewBox="0 0 620 30" className="w-full h-full fill-scifi-teal">
          <path d="M628.587,25.19l-7.963-13.811h-0.008L617.525,6.03A12.244,12.244,0,0,0,607.74.994H409.994V0h198.43c4.149,0,8.2,2.1,9.748,4.781l2.949,5.089h0.028l8.086,14.062A12.237,12.237,0,0,0,639.03,29h80.976v0.006h77.735a12.243,12.243,0,0,0,9.784-5.037l3.091-5.348h0.008l7.963-13.811C820.142,2.113,824.192,0,828.345,0H1029.99V1H829.029a12.237,12.237,0,0,0-9.794,5.068L811.15,20.131h-0.029l-2.948,5.089C806.618,27.9,802.573,30,798.424,30H638.345C634.192,30,630.142,27.887,628.587,25.19Z" transform="translate(-410)"/>
        </svg>
        <span className="absolute left-1/2 -translate-x-1/2 bottom-[-1px] w-3 h-[3px] bg-scifi-red" />
      </motion.div>

      {/* Bottom curved border */}
      <motion.div 
        className="scifi-border-bottom absolute bottom-0 left-1/2 -translate-x-1/2 w-[50vw] rotate-180"
        initial={{ y: 30, opacity: 0 }}
        animate={isRevealed ? { y: 0, opacity: 0.3 } : {}}
        transition={{ duration: 0.3, delay: 0.15, ease: [0.33, 1, 0.68, 1] }}
      >
        <svg viewBox="0 0 620 30" className="w-full h-full fill-scifi-teal">
          <path d="M628.587,25.19l-7.963-13.811h-0.008L617.525,6.03A12.244,12.244,0,0,0,607.74.994H409.994V0h198.43c4.149,0,8.2,2.1,9.748,4.781l2.949,5.089h0.028l8.086,14.062A12.237,12.237,0,0,0,639.03,29h80.976v0.006h77.735a12.243,12.243,0,0,0,9.784-5.037l3.091-5.348h0.008l7.963-13.811C820.142,2.113,824.192,0,828.345,0H1029.99V1H829.029a12.237,12.237,0,0,0-9.794,5.068L811.15,20.131h-0.029l-2.948,5.089C806.618,27.9,802.573,30,798.424,30H638.345C634.192,30,630.142,27.887,628.587,25.19Z" transform="translate(-410)"/>
        </svg>
      </motion.div>

      {/* Horizontal cross lines */}
      <motion.div 
        className="absolute top-1/2 left-0 right-0 h-px bg-scifi-light/10"
        variants={borderVariants}
        initial="hidden"
        animate={isRevealed ? "visible" : "hidden"}
      />

      {/* Vertical center line */}
      <motion.div 
        className="absolute top-[10vh] bottom-[10vh] left-1/2 w-px bg-scifi-light/10"
        variants={verticalBorderVariants}
        initial="hidden"
        animate={isRevealed ? "visible" : "hidden"}
        style={{ transformOrigin: 'center' }}
      >
        {/* Top dot */}
        <motion.div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-scifi-light/50"
          initial={{ opacity: 0 }}
          animate={isRevealed ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
        />
        {/* Bottom dot */}
        <motion.div 
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-scifi-light/50"
          initial={{ opacity: 0 }}
          animate={isRevealed ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
        />
      </motion.div>

      {/* Diagonal lines */}
      <motion.div 
        className="absolute top-[10%] bottom-[10%] left-1/2 w-px bg-scifi-light/10 origin-center"
        style={{ transform: 'rotate(20deg)' }}
        initial={{ scaleY: 0, opacity: 0 }}
        animate={isRevealed ? { scaleY: 1, opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.1, ease: [0.33, 1, 0.68, 1] }}
      />
      <motion.div 
        className="absolute top-[10%] bottom-[10%] left-1/2 w-px bg-scifi-light/10 origin-center"
        style={{ transform: 'rotate(-20deg)' }}
        initial={{ scaleY: 0, opacity: 0 }}
        animate={isRevealed ? { scaleY: 1, opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.1, ease: [0.33, 1, 0.68, 1] }}
      />

      {/* Left vertical border */}
      <motion.div 
        className="absolute top-[10vh] bottom-[10vh] left-[3vw] w-px"
        variants={verticalBorderVariants}
        initial="hidden"
        animate={isRevealed ? "visible" : "hidden"}
        style={{ transformOrigin: 'center' }}
      >
        <div className="absolute inset-0 bg-scifi-teal/30" />
        {/* Top cap */}
        <motion.div 
          className="absolute -top-[2vh] left-[-5px] border-4 border-transparent border-t-scifi-red"
          initial={{ opacity: 0 }}
          animate={isRevealed ? { opacity: 1 } : {}}
          transition={{ delay: 0.35 }}
        />
        {/* Bottom cap */}
        <motion.div 
          className="absolute -bottom-[2vh] left-[-5px] border-4 border-transparent border-b-scifi-red"
          initial={{ opacity: 0 }}
          animate={isRevealed ? { opacity: 1 } : {}}
          transition={{ delay: 0.35 }}
        />
        {/* Battery indicator */}
        <motion.span 
          className="absolute top-1/2 -translate-y-1/2 -left-[1px] w-[3px] h-3 bg-scifi-red"
          initial={{ opacity: 0 }}
          animate={isRevealed ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
        />
      </motion.div>

      {/* Right vertical border */}
      <motion.div 
        className="absolute top-[10vh] bottom-[10vh] right-[3vw] w-px"
        variants={verticalBorderVariants}
        initial="hidden"
        animate={isRevealed ? "visible" : "hidden"}
        style={{ transformOrigin: 'center' }}
      >
        <div className="absolute inset-0 bg-scifi-teal/30" />
        {/* Top cap */}
        <motion.div 
          className="absolute -top-[2vh] right-[-5px] border-4 border-transparent border-t-scifi-red"
          initial={{ opacity: 0 }}
          animate={isRevealed ? { opacity: 1 } : {}}
          transition={{ delay: 0.35 }}
        />
        {/* Bottom cap */}
        <motion.div 
          className="absolute -bottom-[2vh] right-[-5px] border-4 border-transparent border-b-scifi-red"
          initial={{ opacity: 0 }}
          animate={isRevealed ? { opacity: 1 } : {}}
          transition={{ delay: 0.35 }}
        />
        {/* Battery indicator */}
        <motion.span 
          className="absolute top-1/2 -translate-y-1/2 -right-[1px] w-[3px] h-3 bg-scifi-red"
          initial={{ opacity: 0 }}
          animate={isRevealed ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
        />
      </motion.div>

      {/* Corner decorations */}
      {[
        { position: 'top-[7vh] left-[5vw]', rotation: 0 },
        { position: 'top-[7vh] right-[5vw]', rotation: 90 },
        { position: 'bottom-[7vh] right-[5vw]', rotation: 180 },
        { position: 'bottom-[7vh] left-[5vw]', rotation: 270 },
      ].map((corner, i) => (
        <motion.div
          key={i}
          className={`absolute ${corner.position} w-4 h-4`}
          style={{ transform: `rotate(${corner.rotation}deg)` }}
          custom={i}
          variants={cornerVariants}
          initial="hidden"
          animate={isRevealed ? "visible" : "hidden"}
        >
          <div className="absolute top-0 left-0 w-full h-px bg-scifi-red" />
          <div className="absolute top-0 left-0 h-full w-px bg-scifi-red" />
        </motion.div>
      ))}

      {/* Left circles */}
      <div className="absolute left-[3vw] top-1/2 -translate-y-1/2 flex flex-col gap-5">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 rounded-full border border-scifi-teal"
            custom={i}
            variants={circleVariants}
            initial="hidden"
            animate={isRevealed ? "visible" : "hidden"}
          />
        ))}
      </div>

      {/* Right circles */}
      <div className="absolute right-[3vw] top-1/2 -translate-y-1/2 flex flex-col gap-5">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 rounded-full border border-scifi-teal"
            custom={i}
            variants={circleVariants}
            initial="hidden"
            animate={isRevealed ? "visible" : "hidden"}
          />
        ))}
      </div>

      {/* Tick marks - top - instant */}
      <div className="absolute top-[15vh] left-1/2 -translate-x-1/2 flex items-center justify-center gap-1.5">
        {[...Array(40)].map((_, i) => (
          <motion.span
            key={i}
            className="w-px h-2.5 bg-scifi-teal/30 relative"
            initial={{ opacity: 0 }}
            animate={isRevealed ? { opacity: 1 } : {}}
            transition={{ 
              delay: 0.15 + Math.abs(i - 20) * 0.008,
              duration: 0.1
            }}
          >
            <span className="absolute top-0 left-0 w-full h-0.5 bg-scifi-teal2" />
          </motion.span>
        ))}
      </div>

      {/* Tick marks - bottom - instant */}
      <div className="absolute bottom-[15vh] left-1/2 -translate-x-1/2 flex items-center justify-center gap-1.5 rotate-180">
        {[...Array(40)].map((_, i) => (
          <motion.span
            key={i}
            className="w-px h-2.5 bg-scifi-teal/30 relative"
            initial={{ opacity: 0 }}
            animate={isRevealed ? { opacity: 1 } : {}}
            transition={{ 
              delay: 0.15 + Math.abs(i - 20) * 0.008,
              duration: 0.1
            }}
          >
            <span className="absolute top-0 left-0 w-full h-0.5 bg-scifi-teal2" />
          </motion.span>
        ))}
      </div>

      {/* Status text - left */}
      <motion.div 
        className="absolute bottom-16 left-[15%] scifi-text"
        initial={{ opacity: 0 }}
        animate={isRevealed ? { opacity: 1 } : {}}
        transition={{ delay: 0.5 }}
      >
        <h5 
          className="text-[8px] uppercase tracking-[0.2em] text-scifi-light font-display mb-1"
          style={{ opacity: 0.7 }}
        >
          {statusText}
        </h5>
      </motion.div>

      {/* Status text - right */}
      <motion.div 
        className="absolute bottom-16 right-[15%] scifi-text text-right"
        initial={{ opacity: 0 }}
        animate={isRevealed ? { opacity: 1 } : {}}
        transition={{ delay: 0.5 }}
      >
        <h5 
          className="text-[8px] uppercase tracking-[0.2em] text-scifi-light font-display mb-1"
          style={{ opacity: 0.7 }}
        >
          CYNAPSE 2K26
        </h5>
      </motion.div>

      {/* Inner frame box */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[50vh] border border-scifi-teal/20 pointer-events-none"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isRevealed ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.35, delay: 0.1, ease: [0.33, 1, 0.68, 1] }}
      >
        {/* Inner corners */}
        <div className="absolute -top-1 -left-1 w-3 h-3 border-l-2 border-t-2 border-scifi-red" />
        <div className="absolute -top-1 -right-1 w-3 h-3 border-r-2 border-t-2 border-scifi-red" />
        <div className="absolute -bottom-1 -left-1 w-3 h-3 border-l-2 border-b-2 border-scifi-red" />
        <div className="absolute -bottom-1 -right-1 w-3 h-3 border-r-2 border-b-2 border-scifi-red" />

        {/* Battery indicators on box */}
        <motion.span 
          className="absolute left-1/2 -translate-x-1/2 -top-1.5 w-[3px] h-3 bg-scifi-teal"
          initial={{ height: 0 }}
          animate={isRevealed ? { height: 12 } : {}}
          transition={{ delay: 0.35, duration: 0.2 }}
        />
        <motion.span 
          className="absolute left-1/2 -translate-x-1/2 -bottom-1.5 w-[3px] h-3 bg-scifi-teal"
          initial={{ height: 0 }}
          animate={isRevealed ? { height: 12 } : {}}
          transition={{ delay: 0.35, duration: 0.2 }}
        />
        <motion.span 
          className="absolute top-1/2 -translate-y-1/2 -left-1.5 h-[3px] w-3 bg-scifi-teal"
          initial={{ width: 0 }}
          animate={isRevealed ? { width: 12 } : {}}
          transition={{ delay: 0.35, duration: 0.2 }}
        />
        <motion.span 
          className="absolute top-1/2 -translate-y-1/2 -right-1.5 h-[3px] w-3 bg-scifi-teal"
          initial={{ width: 0 }}
          animate={isRevealed ? { width: 12 } : {}}
          transition={{ delay: 0.35, duration: 0.2 }}
        />
      </motion.div>

      {/* Radial gradient overlay - static */}
      {isRevealed && (
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(89, 178, 158, 0) 1%, rgba(54, 177, 149, 0) 40%, rgba(0, 175, 134, 0.08) 100%)',
            opacity: 0.8
          }}
        />
      )}
    </div>
  );
};

export default SciFiUI;