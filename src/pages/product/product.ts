import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,Content,Platform,App } from 'ionic-angular';
import { DataOfProduct } from './ProductData';

/**
 * Generated class for the ProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {
  @ViewChild(Content) content: Content;
  ProductData:any=[];
  category:any="LipStick"; 
  constructor(public navCtrl: NavController, public navParams: NavParams,public platform:Platform, public app:App) {
    this.getProduct(this.category);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductPage');
    //Platform BackClick
    this.platform.registerBackButtonAction(() => {
      this.app.getRootNav().setRoot("TabsPage", { "SelectedIndex": 0 });
    });
  }

  //Back Icon Click
  backClick(){
    this.app.getRootNav().setRoot("TabsPage", { "SelectedIndex": 0 });
  }

  //Segment Changed Click
  segmentChanged(ev){
    console.log(ev.value);
    this.scrollToTop();
    this.getProduct(ev.value);
  }

  //Get Categoryvise Product
  getProduct(category){
    this.ProductData = [];
    for(let i = 0; i < DataOfProduct.data.ProductList.length; i++){
      if(DataOfProduct.data.ProductList[i].Category == category){
        this.ProductData.push(DataOfProduct.data.ProductList[i]);
      }
    }
  }

  //Go to product Deatils Page
  gotoProductDetails(data){
    this.navCtrl.push('ProductDetailsPage',{"Data":data});
  }

  //Scroll Page to Top
  scrollToTop() {
    this.content.scrollToTop();
  }
}
