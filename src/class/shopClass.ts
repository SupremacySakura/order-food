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
  constructor(id: string | number, coverImage: string, name: string, point: number, sales: number, start_price: number, delivery_price: number, label: string[], other: string[]) {
    this.id = id
    this.coverImage = coverImage
    this.name = name
    this.point = point
    this.sales = sales
    this.start_price = start_price
    this.delivery_price = delivery_price
    this.label = label
    this.other = other
  }
}

export {
  shopCardClass
}