import useWishlist from "../hooks/useWishlist";

import ProductCard from "../components/products/ProductCard";

const Wishlist = () => {

  const { wishlistItems } =
    useWishlist();

  return (
    <section className="min-h-screen bg-slate-100 py-14 px-6">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl font-bold text-slate-800 mb-10">
          Wishlist
        </h1>

        {wishlistItems.length === 0 ? (

          <div className="bg-white rounded-3xl shadow-lg p-10 text-center text-2xl font-semibold text-slate-500">
            Wishlist Empty
          </div>

        ) : (

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

            {wishlistItems.map((product) => (

              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Wishlist;