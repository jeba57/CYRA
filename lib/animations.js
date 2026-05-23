export const fadeUpVariants = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export const staggerContainer = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12 } },
};

export const cardHover = {
  rest:  { y: 0, boxShadow: "0 8px 30px rgba(61,40,64,0.08)" },
  hover: { y: -6, boxShadow: "0 20px 50px rgba(61,40,64,0.12)", transition: { duration: 0.35 } },
};

export const floatAnimation = {
  animate: {
    y: [0, -12, 0],
    transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
  },
};

export const slideInLeft = {
  hidden:  { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export const slideInRight = {
  hidden:  { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export const scaleIn = {
  hidden:  { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
};
