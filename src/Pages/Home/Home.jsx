// import ChouseUs from "./ChouseUS/ChouseUs";
// import Offer from "./Offer/Offer";
// import TopFood from "./TopFood/TopFood";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Banner from "./Banner";
import FeaturedFoods from "./FeaturedFoods";
import Help from "./Help";
import Purpose from "./Purpose";
import { Helmet } from "react-helmet-async";

const Home = () => {
  const [bannerRef, bannerInView] = useInView({
    triggerOnce: true,
  });

  const [featuredFoodRef, featuredFoodInView] = useInView({
    triggerOnce: true,
  });

  const [helpRef, helpInView] = useInView({
    triggerOnce: true,
  });

  const [purposeRef, purposeInView] = useInView({
    triggerOnce: true,
  });

  return (
    <>
      {/* <Meta title={'allfood'}/> */}
      <Helmet>
        <title>Foodle | Home</title>
      </Helmet>
      <motion.div
        ref={bannerRef}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: bannerInView ? 1 : 0, y: bannerInView ? 0 : 50 }}
        transition={{ duration: 0.5 }}
      >
        <Banner></Banner>
      </motion.div>

      <motion.div
        ref={featuredFoodRef}
        initial={{ opacity: 0, y: 50 }}
        animate={{
          opacity: featuredFoodInView ? 1 : 0,
          y: featuredFoodInView ? 0 : 50,
        }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <FeaturedFoods />
      </motion.div>

      <motion.div
        ref={helpRef}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: helpInView ? 1 : 0, y: helpInView ? 0 : 50 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Help />
      </motion.div>

      <motion.div
        ref={purposeRef}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: purposeInView ? 1 : 0, y: purposeInView ? 0 : 50 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Purpose />
      </motion.div>
    </>
  );
};

export default Home;
