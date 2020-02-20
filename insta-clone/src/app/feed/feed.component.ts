import { SendHttpRequestService } from './../send-http-request.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FileUploader, FileUploaderOptions } from 'ng2-file-upload';
declare function addcomment(): any;

const URL = 'http://localhost:8080/upload';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})

export class FeedComponent implements OnInit {

  constructor(private sendReq: SendHttpRequestService) { }
  @ViewChild('modal', {static: false}) modal: ElementRef;
  @ViewChild('caption', {static: false}) caption: ElementRef;

  postArray: any;
  basePath: String = "http://localhost:8081/";

  public uploader: FileUploader = new FileUploader({
    url: URL,
    itemAlias: 'image',
    authTokenHeader: "token",
    authToken: localStorage.getItem("token")
  });

  uploadPost(){
    this.uploader.onBuildItemForm = (item, form) => {
      form.append("ownerId", this.sendReq.jsonDecoder(localStorage.getItem("token")).data._id);
      form.append("caption", this.caption.nativeElement.value);
    }
    this.uploader.uploadAll();
  }

  loadPosts(){
    console.log("posts()");
    this.sendReq.posts().subscribe(res => {
      console.log(res);
      this.postArray = res;
    });
  }

  ngOnInit() {
    this.loadPosts();
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    this.uploader.onCompleteItem = (item: any, status: any) => {
      console.log("Uploaded File details", item, status);
    };
  }

  openModal(){
    this.modal.nativeElement.style.display = "flex";
  }

  closeModal(){
    this.modal.nativeElement.style.display = "none";
  }
}