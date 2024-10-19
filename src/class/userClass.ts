class userClass {
  id: number
  username: string
  account: number
  money: number
  headPortrait: string
  constructor(id: number,username: string,account: number,money: number,headPortrait: string) {
    this.id=id
    this.username=username
    this.account=account
    this.money=money
    this.headPortrait=headPortrait
  }
}
export{
  userClass
}