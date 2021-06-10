import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Tab1Page } from '../tab1/tab1.page';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page implements OnInit{
  //tab1이랑 연결하기
  public static s685=36693.9;
  public static s705=69595.1;
  public static s904=452.476;
  public static s980=66547;
  public static r685;
  public static r705;
  public static r904;
  public static r980;
  public static isChecked;
  public static ndvi_view;
  public static wi_view;
  //tab2에서 연결하기
  s685_view=36693.9; s705_view=69595.1; s904_view=452.476; s980_view=66547; NDVI_view; WI_view;
  R685; R705; R904; R980;

  constructor() {}
  //firebase 값 가져오기
  ngOnInit(){
    firebase.database().ref('sensor').on('value', (val) => {
      console.log(val.val());

      this.R685 = val.val()['R685'];
      this.R705 = val.val()['R705'];
      this.R904 = val.val()['R904'];
      this.R980 = val.val()['R980'];

      Tab2Page.r685 = this.R685;
      Tab2Page.r705 = this.R705;  
      Tab2Page.r904 = this.R904;
      Tab2Page.r980 = this.R980;
    });
  }
  //사용자정의 값
  printValue(){
    Tab2Page.s685 = this.s685_view;
    Tab2Page.s705 = this.s705_view;
    Tab2Page.s904 = this.s904_view;
    Tab2Page.s980 = this.s980_view;
    console.log(Tab2Page.s685 = this.s685_view);
    console.log(Tab2Page.s705 = this.s705_view);
    console.log(Tab2Page.s904 = this.s904_view);
    console.log(Tab2Page.s980 = this.s980_view);
  }
  //랜덤 값
  printSensor(){
    // Tab2Page.ndvi_view = this.NDVI_view;
    Tab2Page.wi_view = this.WI_view;
    // console.log(Tab2Page.ndvi_view = this.NDVI_view);
    console.log(Tab2Page.wi_view = this.WI_view);
  }
}
