import { SendHttpRequestService } from './../send-http-request.service';
import { Component, OnInit } from '@angular/core';
import {AfterViewInit, ElementRef, ViewChild} from '@angular/core';
import { HostListener } from "@angular/core";

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.css']
})
export class ImageGalleryComponent implements OnInit {
  
  constructor(private sendReq: SendHttpRequestService) { }
  postsArray: any;
  basePath: String = "http://localhost:8081/";
  ngOnInit() {
    this.loadUserPosts();
  }

  //Loads the user Posts Array
  loadUserPosts(){
    this.sendReq.userPosts().subscribe(res => {
      this.postsArray = res;
      console.log("Array For Posts ---------");
      console.log(res);
    });
  }
}
