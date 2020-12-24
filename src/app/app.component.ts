import { Component, ViewChild } from '@angular/core';
import { Nav, Platform,App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UserService } from '../Provider/UserService';
import { Events } from 'ionic-angular';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav; 
  rootPage: any;
  pages: Array<{ id: any, title: string, component: string, parent:number,submenu:Boolean }> = [];
  checklogin:any;
  checkSkip:any;
  Parent:any;
  openmenu:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,public userService:UserService,
    public event: Events,public app: App) {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleLightContent();
      splashScreen.hide();

      this.checklogin = localStorage.getItem('BrainvireLogin');
      this.checkSkip = localStorage.getItem('BrainvireSkip');

      this.pages.push({ id: 1, title: "Men's Wear", component: 'ProductPage', parent:  0,submenu: true });
      this.pages.push({ id: 11, title: "Jeans", component: 'ProductPage', parent:  1,submenu: false });
      this.pages.push({ id: 12, title: "Shirt", component: 'ProductPage', parent:  1,submenu: false });
      this.pages.push({ id: 2, title: "Women's Wear", component: 'ProductPage', parent: 0 ,submenu: true});
      this.pages.push({ id: 21, title: "Wallet & Bags", component: 'ProductPage', parent: 2 ,submenu: false});
      this.pages.push({ id: 22, title: "Western Wear", component: 'ProductPage', parent: 2,submenu: false});
      this.pages.push({ id: 23, title: "Jewellary", component: 'ProductPage', parent: 2 ,submenu: false});
      this.pages.push({ id: 3, title: "Accesories", component: 'ProductPage', parent: 0,submenu: true  });
      this.pages.push({ id: 31, title: "Belt", component: 'ProductPage', parent: 3,submenu: false  });
      this.pages.push({ id: 32, title: "Shooes", component: 'ProductPage', parent: 3,submenu: false  });
      this.pages.push({ id: 4, title: "Track Order", component: '',parent: 0,submenu: false });
      this.pages.push({ id: 5, title: "Settings", component: '', parent: 0,submenu: false});
      this.pages.push({ id: 6, title: "Account Details", component: '', parent: 0 ,submenu: false });
      if(this.checkSkip != 'true') {
        this.pages.push({ id: 7, title: 'Logout', component: '',parent: 0,submenu: false  });
      }
      else{
        this.pages.push({ id: 7, title: 'Exit App', component: '',parent: 0,submenu: false  });

      }


      
      // For Check the Logged In or Not
      console.log("CheckLogin Status " + this.checklogin)
      if (this.checklogin == 'true') {
        this.userdetails();
        this.rootPage = 'TabsPage';
      }
      else{
        this.rootPage = 'LoginPage';
      }

       //For Call Login Details where Other page needed the details
       event.subscribe('User:details', () => {
        this.userdetails();
      });

  }

  opensubmenu(data){
    this.Parent = data.id;
    this.openmenu = true;
  }

  closesubmenu(){
    this.Parent = '';
    this.openmenu = false;
  }

   //Navigate from menu to pages
   gotoPage(data) {
    if (data.id == 7) {
      this.LogoutCall();
    }
    else if(data.id == 4){
      this.app.getRootNav().setRoot("TabsPage", { "SelectedIndex": 1 });
    }
    else if(data.id == 5){
      this.app.getRootNav().setRoot("TabsPage", { "SelectedIndex": 2 });
    }
    else if(data.id == 6){
      this.app.getRootNav().setRoot("TabsPage", { "SelectedIndex": 4 });
    }
    else {
      this.nav.setRoot(data.component)
    }
  }

  //Store parameter serviices from storage
  userdetails() {
    this.userService.BrainvireUserName =  localStorage.getItem('BrainvireUserName');
    this.userService.BrainvireMobileNumber =  localStorage.getItem('BrainvireMobileNumber');
    this.userService.BrainvireEmail =  localStorage.getItem('BrainvireEmail');
    this.userService.BrainvirePassword =  localStorage.getItem('BrainvirePassword');
   
    console.log("BrainvireUserName  " +  this.userService.BrainvireUserName);
    console.log("BrainvireEmail ",this.userService.BrainvireEmail);
    console.log("BrainvireMobileNumber ",this.userService.BrainvireMobileNumber);
    console.log("checklogin " + this.checklogin);
  }

  //For Logout
  LogoutCall() {
    localStorage.setItem('BrainvireLogin', 'false');
    this.nav.setRoot('LoginPage');
  }
}
