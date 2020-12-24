import { UserTable } from "../Model/UserTable";

export class UserService {
  BrainvireUserName:any;
  BrainvireEmail:any;
  BrainvireMobileNumber:any;
  BrainvirePassword:any;
  private user: UserTable[] = [];


  adduser( 
     Username: any,
     Email: any,
     MobileNumber: any,
     Password: any) {
    this.user.push(new UserTable(Username, Email,MobileNumber,Password));
  }


  readuser(user: UserTable) {
    this.user.push(user);
  }

  getuser() {
    return this.user.slice();
  }

  initilizeItem(data: any) {
    this.user = data;
  }

  removeuser(index: number) {
    this.user.splice(index, 1);
  }

  Length() {
    return this.user.length;
  }


  Updatepassword(index: number,newpassword:number) {
    console.log("index = " + index);
    console.log("newpassword = " + newpassword);
    this.user[index].Password = newpassword;
  }

  emptyuser() {
    this.user = [];
    this.getuser();
  }

}
