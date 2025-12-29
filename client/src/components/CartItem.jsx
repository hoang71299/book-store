import { Minus, Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
export default function CartItem({ handleDeleteCart, handleChangeCart, product, quantity }) {
  const [quantity1, setQuantity1] = useState(quantity)

  const [open, setOpen] = useState(false)

  const discountedPrice = product.priceProduct * (1 - product.discountProduct / 100)

  const itemTotal = discountedPrice * quantity1

  const handleChangeQuantity = (productId, newQuantity) => {
    setQuantity1(newQuantity)
    handleChangeCart(productId, newQuantity)
  }
  const handleDelete = (productId) => {
    handleDeleteCart(productId)
  }

  return (
    <div className='flex gap-4 py-4 border-b border-border'>
      <div className='relative h-24 w-20 flex-shrink-0 overflow-hidden rounded-md bg-muted'>
        <img
          src={product.imagesProduct?.[0] || '/placeholder.svg'}
          alt={product.nameProduct}
          className='object-cover'
        />
      </div>

      <div className='flex flex-1 flex-col'>
        <div className='flex justify-between'>
          <div>
            <h3 className='font-medium text-foreground'>{product.nameProduct}</h3>
            <p className='mt-1 text-sm text-muted-foreground'>{product.descriptionProduct}</p>
          </div>

          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button variant='ghost' size='icon' className='h-8 w-8 text-muted-foreground hover:text-destructive'>
                <Trash2 className='h-4 w-4' />
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-64' align='end'>
              <div className='space-y-3'>
                <p className='text-sm font-medium'>Xóa sản phẩm này?</p>
                <p className='text-xs text-muted-foreground'>{product.nameProduct}</p>
                <div className='flex gap-2'>
                  <Button variant='outline' size='sm' className='flex-1 bg-transparent' onClick={() => setOpen(false)}>
                    Hủy
                  </Button>
                  <Button
                    variant='destructive'
                    size='sm'
                    className='flex-1'
                    onClick={() => {
                      handleDelete(product._id)
                      setOpen(false)
                    }}
                  >
                    Xóa
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <div className='mt-auto flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <Button variant='outline' size='icon' onClick={() => handleChangeQuantity(product._id, quantity1 - 1)}>
              <Minus className='h-3 w-3' />
            </Button>

            <span className='w-8 text-center font-medium'>{quantity1}</span>

            <Button variant='outline' size='icon' onClick={() => handleChangeQuantity(product._id, quantity1 + 1)}>
              <Plus className='h-3 w-3' />
            </Button>
          </div>

          <div className='text-right'>
            <p className='text-sm line-through text-muted-foreground'>
              {product.priceProduct.toLocaleString('vi-VN')}đ
            </p>
            <p className='font-semibold'>{itemTotal.toLocaleString('vi-VN')}đ</p>
          </div>
        </div>
      </div>
    </div>
  )
}
