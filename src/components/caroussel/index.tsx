import { Stack } from "@packages/ui";
import { css } from "@styles";
import { useEffect, useState } from "react";

const styles = {
  container: css({
    position: "relative",
    width: "100%",
    overflow: "hidden",
  }),
  slidesContainer: css({
    display: "flex",
    transition: "transform 0.5s ease-in-out",
    height: "100%",
  }),
  slide: css({
    flex: "0 0 100%",
    minWidth: "100%",
    height: "100%",
  }),
};

interface CarousselProps {
  children: React.ReactNode[];
}

export const Caroussel = ({ children }: CarousselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slidesCount = children.length;

  useEffect(() => {
    if (slidesCount <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((current) => (current + 1) % slidesCount);
    }, 2000);

    return () => clearInterval(interval);
  }, [slidesCount]);

  if (!slidesCount) return null;

  return (
    <Stack className={styles.container}>
      <div
        className={styles.slidesContainer}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {children.map((child, index) => (
          <Stack key={index} className={styles.slide}>
            {child}
          </Stack>
        ))}
      </div>
    </Stack>
  );
};

export default Caroussel;
