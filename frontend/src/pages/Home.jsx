import CategorySlice from '../components/CategorySlice'
import CategorySliceVertical from '../components/CategorySliceVertical'
import Banner from '../components/home/Banner'
import Categories from '../components/home/Categories'

const Home = () => {
    return (
        <>
            <div className='px-7 py-4'>
                <Categories />
                <Banner />
                <CategorySlice title={"Top's Airpodes"} category={"airpodes"} />
                <CategorySlice title={"Popular's Watches"} category={"camera"} />

                <CategorySliceVertical title={"Mobiles"} category={"mobiles"} />
                <CategorySliceVertical title={"Mouse"} category={"Mouse"} />
                <CategorySliceVertical title={"Televisions"} category={"televisions"} />
                <CategorySliceVertical title={"Camera & Photography"} category={"camera"} />
                <CategorySliceVertical title={"Wired Earphones"} category={"earphones"} />
                <CategorySliceVertical title={"Bluetooth Speakers"} category={"speakers"} />
                <CategorySliceVertical title={"Refrigerator"} category={"refrigerator"} />
                <CategorySliceVertical title={"Trimmers"} category={"trimmers"} />
            </div>
        </>
    )
}

export default Home