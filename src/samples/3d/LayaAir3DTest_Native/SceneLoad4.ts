import { Laya } from "Laya";
import { Animator } from "laya/d3/component/Animator";
import { BaseCamera } from "laya/d3/core/BaseCamera";
import { Camera } from "laya/d3/core/Camera";
import { DirectionLight } from "laya/d3/core/light/DirectionLight";
import { BaseMaterial } from "laya/d3/core/material/BaseMaterial";
import { BlinnPhongMaterial } from "laya/d3/core/material/BlinnPhongMaterial";
import { MeshSprite3D } from "laya/d3/core/MeshSprite3D";
import { Scene3D } from "laya/d3/core/scene/Scene3D";
import { SkinnedMeshSprite3D } from "laya/d3/core/SkinnedMeshSprite3D";
import { Sprite3D } from "laya/d3/core/Sprite3D";
import { Matrix4x4 } from "laya/d3/math/Matrix4x4";
import { Vector3 } from "laya/d3/math/Vector3";
import { SkyBox } from "laya/d3/resource/models/SkyBox";
import { SkyRenderer } from "laya/d3/resource/models/SkyRenderer";
import { Shader3D } from "laya/d3/shader/Shader3D";
import { Stage } from "laya/display/Stage";
import { Handler } from "laya/utils/Handler"; 
import { Stat } from "laya/utils/Stat";
import { Laya3D } from "Laya3D";
import { CameraMoveScript } from "../common/CameraMoveScript";
import { PrimitiveMesh } from "laya/d3/resource/models/PrimitiveMesh";
import { PBRStandardMaterial } from "laya/d3/core/material/PBRStandardMaterial";
import { Texture2D } from "laya/resource/Texture2D";


export class SceneLoad4 {
	monkeyRow: number = 10;
	monkeyCount: number = 0;
	modelRow:number = 30;
	_scene: Scene3D;
	particles: Array<Sprite3D>;
	skinmodels: Array<Sprite3D>;
	baseUrl:String = "http://10.10.20.200:8889/";
	constructor() {
		Laya3D.init(0, 0);
		Laya.stage.scaleMode = Stage.SCALE_FULL;
		Laya.stage.screenMode = Stage.SCREEN_NONE;
		Stat.show();
		var _this: SceneLoad4 = this;

		Scene3D.load(this.baseUrl+"res/threeDimen/scene/TerrainScene/XunLongShi.ls", Handler.create(this, function (scene: Scene3D): void {
			Laya.stage.addChild(scene);
			//开启雾化效果
			scene.enableFog = false;
			//设置雾化的颜色
			scene.fogColor = new Vector3(0, 0, 0.6);
			//设置雾化的起始位置，相对于相机的距离
			scene.fogStart = 10;
			//设置雾化最浓处的距离。
			scene.fogRange = 40;
			//设置场景环境光
			//scene.ambientColor = new Vector3(0.05, 0.15, 0.07);

			//添加相机
			var camera: Camera = new Camera();
			scene.addChild(camera);
			//调整相机的位置
			camera.transform.translate(new Vector3(0, 18, -42));
			camera.transform.rotate(new Vector3(-20, 180, 0), false, false);
			//设置相机横纵比
			camera.aspectRatio = 0;
			//设置相机近距裁剪
			camera.nearPlane = 0.1;
			//设置相机远距裁剪
			camera.farPlane = 1000;
			//相机设置清楚标记
			camera.clearFlag = BaseCamera.CLEARFLAG_SKY;
			//设置摄像机视野范围（角度）
			camera.fieldOfView = 60;
			//设置背景颜色
			//camera.clearColor = new Vector4(0,0,0.6,1);    
			//加入摄像机移动控制脚本
			camera.addComponent(CameraMoveScript);

			//加载相机天空盒材质
			BaseMaterial.load(this.baseUrl+"res/threeDimen/skyBox/skyBox2/SkyBox2.lmat", Handler.create(this, function (mat: BaseMaterial): void {
				var skyRenderer: SkyRenderer = camera.skyRenderer;
				skyRenderer.mesh = SkyBox.instance;
				skyRenderer.material = mat;
			}));

			//创建方向光
			var light: DirectionLight = (<DirectionLight>scene.addChild(new DirectionLight()));
			//移动灯光位置
			light.transform.translate(new Vector3(0, 2, 5));
			//调整灯光方向
			var mat: Matrix4x4 = light.transform.worldMatrix;
			mat.setForward(new Vector3(0, -5, 1));
			light.transform.worldMatrix = mat;
			//设置灯光漫反射颜色
			light.diffuseColor = new Vector3(0.5, 0.5, 0.5);

			//激活场景中的两个子节点
			((<MeshSprite3D>scene.getChildByName('Scenes').getChildByName('HeightMap'))).active = false;
			((<MeshSprite3D>scene.getChildByName('Scenes').getChildByName('Area'))).active = false;

			_this._scene = scene;
			_this.loadStaticModel();
			_this.loadParticle();
		}));
	}

	loadParticle() {
		var _this: SceneLoad4 = this;
		this.particles = new Array<Sprite3D>();
		Sprite3D.load(this.baseUrl+"res/threeDimen/particle/lv_guangci.lh", Handler.create(null, function (lm: Sprite3D): void {
			_this.particles.push(lm);
			if (_this.particles.length >= 5) {
				_this.createParticle();
			}
		}));
		Sprite3D.load(this.baseUrl+"res/threeDimen/particle/lv_kuosan.lh", Handler.create(null, function (lm: Sprite3D): void {
			_this.particles.push(lm);
			if (_this.particles.length >= 5) {
				_this.createParticle();
			}
		}));
		Sprite3D.load(this.baseUrl+"res/threeDimen/particle/lv_qiu2.lh", Handler.create(null, function (lm: Sprite3D): void {
			_this.particles.push(lm);
			if (_this.particles.length >= 5) {
				_this.createParticle();
			}
		}));
		Sprite3D.load(this.baseUrl+"res/threeDimen/particle/lv_sd.lh", Handler.create(null, function (lm: Sprite3D): void {
			_this.particles.push(lm);
			if (_this.particles.length >= 5) {
				_this.createParticle();
			}
		}));
		Sprite3D.load(this.baseUrl+"res/threeDimen/particle/lv_kuosan1.lh", Handler.create(null, function (lm: Sprite3D): void {
			_this.particles.push(lm);
			if (_this.particles.length >= 5) {
				_this.createParticle();
			}
		}));
	}

	createParticle() {
		var nNum: number = this.monkeyRow * this.monkeyRow;
		for (let i: number = 0; i < nNum; i++) {
			var x: number = parseInt((i / this.monkeyRow).toString());
			var y: number = parseInt((i % this.monkeyRow).toString());
			var sp: Sprite3D = Sprite3D.instantiate(this.particles[i % 5], this._scene, false, new Vector3((-this.monkeyRow / 2 + x) * 4, 9, -2 + -y * 2));
			this._scene.addChild(sp);
		}
	}

	loadStaticModel()
	{
		//预加载所有资源
		let resource = [
			this.baseUrl + "res/threeDimen/layabox.png",  
			this.baseUrl + "res/threeDimen/monkey.png",
			this.baseUrl + "res/threeDimen/secne.jpg",
			this.baseUrl + "res/threeDimen/texture/earth.png",
			];
		Laya.loader.create(resource,Handler.create(this,this.loadStaticModelOnload));
	}
	loadStaticModelOnload() {
		var _this: SceneLoad4 = this;
		this.skinmodels = new Array<Sprite3D>();

		var sphere: MeshSprite3D = new MeshSprite3D(PrimitiveMesh.createSphere(0.25, 20, 20));
		_this.skinmodels.push(sphere);
		var texture1:Texture2D = Laya.loader.getRes(this.baseUrl + "res/threeDimen/layabox.png");
		var pbrStandardMaterial1 = new PBRStandardMaterial();
		pbrStandardMaterial1.albedoTexture = texture1;
		sphere.meshRenderer.material = pbrStandardMaterial1;
		
		

		var cylinder: MeshSprite3D = new MeshSprite3D(PrimitiveMesh.createCylinder(0.25, 1, 20));
		_this.skinmodels.push(cylinder);
		var texture2:Texture2D = Laya.loader.getRes(this.baseUrl + "res/threeDimen/monkey.png");
		var pbrStandardMaterial2 = new PBRStandardMaterial();
		pbrStandardMaterial2.albedoTexture = texture2;
		cylinder.meshRenderer.material = pbrStandardMaterial2;


		var capsule: MeshSprite3D = new MeshSprite3D(PrimitiveMesh.createCapsule(0.25, 1, 10, 20));
		_this.skinmodels.push(capsule);
		var texture3:Texture2D = Laya.loader.getRes(this.baseUrl + "res/threeDimen/secne.jpg");
		var pbrStandardMaterial3 = new PBRStandardMaterial();
		pbrStandardMaterial3.albedoTexture = texture3;
		capsule.meshRenderer.material = pbrStandardMaterial3;


		var cone: MeshSprite3D = new MeshSprite3D(PrimitiveMesh.createCone(0.25, 0.75));
		_this.skinmodels.push(cone);
		var texture4:Texture2D = Laya.loader.getRes(this.baseUrl + "res/threeDimen/texture/earth.png");
		var pbrStandardMaterial4 = new PBRStandardMaterial();
		pbrStandardMaterial4.albedoTexture = texture4;
		cone.meshRenderer.material = pbrStandardMaterial4;

		_this.createSkinmodel();
		
	}

	createSkinmodel() {
		var nNum: number = this.modelRow * this.modelRow;
		for (let i: number = 0; i < nNum; i++) {
			var x: number = parseInt((i / this.modelRow).toString());
			var y: number = parseInt((i % this.modelRow).toString());
			var sp: Sprite3D = Sprite3D.instantiate(this.skinmodels[i%4], this._scene, false, new Vector3((-this.modelRow / 2 + x), 9, -2 + -y));
			this._scene.addChild(sp);
		}
	}
}
