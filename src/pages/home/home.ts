import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform,AlertController, App } from 'ionic-angular';
import { UserService } from '../../Provider/UserService';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  SlideImages:Array<{ Image:any}>=[];
  UserData: any = [];
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public platform: Platform,
    public app: App,
    public userService: UserService,
    public alertCtrl:AlertController) {
      this.getAllUserData();
    this.SlideImages.push({Image:'https://www.ezyshine.com/wp-content/uploads/2013/11/online-stores-for-shopping.jpg'});
    this.SlideImages.push({Image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBCckxNYM7hrdJmkpZEUbp8z8dDlr0Nd9OAg&usqp=CAU'});
    this.SlideImages.push({Image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIzITXPoPvZj8EYERdjhGZyi-Br_-cmjK2Yw&usqp=CAU'});
    this.SlideImages.push({Image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRU-R5ImYymGrnQtaB0mEXyTWky0pI_DLt3g&usqp=CAU'});
    this.SlideImages.push({Image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPXyILlxC_OOndVFgtnhs_hXLPyE16-qOoyQ&usqp=CAU'});
    this.SlideImages.push({Image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnryHs3jg72hWjPg8EkcHfqNavR98P9nJDqw&usqp=CAU'});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    //Platform Back
    this.platform.registerBackButtonAction(() => {
      this.Exitapp();
    });
  }

   //Fetch All Registered User From UserService
   getAllUserData() {
    let data: any = localStorage.getItem('AllUser');
    if (data != []) {
      this.UserData = JSON.parse(localStorage.getItem('AllUser'));
      console.log("this.UserData initialize " + JSON.stringify(this.UserData));
      if (this.UserData != null) {
        this.userService.emptyuser();
        for (let i = 0; i < this.UserData.length; i++) {
          this.userService.readuser(this.UserData[i]);
        }
        this.userService.getuser();
      } else {
        this.UserData = [];
      }
    } else {
      this.UserData = [];
    }
  }


  //Exit App Alert
  Exitapp() {
    const confirm = this.alertCtrl.create({
      title: 'Exit Application',
      message: 'Are you sure you want to exit app?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {

          }
        },
        {
          text: 'Ok',
          handler: () => {
            this.platform.exitApp();
          }
        }
      ]
    });
    confirm.present();
  }
}
