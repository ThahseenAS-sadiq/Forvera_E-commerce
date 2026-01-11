import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem.jsx';

const Collection = () => {

  const [showFilter, setShowFilter] = useState(false);
  const [filetrProducts, setFilterProducts] = useState([]);
  const {
    products,
    search,
    showSearch,
    selectedCategory,
    setSelectedCategory
  } = useContext(ShopContext);

  const Category = selectedCategory;
  const setCategory = setSelectedCategory;

  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relevant');

  const toggleCategory = (e) => {
    if (Category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value));
    }
    else {
      setCategory(prev => [...prev, e.target.value]);
    }
  }

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value));
    }
    else {
      setSubCategory(prev => [...prev, e.target.value]);
    }
  }

  const applyFilters = () => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    }

    if (Category.length > 0) {
      productsCopy = productsCopy.filter(item => Category.includes(item.category));
    }


    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
    }

    setFilterProducts(productsCopy);
  }

  const sortProducts = () => {
    let fpCopy = filetrProducts.slice();

    switch (sortType) {
      case 'low-high':
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;

      case 'high-low':
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;

      default:
        applyFilters();
        break;
    }
  }

  useEffect(() => {
    applyFilters();
  }, [Category, subCategory, search, showSearch, products]);

  useEffect(() => {
    sortProducts();
  }, [sortType]);

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t mx-10'>

      {/* Filter Options */}
      <div className='min-w-60' >
        <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2' >FILTERS
          <img src={assets.dropdown_icon} alt="dropdown_icon" className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} />
        </p>

        {/* Category Filters */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`} >
          <p className='mb-3 text-sm font-medium' >CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm text-gray-700 font-light' >
            <p className='flex gap-2' >
              <input type="checkbox" className='w-3' value={'Men'} onChange={toggleCategory} /> Men
            </p>
            <p className='flex gap-2' >
              <input type="checkbox" className='w-3' value={'Women'} onChange={toggleCategory} /> Women
            </p>
            <p className='flex gap-2' >
              <input type="checkbox" className='w-3' value={'Kids'} onChange={toggleCategory} /> Kids
            </p>
            <p className='flex gap-2' >
              <input type="checkbox" className='w-3' value={'Accessories'} onChange={toggleCategory} /> Accessories
            </p>
          </div>
        </div>
        {/* Sub Categories Filters */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`} >
          <p className='mb-3 text-sm font-medium' >TYPE</p>
          <div className='flex flex-col gap-2 text-sm text-gray-700 font-light' >
            <p className='flex gap-2' >
              <input type="checkbox" className='w-3' value={'Topwear'} onChange={toggleSubCategory} /> Topwear
            </p>
            <p className='flex gap-2' >
              <input type="checkbox" className='w-3' value={'Bottomwear'} onChange={toggleSubCategory} /> Bottomwear
            </p>
            <p className='flex gap-2' >
              <input type="checkbox" className='w-3' value={'Winterwear'} onChange={toggleSubCategory} /> Winterwear
            </p>
            <p className='flex gap-2' >
              <input type="checkbox" className='w-3' value={'Shoe'} onChange={toggleSubCategory} /> Shoe
            </p>
            <p className='flex gap-2' >
              <input type="checkbox" className='w-3' value={'Bag'} onChange={toggleSubCategory} /> Bag
            </p>
            <p className='flex gap-2' >
              <input type="checkbox" className='w-3' value={'Watch'} onChange={toggleSubCategory} /> Watch
            </p>
          </div>
        </div>
      </div>

      {/* Products Grid Right */}
      <div className='flex-1' >

        <div className='flex justify-between text-base sm:text-2xl mb-4 ' >
          <Title text1={'All'} text2={'Collections'} />
          {/* Product sort */}
          <select onChange={(e) => setSortType(e.target.value)} name="sort" id="sort" className='border-2 border-gray-700 text-sm px-2'>
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Map products */}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filetrProducts.map((item) => (
            <ProductItem
              key={item._id}
              id={item._id}
              name={item.name}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>

      </div>
    </div>
  )
}

export default Collection;