import { INT_TYPE, variable } from '@angular/compiler/src/output/output_ast';
import { Component, Input } from '@angular/core';
import { table } from 'console';
import { $ } from 'protractor';
import { Tab2Page } from '../tab2/tab2.page';
import * as firebase from 'firebase';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {
  //tab2, tab1 연결하기
  S685 = Tab2Page.s685; S705 = Tab2Page.s705; S904 = Tab2Page.s904; S980 = Tab2Page.s980;
  R685 = Tab2Page.r685; R705 = Tab2Page.r705; R904 = Tab2Page.r904; R980 = Tab2Page.r980;
  ndvi = Tab2Page.ndvi_view; 
  wi = Tab2Page.wi_view;
  isChecked = Tab2Page.isChecked;
  public records = [];
  public text;
  public NDVI;
  public WI;
  public date;
  //버튼 isDisabled(비활성화) Disabled(활성화)
  public isDisabled = true;
  public Disabled = false;

  constructor() {
   }
   // 시간더하는 함수 생성
    addHours = function(o, h){
    o.setHours(o.getHours()+h);
    return o;
  }
  //예열
  firstheat() {
    console.log('15초후 측정시작');
    firebase.database().ref('sensor/command').update({
      'command':'heat',
      'time': this.addHours(new Date(), 9)
    })
    setTimeout(() => {
      this.isDisabled = false;
    }, 15000);
  }
  //측정
  measure() {
    //-----------------------------------------농작물 랜덤 측정일때------------------------------------------------
    var isChecked = document.getElementById("isChecked") as HTMLInputElement;
    if(isChecked.checked){
      // this.ndvi = Tab2Page.ndvi_view * ((Math.random()*(0.05))+0.975);
      //tab2, tab1 연결하기
      this.S685 = Tab2Page.s685; this.S705 = Tab2Page.s705; this.S904 = Tab2Page.s904; this.S980 = Tab2Page.s980;
      this.R685 = Tab2Page.r685; this.R705 = Tab2Page.r705; this.R904 = Tab2Page.r904; this.R980 = Tab2Page.r980;
      //측정 값 계산
      let A685 = this.R685 / this.S685;
      let A705 = this.R705 / this.S705;
      //NDVI, WI 값 계산
      let x = 2.9839*((A705 - A685) / (A705 + A685))+2.8774;
      this.NDVI = Math.round(x*1000)/1000.0;
      this.wi = Tab2Page.wi_view * ((Math.random()*(0.05))+0.975);
      this.WI = this.wi > 100 ? 100 : Math.round(this.wi*1000)/1000.0;
      this.date = new Date().toLocaleTimeString();
      this.Disabled = false;
      console.log("checked random value");
      console.log(this.NDVI);
      console.log(this.wi);
    } else {  
      //---------------------------------------농작물 실제 측정일때------------------------------------------------
      console.log("no checked");
      //tab2, tab1 연결하기
      this.S685 = Tab2Page.s685; this.S705 = Tab2Page.s705; this.S904 = Tab2Page.s904; this.S980 = Tab2Page.s980;
      this.R685 = Tab2Page.r685; this.R705 = Tab2Page.r705; this.R904 = Tab2Page.r904; this.R980 = Tab2Page.r980;
      //측정 값 계산
      let A685 = this.R685 / this.S685;
      let A705 = this.R705 / this.S705;
      let A904 = this.R904 / this.S904;
      let A980 = this.R980 / this.S980;
      //NDVI, WI 값 계산
      let x = 2.9839*((A705 - A685) / (A705 + A685))+2.8774;
      this.NDVI = Math.round(x*1000)/1000.0;
      this.WI = Math.round((A904 / A980) * 1000)/1000.0;
      //시간출력, 버튼 활성화
      this.date = new Date().toLocaleTimeString();  
      this.Disabled = false;
      //파이어베이스 업데이트
      firebase.database().ref('sensor/command').update({
        'command': 'measure',
        'time': this.addHours(new Date(), 9)
      })
    }
  }
  //기록
  record() {  
    firebase.database().ref('sensor/command').update({
      'command':'ready',
      'time': this.addHours(new Date(), 9)
    })
    this.records.push({
      "date": this.date,
      "NDVI": this.NDVI,
      "WI": this.WI,
      "text": this.text
    })
    this.isDisabled = true;
    this.Disabled = true;
  }
  //초기화
  reset() {
    this.records = [];
  } 
  //Random 센서 값 보여주기
  // random(){
  //   if(document.getElementById('random').checked){
  //     this.NDVI = Math.random();
  //     this.WI = Math.random();
  //   }else{
  //     console.log("no checked")
  //   }
    // console.log(Math.random());
    // this.NDVI = Math.random();
    // this.WI = Math.random();
    // this.Disabled = false;
    // this.isDisabled = false;
  //}
}

// new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') 