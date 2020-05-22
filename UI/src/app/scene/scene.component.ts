import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { SceneMgr, SceneInfo } from '../SceneMgr';


@Component({
  templateUrl: './scene.component.html',
})
export class SceneComponent implements OnInit {
  constructor(
    private _location: Location,
    private scenemgr: SceneMgr,
  ) { }

  ngOnInit(): void {
    this.scene = this.scenemgr.getSceneInfoByName_Debug(this.scenemgr.sceneName);
    this.lines = this.scene.Lines;
    this.line = this.lines[this.scenemgr.lineIdx].split("@")[1]
    this.faceurl = this.lines[this.scenemgr.lineIdx].split("@")[0]
    this.clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    this.clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  }

  clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  scene: SceneInfo;
  lines: string[];
  line: string;
  faceurl: string;
  WaitForBranchPicker = false;
  BranchInfo: [string, string][];
  Next() {
    if (this.WaitForBranchPicker) return;
    var RawInfo: string;
    this.scenemgr.lineIdx++;
    if (this.scenemgr.lineIdx === this.lines.length) {
      if (this.scene.NextScene !== undefined) {
        //转场
        var NextScene = this.scene.NextScene;
        console.log("Scene Chnage To:" + NextScene);
        this.scenemgr.sceneName = NextScene;
        this.scenemgr.lineIdx = 0;
        this.scene = this.scenemgr.getSceneInfoByName_Debug(NextScene);
        this.lines = this.scene.Lines;
      }
      else {
        if (this.scene.Branch !== undefined) {
          //分支
          this.BranchInfo = this.scene.Branch;
          this.WaitForBranchPicker = true;
        } else {
          //结束了
          this.scenemgr.lineIdx--;
        }
        return;
      }
    } 
    //台词
    RawInfo = this.lines[this.scenemgr.lineIdx];
    this.line = RawInfo.split("@")[1];
    this.faceurl = RawInfo.split("@")[0]
  }

  Branch(sceneName: string) {
    //转场
    console.log("Scene Chnage To:" + sceneName);
    this.scene = this.scenemgr.getSceneInfoByName_Debug(sceneName);
    this.scenemgr.sceneName = sceneName;
    this.scenemgr.lineIdx = -1;  //Clcik事件没有抑制住，Next事件也将触发
    this.lines = this.scene.Lines;
    this.WaitForBranchPicker = false;
  }
  /**退出 */
  Exit() {
    if (this.WaitForBranchPicker) return;
    this._location.back();
  }
}