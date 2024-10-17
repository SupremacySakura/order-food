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
  constructor(id: number, type: string, image: string, name: string, menu_label: string[], sales: number, price: number, shop_id: string | number) {
    this.id = id
    this.type = type
    this.image = image
    this.name = name
    this.menu_label = menu_label
    this.sales = sales
    this.price = price
    this.shop_id = shop_id
  }
}
class menuListClass {
  type: string
  menu: menuClass[]
  constructor(type: string, menu: menuClass[]) {
    this.type = type
    this.menu = menu
  }
}
export {
  shopCardClass,
  menuClass,
  menuListClass
}