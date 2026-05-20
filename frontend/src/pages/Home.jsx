import Hero from "../components/home/Hero";

import Categories from "../components/home/Categories";

import FeaturedProducts from "../components/home/FeaturedProducts";

const Home = () => {

  return (
    <section className="bg-slate-100 dark:bg-slate-950 min-h-screen transition duration-300">

      <Hero />

      <Categories />

      <FeaturedProducts />

    </section>
  );
};

export default Home;