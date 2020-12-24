import { Component, ViewChild } from '@angular/core';
import {
  AlertController,
  App,
  Events,
  IonicPage,
  MenuController,
  NavController,
  NavParams,
  Platform,
  Tab,
  Tabs
} from "ionic-angular";
import { CartService } from '../../Provider/CartService';

/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  @ViewChild('myTabs') tabRef: Tabs;
  HomePage = "HomePage";
  OfferPage = "OfferPage";
  CartPage = "CartPage";
  SearchPage = "SearchPage";
  ProfilePage = "ProfilePage";

  selectedIndex: number = 0; 
  CartList:any=[];
  CartCount:any;
  count:any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
     public app: App, 
     public event: Events,
     public menuCtrl: MenuController, 
     public platform: Platform, 
     public CartService:CartService,
     public alertCtrl: AlertController) {
    this.selectedIndex = this.navParams.get("SelectedIndex");
    this.menuCtrl.enable(true);
    this.initilizeItem();

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

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

  tabSelected(tab: Tab) {
    console.log("Tabindex on change" + tab.index);
    this.selectedIndex = tab.index;
    this.event.publish('tab:click', {"SelectedIndex": this.selectedIndex});
  }
    

}
