import React, { useState } from "react";
import { Stack } from "@packages/ui";
import { css } from "@styles";
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
    width: "100%",
    maxWidth: "100%",
    alignItems: "flex-start",
    marginY: "s.x4l",
    gap: "s.m",
    transition: "all 0.3s ease-in-out",
    display: "flex",
  }),
  child: css({
    flex: "0 1 400px",
    minWidth: "200px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    cursor: "pointer",
    transition: "flex 0.3s ease-in-out",
    "&.hovered": {
      flex: "0 1 600px",
    },
    "&.not-hovered": {
      flex: "0 1 300px",
    },
    _mobile: {
      flex: "0 1 200px",
      minWidth: "120px",
      "&.hovered": {
        flex: "0 1 300px",
      },
      "&.not-hovered": {
        flex: "0 1 150px",
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
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    transition: "all 0.3s ease-in-out",
  }),
  title: css({
    textStyle: "emphasis",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
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
            <div
              onClick={() => goToProject(child.slug)}
              onKeyDown={(e) => e.key === "Enter" && goToProject(child.slug)}
            >
              <img
                src={child.image}
                alt={child.alt || child.title}
                className={styles.image}
              />
            </div>
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
