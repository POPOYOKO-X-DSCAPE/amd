import React, { useState } from "react";
import { Stack } from "@packages/ui";
import { css } from "@styles";
import { Button } from "../button";
import usePageTransition from "../../hooks/usePageTransition";

interface ProjectChild {
  image: string;
  title: string;
  alt?: string;
  slug: string;
}

interface ProjectCardProps {
  children: ProjectChild[];
}

const styles = {
  container: css({
    height: "50vh",
    width: "fit-content",
    maxWidth: "100%",
    alignItems: "flex-start",
    marginY: "s.x4l",
    gap: "s.m",
    transition: "all 0.3s ease-in-out",
  }),
  child: css({
    width: "300px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    cursor: "pointer",
    transition: "all 0.3s ease-in-out",
    "&.hovered": {
      width: "400px",
    },
    "&.not-hovered": {
      width: "250px",
    },
    _mobile: {
      width: "200px",
      "&.hovered": {
        width: "250px",
      },
      "&.not-hovered": {
        width: "150px",
      },
    },
  }),
  image: css({
    width: "100%",
    aspectRatio: "393/256",
    objectFit: "cover",
    borderRadius: "s.xs",
    transition: "all 0.3s ease-in-out",
  }),
  titleContainer: css({
    width: "400px",
    display: "flex",
    justifyContent: "flex-end",
    transition: "all 0.3s ease-in-out",
    _mobile: {
      width: "250px",
    },
  }),
  title: css({
    textStyle: "emphasis",
    wordWrap: "break-word",
    opacity: 1,
    transform: "translateY(0)",
    transition: "all 0.3s ease-in-out",
    "&.hidden": {
      opacity: 0,
      transform: "translateY(10px)",
    },
  }),
};

export const ProjectCard = ({ children }: ProjectCardProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { goToProject } = usePageTransition();

  const handleMouseEnter = (index: number) => setHoveredIndex(index);
  const handleMouseLeave = () => setHoveredIndex(null);

  return (
    <Stack direction="row" className={styles.container}>
      {children.map((child, index) => {
        const isHovered = hoveredIndex === index;
        const shouldShowTitle = isHovered;

        return (
          <div
            key={`${child.title}-${index}`}
            className={`${styles.child} ${
              isHovered ? "hovered" : hoveredIndex !== null ? "not-hovered" : ""
            }`}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <Button
              level="image"
              type="button"
              onClick={() => goToProject(child.slug)}
            >
              <img
                src={child.image}
                alt={child.alt || child.title}
                className={styles.image}
              />
            </Button>
            <div className={styles.titleContainer}>
              <div
                className={`${styles.title} ${shouldShowTitle ? "" : "hidden"}`}
              >
                {child.title}
              </div>
            </div>
          </div>
        );
      })}
    </Stack>
  );
};
