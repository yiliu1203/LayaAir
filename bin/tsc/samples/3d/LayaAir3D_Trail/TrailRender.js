import { Laya } from "Laya";
import { BaseCamera } from "laya/d3/core/BaseCamera";
import { Camera } from "laya/d3/core/Camera";
import { DirectionLight } from "laya/d3/core/light/DirectionLight";
import { Scene3D } from "laya/d3/core/scene/Scene3D";
import { Sprite3D } from "laya/d3/core/Sprite3D";
import { Vector3 } from "laya/d3/math/Vector3";
import { Stage } from "laya/display/Stage";
import { Handler } from "laya/utils/Handler";
import { Stat } from "laya/utils/Stat";
import { Laya3D } from "Laya3D";
export class TrailRender {
    constructor() {
        //初始化引擎
        Laya3D.init(0, 0);
        Laya.stage.scaleMode = Stage.SCALE_FULL;
        Laya.stage.screenMode = Stage.SCREEN_NONE;
        //显示性能面板
        Stat.show();
        //加载场景
        var scene = Laya.stage.addChild(new Scene3D());
        //加载相机
        var camera = (scene.addChild(new Camera(0, 0.1, 1000)));
        camera.transform.translate(new Vector3(0, 8, 10));
        camera.transform.rotate(new Vector3(-45, 0, 0), true, false);
        //设置相机清除标识为固定颜色
        camera.clearFlag = BaseCamera.CLEARFLAG_SOLIDCOLOR;
        //创建平行光
        var directionLight = scene.addChild(new DirectionLight());
        //设置平行光颜色
        directionLight.color = new Vector3(1, 1, 1);
        directionLight.transform.rotate(new Vector3(-Math.PI / 3, 0, 0));
        Sprite3D.load("res/threeDimen/staticModel/grid/plane.lh", Handler.create(this, function (plane) {
            scene.addChild(plane);
        }));
        Sprite3D.load("res/threeDimen/trail/Cube.lh", Handler.create(this, function (sprite) {
            scene.addChild(sprite);
        }));
    }
}
