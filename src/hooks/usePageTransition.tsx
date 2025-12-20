import { useNavigate } from "react-router-dom";
import { useAnimation } from "../contexts/animation-context";

const usePageTransition = () => {
  const { startAnimation, endAnimation } = useAnimation();
  const navigate = useNavigate();

  const transitionTo = (path: string, callback?: () => void) => {
    startAnimation();

    setTimeout(() => {
      navigate(path);
      window.scrollTo(0, 0);
      callback?.();
      endAnimation();
    }, 500);
  };

  const goToProject = (slug: string) =>
    navigate(window.location.pathname.replace(/\/[^\/]+$/, `/${slug}`));

  return { transitionTo, goToProject };
};

export default usePageTransition;
