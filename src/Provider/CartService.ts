import { CartTable } from "../Model/cartTable";

export class CartService {
  private cart: CartTable[] = [];


  addcart(
    ProductId:any,
    ProductName: string,
    ProductImage: string,
    ProductMainPrice: string,
    ProductDiscountPrice: string,
    ProductQty: number
  ) {

    this.cart.push(new CartTable( ProductId, ProductName, ProductImage,ProductMainPrice, ProductDiscountPrice, ProductQty));
    console.log("Add cart" + JSON.stringify(this.cart));
  }


  readdcart(cart: CartTable) {
    this.cart.push(cart);
    console.log("********************");
  }

  getcart() {
    console.log("Size " + this.cart.length + "");
    console.log("get cart " + JSON.stringify(this.cart));
    return this.cart.slice();

  }

  initilizeItem(data: any) {
    this.cart = data;
  }

  removecart(index: number) {
    this.cart.splice(index, 1);
  }

  Length() {
    return this.cart.length;
  }


  removecart_with_product_id(ProductIdRemove) {
    for (let i = 0; i < this.cart.length; i++) {
      if (this.cart[i].ProductId == ProductIdRemove) {
        this.cart.splice(i, 1);
      }
    }

  }
  CheckProductInCart(ProductIdRemove) {
    for (let i = 0; i < this.cart.length; i++) {
      if (this.cart[i].ProductId == ProductIdRemove) {
        return true;
      }
    }

    return false;
  }

  updateItemCount(index: number, newproductqty: number) {

    console.log("index=" + index);
    console.log("newproductqty=" + newproductqty);
    this.cart[index].ProductQty = newproductqty;
  }

  emptycart() {
    this.cart = [];
    this.getcart();
  }

}
