import { useEffect, useState } from "react";

// Import all event images
import compendiumImg from "@/assets/event-compendium.jpg";
import syntaxSagaPenguinImg from "@/assets/syntax-saga-penguin.png";
import coalescenceImg from "@/assets/event-coalescence.png";
import trustIssuesImg from "@/assets/event-trust-issues.jpg";

const eventImages = [
  compendiumImg,
  syntaxSagaPenguinImg,
  coalescenceImg,
  trustIssuesImg
];

// Preload images and cache them
const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

export const useImagePreloader = () => {
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    // Preload all images immediately on mount
    Promise.all(eventImages.map(preloadImage))
      .then(() => setImagesLoaded(true))
      .catch(() => setImagesLoaded(true)); // Continue even if some fail
  }, []);

  return imagesLoaded;
};

// Export image map for direct access
export const preloadedEventImages: Record<string, string> = {
  "compendium": compendiumImg,
  "syntax-saga": syntaxSagaPenguinImg,
  "coalescence": coalescenceImg,
  "trust-issues": trustIssuesImg
};
