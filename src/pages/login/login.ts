import { Component } from '@angular/core';
import { App, Events, IonicPage, LoadingController, AlertController, NavController, NavParams, ToastController, MenuController, Platform } from 'ionic-angular';
import { UserService } from '../../Provider/UserService';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loginlbl: any = 'signin';
  ToastMsg: any;
  LshowPass: boolean;
  Ltype: any = 'password';

  showPass: boolean;
  type: any = 'password';

  conf_showPass: boolean;
  conf_type: any = 'password';


  MobileNumber: any;
  UserName: any;
  Email: any;
  Password: any;
  ConfirmPassword: any;

  LEmail: any;
  LPassword: any;

  IsValidLEmail: any;
  IsValidLPassword: any;

  IsValidMobileNumber: any;
  IsValidUserName: any;
  IsAlreadyUserName: any = false;
  IsValidEmail: any;
  IsAlreadyEmail: any = false;
  IsValidPassword: any;
  IsValidConfirmPassword: any;
  PasswordMatch: any;

  UserData: any = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public platform: Platform,
    public event: Events,
    public app: App,
    public userService: UserService,
    public alertCtrl: AlertController,
  ) {
    // localStorage.setItem('AllUser', JSON.stringify(this.UserData));
    this.getAllUserData();
    this.menuCtrl.enable(false);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    //Platform Back
    this.platform.registerBackButtonAction(() => {
      if (this.loginlbl == 'signup') {
        this.loginlbl = 'signin';
      } else {
        this.Exitapp();
      }
    });
  }

  //Select Signin or Signup
  selectlabel(flag) {
    this.loginlbl = flag;
  }

  //Skip Button Click
  SkipClick() {
    this.userService.BrainvireUserName = "Guest User";
    this.userService.BrainvireMobileNumber = "Null";
    this.userService.BrainvireEmail = "Guest@gmail.com";

    localStorage.setItem('BrainvireUserName', this.userService.BrainvireUserName);
    localStorage.setItem('BrainvireEmail', this.userService.BrainvireEmail);
    localStorage.setItem('BrainvireMobileNumber', this.userService.BrainvireMobileNumber);
    localStorage.setItem('BrainvireLogin', 'true');
    localStorage.setItem('BrainvireSkip', 'true');
    this.navCtrl.setRoot('TabsPage');
  }


  showPassword() {
    this.showPass = !this.showPass;
    if (this.showPass) {
      this.type = 'text';
    } else {
      this.type = 'password';
    }
  }

  LshowPassword() {
    this.LshowPass = !this.LshowPass;
    if (this.LshowPass) {
      this.Ltype = 'text';
    } else {
      this.Ltype = 'password';
    }
  }

  confshowPassword() {
    this.conf_showPass = !this.conf_showPass;
    if (this.conf_showPass) {
      this.conf_type = 'text';
    } else {
      this.conf_type = 'password';
    }
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



  //Password Validation Method
  checkPassword(ev) {
    let passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{8,}$/;
    if (passwordRegEx.test(ev)) {
      return true;
    } else {
      return false;
    }
  }

  //Check Email Validation Method
  checkEmail(ev) {
    let emailRegEx = /[0-9a-zA-Z._]+[@]{1}[0-9a-zA-Z]+[.][0-9a-zA-Z]{2,4}/;

    if (emailRegEx.test(ev)) {
      return true;
    } else {
      return false;
    }
  }

  //Check Mobile Number Validation Method
  checkMobile(ev) {
    let mobileRegEx = /[0-9]{10}/;

    if (mobileRegEx.test(ev)) {
      return true;
    } else {
      return false;
    }
  }

  // Check String is Valid or Not Method
  checkString(ev) {
    if (ev == null || ev == "" || ev == undefined) {
      return false;
    } else if (ev != undefined) {
      let stringoflbl = ev.trim();
      if (stringoflbl == "") {
        return false;
      }
      else {
        return true;
      }
    }
    else {
      return true;
    }
  }

//Register Button Click
  RegisterClick() {
    this.IsValidUserName = this.checkString(this.UserName);
    this.IsValidEmail = this.checkEmail(this.Email);
    this.IsValidMobileNumber = this.checkMobile(this.MobileNumber);
    this.IsValidPassword = this.checkPassword(this.Password);
    this.IsValidConfirmPassword = this.checkPassword(this.ConfirmPassword);
    console.log(this.IsValidConfirmPassword, this.IsValidPassword, this.PasswordMatch)

    if (this.IsValidUserName == false || this.IsValidEmail == false || this.IsValidMobileNumber == false || this.IsValidPassword == false || this.IsValidConfirmPassword == false) {

    }
    else if (this.IsValidPassword == true && this.IsValidConfirmPassword == true && this.PasswordMatch == undefined) {
      if (this.Password != this.ConfirmPassword) {
        this.PasswordMatch = false;
      }
      else if (this.Password == this.ConfirmPassword) {
        this.PasswordMatch = true;
      }
    }
    else if (this.IsValidPassword == true && this.IsValidConfirmPassword == true && this.PasswordMatch == false) {
      if (this.Password != this.ConfirmPassword) {
        this.PasswordMatch = false;
      }
      else if (this.Password == this.ConfirmPassword) {
        this.PasswordMatch = true;
      }
    }
    else {
      if (this.UserData.length === 0 || this.UserData.length === undefined) {
        console.log("Register 1")
        this.userService.adduser(this.UserName, this.Email, this.MobileNumber, this.Password);
        this.UserData = this.userService.getuser();
        localStorage.setItem('AllUser', JSON.stringify(this.UserData));
        this.ToastMsg = "Successfully Register";
        this.presentToast();
        this.loginlbl = 'signin';
        this.getAllUserData();
      }
      else if (this.UserData.length !== 0 || this.UserData.length !== undefined) {
        console.log("Register 2")
        for (let i = 0; i < this.UserData.length; i++) {
          if (this.UserData[i].Username == this.UserName) {
            this.IsAlreadyUserName = true;
          }
          else if (this.UserData[i].Email == this.Email) {
            this.IsAlreadyEmail = true;
          }
        }
        if (this.IsAlreadyUserName == false && this.IsAlreadyEmail == false) {
          this.userService.adduser(this.UserName, this.Email, this.MobileNumber, this.Password);
          this.UserData = this.userService.getuser();
          localStorage.setItem('AllUser', JSON.stringify(this.UserData));
          this.ToastMsg = "Successfully Register";
          this.presentToast();
          this.loginlbl = 'signin';
          this.getAllUserData();
        }
        else {
          console.log("Register 3")
        }
      }
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


  //Login Button Click
  loginClick() {
    this.IsValidLEmail = this.checkEmail(this.LEmail);
    this.IsValidLPassword = this.checkPassword(this.LPassword);

    if (this.IsValidLEmail == false && this.IsValidLPassword == false) {

    }
    else {
      let userfind: boolean = false;
      for (let i = 0; i < this.UserData.length; i++) {
        if (this.UserData[i].Email.toLowerCase() === this.LEmail.toLowerCase()) {
          let data = this.UserData[i];
          if (data.Password === this.LPassword) {
            //Succefully Login and Store Logged User Details in User Service and Storage 

            userfind = true;
            this.userService.BrainvireUserName = data.Username;
            this.userService.BrainvireMobileNumber = data.MobileNumber;
            this.userService.BrainvireEmail = data.Email;
            this.userService.BrainvirePassword = data.Password;

            localStorage.setItem('BrainvireUserName', this.userService.BrainvireUserName);
            localStorage.setItem('BrainvireEmail', this.userService.BrainvireEmail);
            localStorage.setItem('BrainvireMobileNumber', this.userService.BrainvireMobileNumber);
            localStorage.setItem('BrainvirePassword', this.userService.BrainvirePassword);
            localStorage.setItem('BrainvireLogin', 'true');
            this.navCtrl.setRoot('TabsPage');

          } else {
            userfind = false;
            this.ToastMsg = "Email or password is wrong or not authorized.";
            this.presentToast();
          }
        }
      }

      if (userfind != true) {
        this.ToastMsg = "Email or password is wrong or not authorized.";
        this.presentToast();
      }
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
