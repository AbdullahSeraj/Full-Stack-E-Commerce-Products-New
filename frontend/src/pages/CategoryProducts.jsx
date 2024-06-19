import React, { useEffect, useState } from 'react'
import { useFilterProductControllerMutation, useGetCategoriesQuery, useSearchProductsQuery } from '../redux/features/product/productApiSlice'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { capitalize } from '../helpers/capitalize';
import ProductsVertical from '../components/ProductsVertical';

import notFound from "../../public/assest/notFound.png"

const CategoryProducts = () => {
  const navigate = useNavigate()
  const { search } = useLocation();
  const urlSearch = new URLSearchParams(search)
  const urlCategoryList = urlSearch.getAll("category")
  const urlCategoryObject = {}
  urlCategoryList.forEach((el) => {
    urlCategoryObject[el] = true
  })

  const { data: categories } = useGetCategoriesQuery()

  const [seleteCategory, setSeleteCategory] = useState(urlCategoryObject)
  const [categoryNames, setCategoryNames] = useState([])

  const [filterProductController, { isLoading, isError, error }] = useFilterProductControllerMutation()
  const [data, setData] = useState([])

  const [sortBy, setSortBy] = useState("")

  const handleSeleteCategory = (e) => {
    const { name, value, checked } = e.target
    setSortBy("")

    setSeleteCategory((prev) => {
      return {
        ...prev,
        [value]: checked,
      }
    })
  }

  const handleSortBy = (e) => {
    const { value } = e.target;
    setSortBy(value)

    if (value === 'low') {
      setData([...data].sort((a, b) => a.selling - b.selling))
    }

    if (value === "high") {
      setData([...data].sort((a, b) => b.selling - a.selling))
    }
  }

  useEffect(() => {
    const arrayOfCategory = Object.keys(seleteCategory).filter((cat) => seleteCategory[cat]).map((cat) => cat)
    setCategoryNames(arrayOfCategory)

    const urlFormat = arrayOfCategory.map((el, index) => {
      if (arrayOfCategory.length - 1 === index) {
        return `category=${el}`
      }
      return `category=${el}&&`
    })

    navigate(`/category?${urlFormat.join("")}`)
  }, [seleteCategory])

  useEffect(() => {
    const handleFilter = async () => {
      try {
        const { data } = await filterProductController({ categoryList: categoryNames })
        setData(data)

      } catch (error) {
        console.log(data);
      }
    }
    handleFilter();
  }, [categoryNames])

  useEffect(() => {

  }, [sortBy])

  return (
    <div className='px-10 py-6 flex gap-7'>
      <div className='bg-white w-fit p-5 shadow-md h-fit' style={{ minHeight: "calc(100vh - 160px)" }}>
        <form action="">
          <p className='text-gray-500 font-bold border-b-2 pb-1 mb-2'>SORT BY</p>
          <fieldset className='flex items-center gap-1'>
            <input type="radio" name="sortBy" id="low" value={"low"} onChange={handleSortBy} checked={sortBy === "low"} />
            <label htmlFor="low">Price - Low to High</label>
          </fieldset>

          <fieldset className='flex items-center gap-1'>
            <input type="radio" name="sortBy" id="high" value={"high"} onChange={handleSortBy} checked={sortBy === "high"} />
            <label htmlFor="high">Price - High to Low</label>
          </fieldset>
        </form>

        <form>
          <p className='text-gray-500 font-bold border-b-2 pb-1 mb-2 mt-5'>CATEGORY</p>
          {categories && categories.map((category, i) => (
            <fieldset key={i} className='flex items-center gap-1'>
              <input type="checkbox" name="" id={category.category} value={category.category} checked={seleteCategory[category?.category] || false} onChange={handleSeleteCategory} />
              <label htmlFor={category.category}>{capitalize(category.category)}</label>
            </fieldset>
          ))}
        </form>
      </div>

      <div className='flex-1'>
        {(!isLoading && !isError && data?.length) &&
          <div>
            <h2 className='text-2xl font-semibold pb-2'>Search Results: {data?.length}</h2>
            <div className='overflow-y-auto' style={{ height: "calc(100vh - 200px)" }}>
              <ProductsVertical data={data} className={"grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5"} />
            </div>
          </div>
        }

        {isLoading &&
          <div className='flex justify-center items-center h-[calc(100vh-200px)]'>
            <svg className="w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
          </div>
        }

        {(!data?.length && !isLoading) &&
          <div className="py-5 text-center">
            <div className="flex justify-center">
              <img src={notFound} alt="" className="h-[200px] mix-blend-multiply" />
            </div>
            <p className="text-gray-600 text-lg">{error?.data?.message || "Not found any products"}</p>
            <Link to={"/"} className="bg-red-600 hover:bg-red-700 text-white py-1 px-4 rounded-md mt-3 block w-fit mx-auto">Back To Home</Link>
          </div>
        }
      </div>
    </div>
  )
}

export default CategoryProducts