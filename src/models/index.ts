export interface Rating {
  rate: number
  count: number
}
export interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: Rating
  viewMore: boolean
}

export interface Category {
  label: string
  icon: string
  route: string
}

export interface Order {
  id?: string
  product: Partial<Product>
  amount: number
}
