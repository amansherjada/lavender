import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type ScrollRevealOptions = {
  trigger?: Element | string | null;
  start?: string;
  duration?: number;
  ease?: string;
  stagger?: number;
  y?: number;
  x?: number;
  scale?: number;
  filter?: string;
};

export function scrollReveal(
  targets: gsap.TweenTarget,
  options: ScrollRevealOptions = {}
) {
  if (
    !targets ||
    (targets instanceof NodeList && targets.length === 0)
  ) {
    return;
  }

  const {
    trigger,
    start = "top 80%",
    duration = 0.8,
    ease = "power3.out",
    stagger,
    y,
    x,
    scale,
    filter,
  } = options;

  const fromVars: gsap.TweenVars = { opacity: 0 };
  const toVars: gsap.TweenVars = { opacity: 1, duration, ease, stagger };

  if (y !== undefined) {
    fromVars.y = y;
    toVars.y = 0;
  }
  if (x !== undefined) {
    fromVars.x = x;
    toVars.x = 0;
  }
  if (scale !== undefined) {
    fromVars.scale = scale;
    toVars.scale = 1;
  }
  if (filter !== undefined) {
    fromVars.filter = filter;
    toVars.filter = "blur(0px)";
  }

  gsap.set(targets, fromVars);

  return gsap.to(targets, {
    ...toVars,
    scrollTrigger: {
      trigger: trigger ?? (targets as Element),
      start,
      once: true,
    },
  });
}
