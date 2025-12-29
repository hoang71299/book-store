import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Heart, ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react'
import Header from '@/components/Header'
import { Input } from '@/components/ui/input'
import { Link, useParams } from 'react-router-dom'
import { productDetail } from '@/config/ProductRequest'
import { useStore } from '@/hooks/useStore'
import { requestAddToCart } from '@/config/CartRequest'
import { toast } from 'sonner'

// Sample product data - Replace with actual data fetching

export default function ProductPage() {
  const [productData, setProductData] = useState({})
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isLiked, setIsLiked] = useState(false)

  const { dataUser, getCart } = useStore()

  const discountedPrice = Math.floor(productData.priceProduct * (1 - productData.discountProduct / 100))

  const { id } = useParams()
  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % productData.imagesProduct.length)
  }

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + productData.imagesProduct.length) % productData.imagesProduct.length)
  }
  const fetchProductDetail = async () => {
    const res = await productDetail(id)
    setProductData(res.metadata)
  }
  useEffect(() => {
    fetchProductDetail()
  }, [id])

  const handleAddToCart = async () => {
    try {
      const data = {
        productId: id,
        quantity
      }
      const res = await requestAddToCart(data)
      toast.success(res.message)
      await fetchProductDetail()
      await getCart()
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
  return (
    <main className='min-h-screen bg-background pt-[100px]'>
      {/* Header */}
      <Header />

      {/* Product Section */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 '>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12'>
          {/* Image Gallery */}
          <div className='flex flex-col gap-6'>
            {/* Main Image */}
            <div className='relative bg-muted rounded-lg overflow-hidden aspect-square'>
              {productData?.imagesProduct?.[1] && (
                <img
                  src={productData.imagesProduct[selectedImageIndex]}
                  alt={productData?.nameProduct}
                  className='object-cover'
                />
              )}

              {/* Navigation Buttons */}
              {productData?.imagesProduct?.length > 1 && (
                <>
                  <Button
                    onClick={prevImage}
                    variant='outline'
                    className='bg-primary dark:bg-accent-foreground text-primary-foreground absolute left-4 top-1/2 -translate-y-1/2  p-2 rounded-full transition-all shadow-lg'
                    aria-label='Previous image'
                  >
                    <ChevronLeft className='w-5 h-5 ' />
                  </Button>
                  <Button
                    variant='outline'
                    onClick={nextImage}
                    className='bg-primary dark:bg-accent-foreground text-primary-foreground absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full transition-all shadow-lg'
                    aria-label='Next image'
                  >
                    <ChevronRight className='w-5 h-5 ' />
                  </Button>
                </>
              )}

              {/* Image Counter */}
              {productData?.imagesProduct?.length > 1 && (
                <div className='absolute bottom-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm'>
                  {selectedImageIndex + 1} / {productData.imagesProduct.length}
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {productData.imagesProduct?.length > 1 && (
              <div className='flex gap-3'>
                {productData.imagesProduct.map((img, idx) => (
                  <Button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImageIndex === idx ? 'border-primary' : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <img
                      src={img || '/placeholder.svg'}
                      alt={`${productData.nameProduct} - view ${idx + 1}`}
                      className='object-cover'
                    />
                  </Button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className='flex flex-col gap-8'>
            {/* Title & Badge */}
            <div className='space-y-4'>
              <div className='flex items-start justify-between gap-4'>
                <div className='flex-1'>
                  <h1 className='text-3xl lg:text-4xl font-bold text-foreground mb-2'>{productData.nameProduct}</h1>
                  <p className='text-muted-foreground text-sm'>{productData.descriptionProduct}</p>
                </div>
                <Button
                  onClick={() => setIsLiked(!isLiked)}
                  variant='outline'
                  className='p-3 rounded-lg hover:bg-muted transition-colors rounded-full'
                  aria-label='Add to favorites'
                >
                  <Heart
                    className={`w-6 h-6 transition-colors ${
                      isLiked ? 'fill-accent-foreground text-accent' : 'text-muted-foreground'
                    }`}
                  />
                </Button>
              </div>
            </div>

            {/* Price Section */}
            <Card className='bg-muted/50  border-border'>
              <CardContent className='pt-6'>
                <div className='space-y-3'>
                  <div className='flex items-center gap-4'>
                    <div className='text-3xl font-bold text-primary'>{discountedPrice.toLocaleString('vi-VN')}₫</div>
                    {productData.discountProduct > 0 && (
                      <>
                        <div className='text-lg text-muted-foreground line-through'>
                          {productData.priceProduct.toLocaleString('vi-VN')}₫
                        </div>
                        <Badge variant={'destructive'}> -{productData.discountProduct}%</Badge>
                      </>
                    )}
                  </div>
                  <div className='flex items-center gap-2 text-sm'>
                    <div
                      className={`h-2 w-2 rounded-full ${
                        productData.stockProduct > 0 ? 'bg-green-500' : 'bg-destructive'
                      }`}
                    />
                    <span className='text-foreground'>
                      {productData.stockProduct > 0 ? `${productData.stockProduct} sản phẩm còn hàng` : 'Hết hàng'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quantity & Add to Cart */}
            <div className='space-y-4'>
              <div className='flex items-center gap-4'>
                <span className='text-foreground font-medium'>Số lượng:</span>
                <div className='flex items-center border border-border rounded-lg overflow-hidden'>
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className='px-4 py-2 hover:bg-muted transition-colors'
                  >
                    −
                  </button>
                  <Input
                    type='number'
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))}
                    className='w-16 text-center border-0 outline-none bg-background'
                    min='1'
                    max={productData.stockProduct}
                  />
                  <button
                    onClick={() => setQuantity(Math.min(productData.stockProduct, quantity + 1))}
                    className='px-4 py-2 hover:bg-muted transition-colors'
                  >
                    +
                  </button>
                </div>
              </div>

              {!dataUser && !dataUser?._id ? (
                <Link>
                  <Button
                    size='lg'
                    className='w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 text-lg'
                  >
                    Vui lòng đăng nhập
                  </Button>
                </Link>
              ) : (
                <Button
                  onClick={handleAddToCart}
                  size='lg'
                  className='w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 text-lg'
                  disabled={productData.stockProduct === 0}
                >
                  <ShoppingCart className='w-5 h-5 mr-2' />
                  Thêm vào giỏ hàng
                </Button>
              )}
            </div>

            {/* Product Details */}
            <Card>
              <CardContent className='pt-6'>
                <h3 className='font-bold text-lg mb-4 text-foreground'>Thông tin sản phẩm</h3>
                <div className='space-y-3'>
                  {Object.entries(productData?.metadata || {}).map(([key, value]) => (
                    <div key={key} className='flex justify-between items-start'>
                      <span className='text-muted-foreground capitalize'>
                        {key === 'publisher'
                          ? 'Nhà xuất bản'
                          : key === 'size'
                          ? 'Kích thước'
                          : key === 'translator'
                          ? 'Dịch giả'
                          : key === 'coverType'
                          ? 'Loại bìa'
                          : key === 'publishingHouse'
                          ? 'Nhà in'
                          : key}
                        :
                      </span>
                      <span className='text-foreground font-medium text-right'>{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardContent className='pt-6'>
                <h3 className='font-bold text-lg mb-4 text-foreground'>Mô tả sản phẩm</h3>
                <p className='text-muted-foreground leading-relaxed'>{productData.descriptionProduct}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
