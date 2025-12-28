import React, { useState } from 'react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Heart, ShoppingCart } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function CardBody({ dataItem }) {
  const [isFavorite, setIsFavorite] = useState(false)

  if (!dataItem) return null

  const { nameProduct, descriptionProduct, priceProduct, discountProduct, imagesProduct, stockProduct, metadata } =
    dataItem

  const discountedPrice = Math.round(priceProduct * (1 - discountProduct / 100))
  const savingAmount = priceProduct - discountedPrice
  return (
    <Card className=' cursor-pointer w-full overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 flex flex-col h-full'>
      {/* Product Image */}
      <CardContent className='p-0 relative flex-shrink-0'>
        <div className='relative w-full aspect-square overflow-hidden bg-white '>
          {imagesProduct?.[0] ? (
            <img
              src={imagesProduct[0]}
              alt={nameProduct}
              className='w-full h-full object-cover hover:scale-110 transition-transform duration-300'
            />
          ) : (
            <div className='w-full h-full flex items-center justify-center'>
              <span className='text-primary-foreground'>Không có ảnh</span>
            </div>
          )}

          {/* Discount Badge */}
          {discountProduct > 0 && (
            <div className='absolute top-2 right-2 bg-destructive text-primary-foreground text-xs font-bold px-2 py-1 rounded-full'>
              -{discountProduct}%
            </div>
          )}

          {/* Favorite Button */}
          <Button
            variant='outline'
            size='icon'
            className='absolute top-2 left-2  bg-white/80 hover:bg-white dark:bg-gray-900/80 dark:hover:bg-gray-900 rounded-full'
            onClick={() => setIsFavorite(!isFavorite)}
          >
            <Heart
              className={`transition-colors ${
                isFavorite ? 'fill-accent-foreground text-accent' : 'text-muted-foreground'
              }`}
            />
          </Button>
          {/* Stock Status */}
          {stockProduct > 0 ? (
            <Badge className='absolute bottom-3 left-3 bg-green-500 hover:bg-green-600 text-white text-xs font-semibold'>
              Còn {stockProduct}
            </Badge>
          ) : (
            <div className='absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-sm'>
              <span className='text-white font-bold text-lg'>Hết hàng</span>
            </div>
          )}
        </div>
      </CardContent>

      {/* Product Info */}
      <CardContent className='flex-1 flex flex-col justify-between p-3'>
        {/* Name & Description */}
        <div>
          <Link to={`/product/${dataItem._id}`}>
            <h2 className='hover:text-blue-600 font-semibold text-lg line-clamp-2  transition-colors cursor-pointer'>
              {nameProduct}
            </h2>
          </Link>
          <p className='text-xs text-muted-foreground line-clamp-1 mt-1'>{descriptionProduct}</p>
        </div>

        {/* Metadata */}
        {metadata && (
          <div className='mt-2 space-y-1 text-xs text-muted-foreground'>
            {metadata.translator && (
              <div>
                <span className='font-medium text-foreground'>Tác giả:</span> {metadata.translator}
              </div>
            )}
            {metadata.publisher && (
              <div>
                <span className='font-medium text-foreground'>NXB:</span> {metadata.publisher}
              </div>
            )}
            {metadata.size && (
              <div>
                <span className='font-medium text-foreground'>Kích cỡ:</span> {metadata.size}
              </div>
            )}
          </div>
        )}

        {/* Price */}
        <div className='space-y-1'>
          <div className='flex items-baseline gap-2'>
            <span className='text-xl font-bold text-foreground'>{discountedPrice.toLocaleString()} ₫</span>
            {discountProduct > 0 && (
              <span className='text-xs text-muted-foreground line-through'>{priceProduct.toLocaleString()} ₫</span>
            )}
          </div>
          {discountProduct > 0 && (
            <p className='text-xs text-green-600 dark:text-green-400 font-medium'>
              Tiết kiệm {savingAmount.toLocaleString()} ₫
            </p>
          )}
        </div>
      </CardContent>

      {/* Action Buttons */}
      <CardFooter className='gap-1 p-3 pt-0'>
        <Button className='w-full' disabled={stockProduct === 0}>
          <ShoppingCart className='mr-2' />
          Thêm vào giỏ
        </Button>
      </CardFooter>
    </Card>
  )
}
