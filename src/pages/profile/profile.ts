import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { UserService } from '../../Provider/UserService';


/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public platform:Platform, 
     public app:App,
     public userService:UserService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    //Platform Back
    this.platform.registerBackButtonAction(() => {
      this.app.getRootNav().setRoot("TabsPage", { "SelectedIndex": 0 });
    });
  }

}
