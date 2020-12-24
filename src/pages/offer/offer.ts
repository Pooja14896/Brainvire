import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams, Platform } from 'ionic-angular';


/**
 * Generated class for the OfferPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-offer',
  templateUrl: 'offer.html',
})
export class OfferPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public platform:Platform, public app:App) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OfferPage');
    //Platform Back
    this.platform.registerBackButtonAction(() => {
      this.app.getRootNav().setRoot("TabsPage", { "SelectedIndex": 0 });
    });
  }

}
