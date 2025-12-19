import React, { useState, useEffect } from "react";
import { Stack } from "@packages/ui";
import { css } from "@styles";
import ArrowBottomRight from "../../assets/svgs/ArrowBottomRight.svg?react";
import { Button } from "../button";

interface ProjectChild {
  image: string;
  title: string;
  alt?: string;
}

interface ProjectCardCarrouselProps {
  children: ProjectChild[];
}

const styles = {
  wrapper: css({
    gap: "10px",
    marginY: "s.x2l",
  }),
  container: css({
    width: "100%",
    position: "relative",
    gap: "10px",
  }),
  imageContainer: css({
    position: "relative",
    width: "100%",
    aspectRatio: "393/256",
  }),
  textProjects: css({
    textStyle: "emphasis",
    height: "32px",
    gap: "10px",
  }),
  imageWrapper: css({
    position: "absolute",
    inset: 0,
    opacity: 0,
    transition: "opacity 1s ease-in-out",
    zIndex: 1,
    "&.active": { opacity: 1, zIndex: 2 },
  }),
  image: css({
    width: "100%",
    height: "100%",
    objectFit: "cover",
    cursor: "pointer",
  }),
  title: css({
    padding: "s.s",
    alignSelf: "flex-end",
    textStyle: "emphasis",
    wordWrap: "break-word",
    opacity: 0,
    transition: "opacity 1s ease-in-out",
    "&.visible": { opacity: 1 },
  }),
};

export const ProjectCardCarrousel = ({
  children,
}: ProjectCardCarrouselProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [titleVisible, setTitleVisible] = useState(true);

  useEffect(() => {
    if (children.length <= 1) return;

    for (const { image } of children) {
      const img = new Image();
      img.src = image;
    }

    const interval = setInterval(() => {
      setTitleVisible(false);

      setTimeout(() => {
        const nextIndex = (currentImageIndex + 1) % children.length;
        setCurrentImageIndex(nextIndex);

        setTimeout(() => {
          setCurrentTitleIndex(nextIndex);
          setTitleVisible(true);
        }, 1000);
      }, 100);
    }, 6000);

    return () => clearInterval(interval);
  }, [children, currentImageIndex]);

  if (children.length === 0) return null;

  const getImageClass = (index: number) =>
    `${styles.imageWrapper} ${index === currentImageIndex ? "active" : ""}`;

  return (
    <Stack direction="column" className={styles.wrapper}>
      <Stack
        direction="row"
        className={styles.textProjects}
        alignItems="center"
      >
        Other projects
        <ArrowBottomRight />
      </Stack>

      <Stack direction="column" className={styles.container}>
        <Stack className={styles.imageContainer}>
          {children.map((child, index) => (
            <Stack
              key={`${child.title}-${index}`}
              className={getImageClass(index)}
            >
              <img
                src={child.image}
                alt={child.alt || child.title}
                className={styles.image}
                loading="eager"
              />
            </Stack>
          ))}
        </Stack>

        <Stack className={`${styles.title} ${titleVisible ? "visible" : ""}`}>
          {children[currentTitleIndex].title}
        </Stack>
      </Stack>
    </Stack>
  );
};
