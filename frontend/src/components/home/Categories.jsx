import { Link } from "react-router-dom"
import { useGetCategoriesQuery } from "../../redux/features/product/productApiSlice"

const Categories = () => {
  const { data: products, isLoading } = useGetCategoriesQuery()

  return (
    <div className="flex items-center gap-4 overflow-x-auto scrollbar-none md:scrollbar-block mb-5">
      {products?.map((product) => (
        <Link to={`/category?category=${product.category}`} key={product._id}>
          <div className="bg-slate-200 p-3 rounded-full w-[90px] h-[90px] overflow-hidden flex justify-center items-center group shadow-md mb-1">
            <img src={product.images[0]} alt="" className="object-contain mix-blend-multiply w-full h-full group-hover:scale-105 cursor-pointer transition duration-300" />
          </div>
          <h3 className="text-center text-gray-500">{product.category}</h3>
        </Link>
      ))}

      {isLoading && [...Array(16)].map((array, i) => (
        <div className="animate-pulse" key={i}>
          <div className="rounded-full bg-slate-200 h-[90px] w-[90px] mb-2"></div>
          <div className="h-2 w-2/3 mx-auto bg-slate-200 rounded"></div>
        </div>
      ))}
    </div>
  )
}

export default Categories