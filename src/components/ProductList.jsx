import React, { useEffect, useState } from "react"
import QuickViewModal from "./QuickViewModal"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../firebase"
import { useCart } from "../context/CartContext"
import { toast } from "react-toastify"
import ProductCard from "./ProductCard"

const ProductList = () => {
  const [products, setProducts] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { addToCart } = useCart()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(db, "products")
        const productsSnapshot = await getDocs(productsCollection)
        const productsList = productsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })).slice(0, 4)
        setProducts(productsList)
      } catch (error) {
        console.error("Error fetching products:", error)
      }
    }

    fetchProducts()
  }, [])

  const handleAddToCart = (product) => {
    addToCart(product)
    toast.success(`${product.name} added to cart!`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  }

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 text-center mb-8">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
            Recent Products
          </span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={() => {
                setSelectedProduct(product)
                setIsModalOpen(true)
              }}
              onAddToCart={() => handleAddToCart(product)}
            />
          ))}
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedProduct(null)
        }}
      />
    </section>
  )
}

export default ProductList

