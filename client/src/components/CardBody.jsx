import React, { useState } from 'react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Heart, ShoppingCart } from 'lucide-react'

export default function CardBody({ dataItem }) {
  const [isFavorite, setIsFavorite] = useState(false)

  if (!dataItem) return null

  const { nameProduct, descriptionProduct, priceProduct, discountProduct, imagesProduct, stockProduct, metadata } =
    dataItem

  const discountedPrice = Math.round(priceProduct * (1 - discountProduct / 100))

  return (
    <Card className=' w-full overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 flex flex-col h-full'>
      {/* Product Image */}
      <CardContent className='p-0 relative flex-shrink-0'>
        <div className='relative w-full aspect-square overflow-hidden bg-white'>
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
            variant='ghost'
            size='icon'
            onClick={() => setIsFavorite(!isFavorite)}
            className='absolute top-2 left-2  bg-white/80 hover:bg-white dark:bg-gray-900/80 dark:hover:bg-gray-900 rounded-full'
          >
            <Heart
              size={16}
              fill={isFavorite ? 'rgb(231, 0, 11)' : 'none'}
              className={isFavorite ? 'text-destructive' : 'text-accent-foreground'}
            />
          </Button>
          {/* Stock Status */}
          {stockProduct > 0 && (
            <div className='absolute bottom-2 left-2 bg-orange-500 text-background text-xs font-semibold px-2 py-1 rounded'>
              Còn {stockProduct}
            </div>
          )}
          {stockProduct === 0 && (
            <div className='absolute inset-0  flex items-center justify-center'>
              <span className='text-white font-bold'>Hết hàng</span>
            </div>
          )}
        </div>
      </CardContent>

      {/* Product Info */}
      <CardContent className='flex-1 flex flex-col justify-between p-3'>
        {/* Name & Description */}
        <div>
          <h3 className='hover:font-semibold font-semibold text-sm line-clamp-2  transition-colors cursor-pointer'>
            {nameProduct}
          </h3>
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
        <div className='mt-2'>
          <div className='flex items-center gap-1'>
            <span className='text-lg font-bold '>{discountedPrice.toLocaleString()}</span>
            <span className='text-xs text-muted-foreground'>₫</span>
          </div>
          {discountProduct > 0 && (
            <span className='text-xs text-muted-foreground line-through'>{priceProduct.toLocaleString()} ₫</span>
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
