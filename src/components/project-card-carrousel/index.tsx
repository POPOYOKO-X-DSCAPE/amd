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
    padding: "s.2xl",
  }),
  container: css({
    width: "100%",
  }),

  child: css({
    gap: "10px",
    alignSelf: "stretch",
    opacity: 0,
    transition: "all 0.5s ease-in-out",
    "&.visible": {
      opacity: 1,
    },
    "&.hidden": {
      opacity: 0,
    },
  }),
  image: css({
    width: "100%",
    aspectRatio: "310.00/201.59",
    objectFit: "cover",
  }),
  title: css({
    padding: "s.s",
    alignSelf: "flex-end",
    textStyle: "emphasis",
    wordWrap: "break-word",
    transition: "all 0.3s ease-in-out",
  }),
};

export const ProjectCardCarrousel = ({
  children,
}: ProjectCardCarrouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (children.length === 0) return;

    const interval = setInterval(() => {
      setIsVisible(false);

      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % children.length);
        setIsVisible(true);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, [children.length]);

  if (children.length === 0) return null;

  const currentChild = children[currentIndex];

  return (
    <Stack direction="column" className={styles.wrapper}>
      <Stack>
        <Button level="secondary" position="right" label="Other projects">
          <ArrowBottomRight />
        </Button>
      </Stack>

      <Stack direction="column" className={styles.container}>
        <Stack
          key={currentIndex}
          className={`${styles.child} ${isVisible ? "visible" : "hidden"}`}
        >
          <img
            src={currentChild.image}
            alt={currentChild.alt || currentChild.title}
            className={styles.image}
          />
          <Stack className={`${styles.title} ${isVisible ? "visible" : ""}`}>
            {currentChild.title}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
