import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams, Platform, ToastController } from 'ionic-angular';
import { CartService } from '../../Provider/CartService';

/**
 * Generated class for the ProductDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-details',
  templateUrl: 'product-details.html',
})
export class ProductDetailsPage {

  ProductData:any;
  ProductQty:any = 1;
  CartList:any=[];
  CartCount:any;
  ToastMsg:any;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public platform:Platform,
     public app:App,
     public CartService: CartService,
     public toastCtrl:ToastController) {
    this.ProductData = this.navParams.get('Data');
    this.initilizeItem();
    console.log(this.ProductData);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailsPage');
    //Platform Back
    this.platform.registerBackButtonAction(() => {
      this.navCtrl.pop();
    });
  }

  //Back Icon Click
  backClick(){
    this.navCtrl.pop();
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
    } else {
      this.CartCount = 0;
    }
  }

  //Product Qty Change
  ProductQtyChange( type: string) {
    if (type == 'add') {
      this.ProductQty = this.ProductQty + 1;
    }
    else {
      if (this.ProductQty == 1) {

      }
      else {
        this.ProductQty = this.ProductQty - 1;
      }
    }
  }


  //Add Product to Cart
  Addtocart(item) {
    console.log("add to cart" + JSON.stringify(item))

    this.CartService.addcart(item.ProductId,
      item.ProductName,
      item.ProductImage,
      item.ProductMainPrice,
      item.ProductDiscountPrice,
      this.ProductQty);


    this.CartList = this.CartService.getcart();
    localStorage.setItem('CartList', JSON.stringify(this.CartList));

    this.CartCount = this.CartList.length;
    this.app.getRootNav().setRoot("TabsPage", { "SelectedIndex": 2 });

  }


  //Check Product is in Cart or Not
  checkProductForCart(item) {
    let itempresent:boolean;
    if (this.CartCount == 0) {
      this.Addtocart(item);
    }

    for (let i = 0; i < this.CartList.length; i++) {
      if (item.ProductId == this.CartList[i].ProductId) {
        this.ToastMsg ="Product is Already in Cart";
        this.presentToast();
        itempresent = true;
      }
    }

    if(itempresent != true){
      this.Addtocart(item);
    }
  }

  //Toast Method
  presentToast() {
    let toast = this.toastCtrl.create({
      message: this.ToastMsg,
      duration: 3000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
    });

    toast.present();
  }
} 
