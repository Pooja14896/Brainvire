import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { CartService } from '../../Provider/CartService';

/**
 * Generated class for the CartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  CartList:any=[];
  CartCount:any;
  TotalPrice:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public CartService: CartService,
    public platform: Platform,
    public app: App,) {
    this.initilizeItem();
    }


  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
    //Platform Back
    this.platform.registerBackButtonAction(() => {
      this.app.getRootNav().setRoot("TabsPage", { "SelectedIndex": 0 });
    });
  }

  //Get Cart data
  initilizeItem() {
    this.CartList = JSON.parse(localStorage.getItem('CartList'));

    if (this.CartList != null) {

      this.CartCount = this.CartList.length;
      this.CartService.emptycart();
      for (let i = 0; i < this.CartList.length; i++) {
        this.CartService.readdcart(this.CartList[i]);
      }
      this.CartService.getcart();
      this.SetTotalPrice();
    } else {
      this.CartCount = 0;
    }
  }

   //Remove Product from Cart
    removeprooductFromCart(item) {
      this.CartService.removecart_with_product_id(item.ProductId);
      this.CartList = this.CartService.getcart();
      this.CartCount = this.CartList.length;
      localStorage.setItem('CartList', JSON.stringify(this.CartList));
      this.SetTotalPrice();
    }

    //Product Qty Change
    ProductQtyChange(item: any, type: string, index) {
      if (type == 'add') {
        item.ProductQty = item.ProductQty + 1;
      }
      else {
        if (item.ProductQty == 1) {
  
        }
        else {
          item.ProductQty = item.ProductQty - 1;
        }
      }
      this.CartService.updateItemCount(index, item.ProductQty);
      this.CartList = this.CartService.getcart();
      localStorage.setItem('CartList', JSON.stringify(this.CartList));
      this.SetTotalPrice();
    }

    //Calculate Total of Cart
    SetTotalPrice() {
      this.TotalPrice = 0;
      for (let i = 0; i < this.CartList.length; i++) {
        this.TotalPrice = this.TotalPrice + parseInt(this.CartList[i].ProductDiscountPrice) * parseInt(this.CartList[i].ProductQty);
      }
      console.log("TotalPrice" + this.TotalPrice)
    }

}
