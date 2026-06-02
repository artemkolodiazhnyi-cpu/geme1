export interface Brand {
  id: string
  name: string
  country: string | null
  logo_url: string | null
}

export interface Category {
  id: string
  name: string
  parent_id: string | null
}

export interface Tag {
  id: string
  name: string
}

export interface Outfit {
  id: string
  name: string
  description: string | null
  brand_id: string
  category_id: string
  price_min: number
  price_max: number
  image_url: string | null
  emoji: string | null
  style: string | null
  is_active: boolean
  created_at: string
}

export interface Profile {
  id: string
  full_name: string | null
  avatar_url: string | null
  bio: string | null
  created_at: string
}

export interface SwipeHistory {
  id: string
  user_id: string
  outfit_id: string
  is_liked: boolean
  swiped_at: string
}

export interface Collection {
  id: string
  user_id: string
  name: string
  is_public: boolean
  created_at: string
}

export interface Order {
  id: string
  user_id: string | null
  stripe_session_id: string
  status: string
  total_amount: number
  created_at: string
}

export interface OutfitWithRelations extends Outfit {
  brand: Brand
  category: Category
}

export interface OutfitItem {
  id: number
  outfit_id: number
  name: string
  category: string
  price: number
  image_url: string | null
  sizes: string
  is_available: boolean
  description: string | null
}

export interface CartItem {
  id: string
  name: string
  emoji: string
  price: number
  quantity: number
}
