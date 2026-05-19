import ProductCard from "../products/ProductCard";

const products = [
  {
    id: 1,
    name: "AI Smart Watch",
    description: "Next-gen AI wearable technology.",
    price: 199,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
  },
  {
    id: 2,
    name: "Gaming Headset",
    description: "Immersive gaming sound experience.",
    price: 149,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
  },
  {
    id: 3,
    name: "Premium Sneakers",
    description: "Modern fashion meets comfort.",
    price: 129,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
  },
];

const FeaturedProducts = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        <h2 className="text-4xl font-bold mb-12 text-center">
          Featured Products
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;