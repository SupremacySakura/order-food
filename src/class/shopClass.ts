//店铺卡片对象类型
class shopCardClass {
  id: string | number
  coverImage: string
  name: string
  point: number
  sales: number
  start_price: number
  delivery_price: number
  label: string[]
  other: string[]
  news:string
  constructor(id: string | number, coverImage: string, name: string, point: number, sales: number, start_price: number, delivery_price: number, label: string[], other: string[],news:string) {
    this.id = id
    this.coverImage = coverImage
    this.name = name
    this.point = point
    this.sales = sales
    this.start_price = start_price
    this.delivery_price = delivery_price
    this.label = label
    this.other = other
    this.news = news
  }
}
//店铺菜单类型
class menuClass {
  id: number
  type: string
  image: string
  name: string
  menu_label: string[]
  sales: number
  price: number
  shop_id: string | number
  count:number
  contains:string
  constructor(id: number, type: string, image: string, name: string, menu_label: string[], sales: number, price: number, shop_id: string | number,contains:string) {
    this.id = id
    this.type = type
    this.image = image
    this.name = name
    this.menu_label = menu_label
    this.sales = sales
    this.price = price
    this.shop_id = shop_id
    this.count = 0
    this.contains = contains
  }
}
//菜单类
class menuListClass {
  type: string
  menu: menuClass[]
  constructor(type: string, menu: menuClass[]) {
    this.type = type
    this.menu = menu
  }
}
//菜单＋数量类
class shoppingCartClass extends menuClass {
  count:number 
  constructor(count: number, id: number, type: string, image: string, name: string, menu_label: string[], sales: number, price: number, shop_id: string | number,contains:string){
    super(id,type,image,name,menu_label,sales,price,shop_id,contains)
    this.count = count
  }
}

export {
  shopCardClass,
  menuClass,
  menuListClass,
  shoppingCartClass
}