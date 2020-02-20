import { Component, OnInit } from '@angular/core';
import { SendHttpRequestService } from '../send-http-request.service';

@Component({
  selector: 'app-profile-dashboard',
  templateUrl: './profile-dashboard.component.html',
  styleUrls: ['./profile-dashboard.component.css']
})
export class ProfileDashboardComponent implements OnInit {

  constructor(private sendReq: SendHttpRequestService) { }

  userArray: any;

  username: String = "loading..."
  posts: Number = 0;
  following: Number = 0;
  followers: Number = 0;
  name: String = "loading...";
  bio: String = "I am a Software Developer. Currently I am an Intern at Cyber Group. I am pursuing B.Tech from Sharda University.";
  
  ngOnInit() {
    this.loadUserData();
  }

  loadUserData(){
    this.sendReq.userData().subscribe(res => {
      this.userArray = res;
      this.setUserData();
    });
  }

  setUserData(){
    this.username = this.userArray[0].instaHandle;
    this.posts = this.userArray[0].postsCount;
    this.following = this.userArray[0].following;
    this.followers = this.userArray[0].followers;
    this.name = this.userArray[0].name;
    if(this.userArray[0].about != null){
      this.bio = this.userArray[0].about;
    }else{
      this.bio = "You can add your description here !"
    }
  }
}
