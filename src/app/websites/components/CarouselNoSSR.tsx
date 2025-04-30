import dynamic from "next/dynamic";

const Carousel = dynamic(
  () => import("react-responsive-carousel").then(mod => mod.Carousel),
  { ssr: false }
);

export default Carousel; 