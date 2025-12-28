import { listCategory } from '@/config/CategoryRequest'
import { listProduct, listProductByCategory } from '@/config/ProductRequest'
import React, { useEffect, useState } from 'react'
import CardBody from './CardBody'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Package, ArrowRight } from 'lucide-react'

export default function HomePage() {
  const [dataCategory, setDataCategory] = useState([])
  const [dataProduct, setDataProduct] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('all')

  const fetchCategory = async () => {
    try {
      const res = await listCategory()
      setDataCategory(res?.metadata || [])
    } catch (error) {
      console.error('Fetch category error:', error)
    }
  }

  const fetchProduct = async () => {
    try {
      const res = await listProduct()
      setDataProduct(res?.metadata || [])
    } catch (error) {
      console.error('Fetch product error:', error)
    }
  }

  useEffect(() => {
    fetchCategory()
    fetchProduct()
  }, [])

  useEffect(() => {
    const fetchProductByCategory = async () => {
      const res = await listProductByCategory(selectedCategory)
      setDataProduct(res?.metadata || [])
    }
    fetchProductByCategory()
  }, [selectedCategory])

  // Filter products by category

  return (
    <div className='min-h-screen bg-background'>
      <div className='grid grid-cols-1 lg:grid-cols-5 gap-6 p-6 container mx-auto'>
        {/* Left Sidebar - Categories */}
        <div className='lg:col-span-1'>
          <Card className='sticky top-6 h-fit'>
            <CardHeader>
              <CardTitle className='text-lg font-semibold'>Danh Mục</CardTitle>
            </CardHeader>
            <CardContent className='space-y-2'>
              {/* All Products Button */}
              <Button
                variant={selectedCategory === 'all' ? 'default' : 'outline'}
                className='w-full justify-start'
                onClick={() => setSelectedCategory('all')}
              >
                Tất cả sản phẩm
              </Button>

              {/* Categories List */}
              {dataCategory.map((category) => (
                <Button
                  key={category._id}
                  variant={selectedCategory === category._id ? 'default' : 'outline'}
                  className='w-full justify-start gap-2 h-auto py-2 px-3'
                  onClick={() => setSelectedCategory(category._id)}
                >
                  <img
                    src={category.imageCategory}
                    alt={category.nameCategory}
                    className='w-12 h-12 object-cover rounded flex-shrink-0'
                  />
                  <span className='text-xs font-medium line-clamp-2 text-left'>{category.nameCategory}</span>
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Content - Products Grid */}
        <div className='lg:col-span-4'>
          {/* Header */}
          <div className='mb-6'>
            <h2 className='text-3xl font-bold'>
              {selectedCategory !== 'all'
                ? dataCategory.find((c) => c._id === selectedCategory)?.nameCategory
                : 'Tất cả sản phẩm'}
            </h2>
            <p className='text-muted-foreground  mt-1'>{dataProduct.length} sản phẩm</p>
          </div>

          {/* Products Grid - 5 columns */}
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4'>
            {dataProduct.length > 0 ? (
              dataProduct.map((item) => <CardBody key={item._id} dataItem={item} />)
            ) : (
              <div className='col-span-full'>
                <div className='flex flex-col items-center justify-center py-20 px-4'>
                  <div className='mb-6 p-4 bg-primary/10 rounded-full'>
                    <Package size={48} className='text-primary' />
                  </div>
                  <h3 className='text-2xl font-bold text-foreground mb-2'>Không tìm thấy sản phẩm</h3>
                  <p className='text-muted-foreground text-center mb-6 max-w-md'>
                    Danh mục này hiện chưa có sản phẩm nào. Vui lòng thử chọn danh mục khác hoặc quay lại lúc khác.
                  </p>
                  <Button onClick={() => setSelectedCategory(null)} className='gap-2'>
                    Xem tất cả sản phẩm
                    <ArrowRight />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
