import { BaseTexture } from "../../../resource/BaseTexture";
import { Vector4 } from "../../math/Vector4";
import { Shader3D } from "../../shader/Shader3D";
import { Scene3DShaderDeclaration } from "../scene/Scene3DShaderDeclaration";
import { Material } from "./Material";
import { RenderState } from "./RenderState";
import { ShaderDefine } from "../../shader/ShaderDefine";
import { SubShader } from "../../shader/SubShader";
import { VertexMesh } from "../../graphics/Vertex/VertexMesh";
import { TextureCube } from "../../resource/TextureCube";
import  PBRStandard02VS  from "../../shader/files/PBRStandard02.vs";
import  PBRStandard02PS from "../../shader/files/PBRStandard02.fs";

/**
 * <code>PBRStandardMaterial02</code> 类用于实现PBR(Standard)材质。
 */
export class PBRStandardMaterial02 extends Material {

	
	/**光滑度数据源_金属度贴图的Alpha通道。*/
	static SmoothnessSource_MetallicGlossTexture_Alpha: number = 0;
	/**光滑度数据源_反射率贴图的Alpha通道。*/
	static SmoothnessSource_AlbedoTexture_Alpha: number = 1;

	/**渲染状态_不透明。*/
	static RENDERMODE_OPAQUE: number = 0;
	/**渲染状态_透明测试。*/
	static RENDERMODE_CUTOUT: number = 1;
	/**渲染状态_透明混合_游戏中经常使用的透明。*/
	static RENDERMODE_FADE: number = 2;
	/**渲染状态_透明混合_物理上看似合理的透明。*/
	static RENDERMODE_TRANSPARENT: number = 3;

	static SHADERDEFINE_ALBEDOTEXTURE: ShaderDefine;
	static SHADERDEFINE_NORMALTEXTURE: ShaderDefine;
	static SHADERDEFINE_SMOOTHNESSSOURCE_ALBEDOTEXTURE_ALPHA: ShaderDefine;
	static SHADERDEFINE_METALLICGLOSSTEXTURE: ShaderDefine;
	static SHADERDEFINE_OCCLUSIONTEXTURE: ShaderDefine;
	static SHADERDEFINE_PARALLAXTEXTURE: ShaderDefine;
	static SHADERDEFINE_EMISSION: ShaderDefine;
	static SHADERDEFINE_EMISSIONTEXTURE: ShaderDefine;
	static SHADERDEFINE_REFLECTMAP: ShaderDefine;
	static SHADERDEFINE_TILINGOFFSET: ShaderDefine;
	static SHADERDEFINE_ALPHAPREMULTIPLY: ShaderDefine;

	static ALBEDOTEXTURE: number = Shader3D.propertyNameToID("u_AlbedoTexture");
	static ALBEDOCOLOR: number = Shader3D.propertyNameToID("u_AlbedoColor");
	static TILINGOFFSET: number = Shader3D.propertyNameToID("u_TilingOffset");
	static NORMALTEXTURE: number = Shader3D.propertyNameToID("u_NormalTexture");
	static NORMALSCALE: number = Shader3D.propertyNameToID("u_normalScale");
	static METALLICGLOSSTEXTURE: number = Shader3D.propertyNameToID("u_MetallicGlossTexture");
	static METALLIC: number = Shader3D.propertyNameToID("u_metallic");
	
	static SMOOTHNESS: number = Shader3D.propertyNameToID("u_smoothness");
	static SMOOTHNESSSCALE: number = Shader3D.propertyNameToID("u_smoothnessScale");

	static OCCLUSIONTEXTURE: number = Shader3D.propertyNameToID("u_OcclusionTexture");
	static OCCLUSIONSTRENGTH: number = Shader3D.propertyNameToID("u_occlusionStrength");

	static PARALLAXTEXTURE: number = Shader3D.propertyNameToID("u_ParallaxTexture");
	static PARALLAX:number = Shader3D.propertyNameToID("u_Parallax");


	static EMISSIONTEXTURE: number = Shader3D.propertyNameToID("u_EmissionTexture");
	static EMISSIONCOLOR: number = Shader3D.propertyNameToID("u_EmissionColor");

	//minerGI
	static SHAR:number = Shader3D.propertyNameToID("u_SHAr");
	static SHAG:number = Shader3D.propertyNameToID("u_SHAg");
	static SHAB:number = Shader3D.propertyNameToID("u_SHAb");
	static SHBR:number = Shader3D.propertyNameToID("u_SHBr");
	static SHBG:number = Shader3D.propertyNameToID("u_SHBg");
	static SHBB:number = Shader3D.propertyNameToID("u_SHBb");
	static REFLECTIONMAP:number = Shader3D.propertyNameToID("u_ReflectionMap");
	

	static SMOOTHNESSSOURCE: number = -1;//TODO:
	
	
	static ENABLEEMISSION: number = -1;//TODO:
	static ENABLEREFLECT: number = -1;//TODO:
	

	static CULL: number = Shader3D.propertyNameToID("s_Cull");
	static BLEND: number = Shader3D.propertyNameToID("s_Blend");
	static BLEND_SRC: number = Shader3D.propertyNameToID("s_BlendSrc");
	static BLEND_DST: number = Shader3D.propertyNameToID("s_BlendDst");
	static DEPTH_TEST: number = Shader3D.propertyNameToID("s_DepthTest");
	static DEPTH_WRITE: number = Shader3D.propertyNameToID("s_DepthWrite");

	/** 默认材质，禁止修改*/
	static defaultMaterial: PBRStandardMaterial02;

	/**
	 *
	 */
	static __initDefine__(): void {
		PBRStandardMaterial02.SHADERDEFINE_ALBEDOTEXTURE = Shader3D.getDefineByName("ALBEDOTEXTURE");
		PBRStandardMaterial02.SHADERDEFINE_METALLICGLOSSTEXTURE = Shader3D.getDefineByName("METALLICGLOSSTEXTURE");
		PBRStandardMaterial02.SHADERDEFINE_SMOOTHNESSSOURCE_ALBEDOTEXTURE_ALPHA = Shader3D.getDefineByName("SMOOTHNESSSOURCE_ALBEDOTEXTURE_ALPHA");
		PBRStandardMaterial02.SHADERDEFINE_NORMALTEXTURE = Shader3D.getDefineByName("NORMALTEXTURE");
		PBRStandardMaterial02.SHADERDEFINE_PARALLAXTEXTURE = Shader3D.getDefineByName("PARALLAXTEXTURE");
		PBRStandardMaterial02.SHADERDEFINE_OCCLUSIONTEXTURE = Shader3D.getDefineByName("OCCLUSIONTEXTURE");
		PBRStandardMaterial02.SHADERDEFINE_EMISSION = Shader3D.getDefineByName("EMISSION");
		PBRStandardMaterial02.SHADERDEFINE_EMISSIONTEXTURE = Shader3D.getDefineByName("EMISSIONTEXTURE");
		PBRStandardMaterial02.SHADERDEFINE_REFLECTMAP = Shader3D.getDefineByName("REFLECTMAP");
		PBRStandardMaterial02.SHADERDEFINE_TILINGOFFSET = Shader3D.getDefineByName("TILINGOFFSET");
		PBRStandardMaterial02.SHADERDEFINE_ALPHAPREMULTIPLY = Shader3D.getDefineByName("ALPHAPREMULTIPLY");
	}

	static __init__():void{
		PBRStandardMaterial02.__initDefine__();
		var attributeMap:any = {
			'a_Position': VertexMesh.MESH_POSITION0,
			'a_Normal': VertexMesh.MESH_NORMAL0,
			'a_Tangent0': VertexMesh.MESH_TANGENT0,
			'a_Texcoord0': VertexMesh.MESH_TEXTURECOORDINATE0,
			'a_BoneWeights': VertexMesh.MESH_BLENDWEIGHT0,
			'a_BoneIndices': VertexMesh.MESH_BLENDINDICES0,
			'a_MvpMatrix': VertexMesh.MESH_MVPMATRIX_ROW0,
			'a_WorldMat': VertexMesh.MESH_WORLDMATRIX_ROW0
		};
		var uniformMap:any = {
		'u_Bones': Shader3D.PERIOD_CUSTOM,
		'u_MvpMatrix': Shader3D.PERIOD_SPRITE,
		'u_WorldMat': Shader3D.PERIOD_SPRITE,

		'u_CameraPos': Shader3D.PERIOD_CAMERA,
		'u_View': Shader3D.PERIOD_CAMERA,
		'u_ProjectionParams': Shader3D.PERIOD_CAMERA,
		'u_Viewport': Shader3D.PERIOD_CAMERA,

		'u_AlphaTestValue': Shader3D.PERIOD_MATERIAL,
		'u_AlbedoColor': Shader3D.PERIOD_MATERIAL,
		'u_EmissionColor': Shader3D.PERIOD_MATERIAL,
		'u_AlbedoTexture': Shader3D.PERIOD_MATERIAL,
		'u_NormalTexture': Shader3D.PERIOD_MATERIAL,
		'u_ParallaxTexture': Shader3D.PERIOD_MATERIAL,
		'u_MetallicGlossTexture': Shader3D.PERIOD_MATERIAL,
		'u_OcclusionTexture': Shader3D.PERIOD_MATERIAL,
		'u_EmissionTexture': Shader3D.PERIOD_MATERIAL,
		'u_metallic': Shader3D.PERIOD_MATERIAL,
		'u_smoothness': Shader3D.PERIOD_MATERIAL,
		'u_smoothnessScale': Shader3D.PERIOD_MATERIAL,
		'u_occlusionStrength': Shader3D.PERIOD_MATERIAL,
		'u_normalScale': Shader3D.PERIOD_MATERIAL,
		'u_parallax': Shader3D.PERIOD_MATERIAL,
		'u_TilingOffset': Shader3D.PERIOD_MATERIAL,


		'u_ReflectTexture': Shader3D.PERIOD_SCENE,
		'u_ReflectIntensity': Shader3D.PERIOD_SCENE,
		'u_AmbientColor': Shader3D.PERIOD_SCENE,
		'u_shadowMap1': Shader3D.PERIOD_SCENE,
		'u_shadowMap2': Shader3D.PERIOD_SCENE,
		'u_shadowMap3': Shader3D.PERIOD_SCENE,
		'u_shadowPSSMDistance': Shader3D.PERIOD_SCENE,
		'u_lightShadowVP': Shader3D.PERIOD_SCENE,
		'u_shadowPCFoffset': Shader3D.PERIOD_SCENE,
		'u_FogStart': Shader3D.PERIOD_SCENE,
		'u_FogRange': Shader3D.PERIOD_SCENE,
		'u_FogColor': Shader3D.PERIOD_SCENE,
		'u_DirationLightCount': Shader3D.PERIOD_SCENE,
		'u_LightBuffer': Shader3D.PERIOD_SCENE,
		'u_LightClusterBuffer': Shader3D.PERIOD_SCENE,

		//PBRGI
		//minerGI
		'u_SHAr':Shader3D.PERIOD_MATERIAL,
		'u_SHAg':Shader3D.PERIOD_MATERIAL,
		'u_SHAb':Shader3D.PERIOD_MATERIAL,
		'u_SHBr':Shader3D.PERIOD_MATERIAL,
		'u_SHBg':Shader3D.PERIOD_MATERIAL,
		'u_SHBb':Shader3D.PERIOD_MATERIAL,
		'u_SHC':Shader3D.PERIOD_MATERIAL,
		'u_ReflectionMap':Shader3D.PERIOD_MATERIAL,

		//legacy lighting
		'u_DirectionLight.direction': Shader3D.PERIOD_SCENE,
		'u_DirectionLight.color': Shader3D.PERIOD_SCENE,
		'u_PointLight.position': Shader3D.PERIOD_SCENE,
		'u_PointLight.range': Shader3D.PERIOD_SCENE,
		'u_PointLight.color': Shader3D.PERIOD_SCENE,
		'u_SpotLight.position': Shader3D.PERIOD_SCENE,
		'u_SpotLight.direction': Shader3D.PERIOD_SCENE,
		'u_SpotLight.range': Shader3D.PERIOD_SCENE,
		'u_SpotLight.spot': Shader3D.PERIOD_SCENE,
		'u_SpotLight.color': Shader3D.PERIOD_SCENE
		};
		var stateMap = {
			's_Cull': Shader3D.RENDER_STATE_CULL,
			's_Blend': Shader3D.RENDER_STATE_BLEND,
			's_BlendSrc': Shader3D.RENDER_STATE_BLEND_SRC,
			's_BlendDst': Shader3D.RENDER_STATE_BLEND_DST,
			's_DepthTest': Shader3D.RENDER_STATE_DEPTH_TEST,
			's_DepthWrite': Shader3D.RENDER_STATE_DEPTH_WRITE
		}
		var shader:Shader3D = Shader3D.add("PBRStandard02");
		var subShader:SubShader = new SubShader(attributeMap,uniformMap);
		shader.addSubShader(subShader);
		subShader.addShaderPass(PBRStandard02VS,PBRStandard02PS,stateMap);
	}

	/** @internal */
	private _albedoColor: Vector4;
	/** @internal */
	private _emissionColor: Vector4;

	/**
	 * @internal
	 */
	get _ColorR(): number {
		return this._albedoColor.x;
	}

	set _ColorR(value: number) {
		this._albedoColor.x = value;
		this.albedoColor = this._albedoColor;
	}

	/**
	 * @internal
	 */
	get _ColorG(): number {
		return this._albedoColor.y;
	}

	set _ColorG(value: number) {
		this._albedoColor.y = value;
		this.albedoColor = this._albedoColor;
	}

	/**
	 * @internal
	 */
	get _ColorB(): number {
		return this._albedoColor.z;
	}

	set _ColorB(value: number) {
		this._albedoColor.z = value;
		this.albedoColor = this._albedoColor;
	}

	/**
	 * @internal
	 */
	get _ColorA(): number {
		return this._albedoColor.w;
	}

	set _ColorA(value: number) {
		this._albedoColor.w = value;
		this.albedoColor = this._albedoColor;
	}

	/**
	 * @internal
	 */
	get _Metallic(): number {
		return this._shaderValues.getNumber(PBRStandardMaterial02.METALLIC);
	}

	set _Metallic(value: number) {
		this._shaderValues.setNumber(PBRStandardMaterial02.METALLIC, value);
	}

	/**
	 * @internal
	 */
	get _Glossiness(): number {
		return this._shaderValues.getNumber(PBRStandardMaterial02.SMOOTHNESS);
	}

	set _Glossiness(value: number) {
		this._shaderValues.setNumber(PBRStandardMaterial02.SMOOTHNESS, value);
	}

	/**
	 * @internal
	 */
	get _GlossMapScale(): number {
		return this._shaderValues.getNumber(PBRStandardMaterial02.SMOOTHNESSSCALE);
	}

	set _GlossMapScale(value: number) {
		this._shaderValues.setNumber(PBRStandardMaterial02.SMOOTHNESSSCALE, value);
	}

	/**
	 * @internal
	 */
	get _BumpScale(): number {
		return this._shaderValues.getNumber(PBRStandardMaterial02.NORMALSCALE);
	}

	set _BumpScale(value: number) {
		this._shaderValues.setNumber(PBRStandardMaterial02.NORMALSCALE, value);
	}

	/**
	 * @internal 
	 */
	get _Parallax(): number {
		return this._shaderValues.getNumber(PBRStandardMaterial02.PARALLAX);
	}

	set _Parallax(value: number) {
		this._shaderValues.setNumber(PBRStandardMaterial02.PARALLAX, value);
	}

	/**
	 * @internal 
	 */
	get _OcclusionStrength(): number {
		return this._shaderValues.getNumber(PBRStandardMaterial02.OCCLUSIONSTRENGTH);
	}

	set _OcclusionStrength(value: number) {
		this._shaderValues.setNumber(PBRStandardMaterial02.OCCLUSIONSTRENGTH, value);
	}

	/**
	 * @internal
	 */
	get _EmissionColorR(): number {
		return this._emissionColor.x;
	}

	set _EmissionColorR(value: number) {
		this._emissionColor.x = value;
		this.emissionColor = this._emissionColor;
	}

	/**
	 * @internal
	 */
	get _EmissionColorG(): number {
		return this._emissionColor.y;
	}

	set _EmissionColorG(value: number) {
		this._emissionColor.y = value;
		this.emissionColor = this._emissionColor;
	}

	/**
	 * @internal
	 */
	get _EmissionColorB(): number {
		return this._emissionColor.z;
	}

	set _EmissionColorB(value: number) {
		this._emissionColor.z = value;
		this.emissionColor = this._emissionColor;
	}

	/**
	 * @internal
	 */
	get _EmissionColorA(): number {
		return this._emissionColor.w;
	}

	set _EmissionColorA(value: number) {
		this._emissionColor.w = value;
		this.emissionColor = this._emissionColor;
	}

	/**
	 * @internal
	 */
	get _MainTex_STX(): number {
		return this._shaderValues.getVector(PBRStandardMaterial02.TILINGOFFSET).x;
	}

	set _MainTex_STX(x: number) {
		var tilOff: Vector4 = (<Vector4>this._shaderValues.getVector(PBRStandardMaterial02.TILINGOFFSET));
		tilOff.x = x;
		this.tilingOffset = tilOff;
	}

	/**
	 * @internal
	 */
	get _MainTex_STY(): number {
		return this._shaderValues.getVector(PBRStandardMaterial02.TILINGOFFSET).y;
	}

	set _MainTex_STY(y: number) {
		var tilOff: Vector4 = (<Vector4>this._shaderValues.getVector(PBRStandardMaterial02.TILINGOFFSET));
		tilOff.y = y;
		this.tilingOffset = tilOff;
	}

	/**
	 * @internal
	 */
	get _MainTex_STZ(): number {
		return this._shaderValues.getVector(PBRStandardMaterial02.TILINGOFFSET).z;
	}

	set _MainTex_STZ(z: number) {
		var tilOff: Vector4 = (<Vector4>this._shaderValues.getVector(PBRStandardMaterial02.TILINGOFFSET));
		tilOff.z = z;
		this.tilingOffset = tilOff;
	}

	/**
	 * @internal
	 */
	get _MainTex_STW(): number {
		return this._shaderValues.getVector(PBRStandardMaterial02.TILINGOFFSET).w;
	}

	set _MainTex_STW(w: number) {
		var tilOff: Vector4 = (<Vector4>this._shaderValues.getVector(PBRStandardMaterial02.TILINGOFFSET));
		tilOff.w = w;
		this.tilingOffset = tilOff;
	}

	/**
	 * @internal
	 */
	get _Cutoff(): number {
		return this.alphaTestValue;
	}

	set _Cutoff(value: number) {
		this.alphaTestValue = value;
	}

	/**
	 * 反射率颜色R分量。
	 */
	get albedoColorR(): number {
		return this._ColorR;
	}

	set albedoColorR(value: number) {
		this._ColorR = value;
	}

	/**
	 * 反射率颜色G分量。
	 */
	get albedoColorG(): number {
		return this._ColorG;
	}

	set albedoColorG(value: number) {
		this._ColorG = value;
	}

	/**
	 * 反射率颜色B分量。
	 */
	get albedoColorB(): number {
		return this._ColorB;
	}

	set albedoColorB(value: number) {
		this._ColorB = value;
	}

	/**
	 * 反射率颜色Z分量。
	 */
	get albedoColorA(): number {
		return this._ColorA;
	}

	set albedoColorA(value: number) {
		this._ColorA = value;
	}

	/**
	 * 漫反射颜色。
	 */
	get albedoColor(): Vector4 {
		return this._albedoColor;
	}

	set albedoColor(value: Vector4) {
		this._albedoColor = value;
		this._shaderValues.setVector(PBRStandardMaterial02.ALBEDOCOLOR, value);
	}

	/**
	 * 漫反射贴图。
	 */
	get albedoTexture(): BaseTexture {
		return this._shaderValues.getTexture(PBRStandardMaterial02.ALBEDOTEXTURE);
	}

	set albedoTexture(value: BaseTexture) {
		if (value) {
			this._shaderValues.addDefine(PBRStandardMaterial02.SHADERDEFINE_ALBEDOTEXTURE);
		} else {
			this._shaderValues.removeDefine(PBRStandardMaterial02.SHADERDEFINE_ALBEDOTEXTURE);
		}
		this._shaderValues.setTexture(PBRStandardMaterial02.ALBEDOTEXTURE, value);
	}

	/**
	 * 法线贴图。
	 */
	get normalTexture(): BaseTexture {
		return this._shaderValues.getTexture(PBRStandardMaterial02.NORMALTEXTURE);
	}

	set normalTexture(value: BaseTexture) {
		if (value) {
			this._shaderValues.addDefine(PBRStandardMaterial02.SHADERDEFINE_NORMALTEXTURE);
		} else {
			this._shaderValues.removeDefine(PBRStandardMaterial02.SHADERDEFINE_NORMALTEXTURE);
		}
		this._shaderValues.setTexture(PBRStandardMaterial02.NORMALTEXTURE, value);
	}

	/**
	 * 法线贴图缩放系数。
	 */
	get normalTextureScale(): number {
		return this._BumpScale;
	}

	set normalTextureScale(value: number) {
		this._BumpScale = value;
	}

	/**
	 * 视差贴图。
	 */
	get parallaxTexture(): BaseTexture {
		return this._shaderValues.getTexture(PBRStandardMaterial02.PARALLAXTEXTURE);
	}

	set parallaxTexture(value: BaseTexture) {
		if (value) {
			this._shaderValues.addDefine(PBRStandardMaterial02.SHADERDEFINE_PARALLAXTEXTURE);
		} else {
			this._shaderValues.removeDefine(PBRStandardMaterial02.SHADERDEFINE_PARALLAXTEXTURE);
		}
		this._shaderValues.setTexture(PBRStandardMaterial02.PARALLAXTEXTURE, value);
	}

	/**
	 * 视差贴图缩放系数。
	 */
	get parallaxTextureScale(): number {
		return this._Parallax;
	}

	set parallaxTextureScale(value: number) {
		this._Parallax = Math.max(0.005, Math.min(0.08, value));
	}

	/**
	 * 遮挡贴图。
	 */
	get occlusionTexture(): BaseTexture {
		return this._shaderValues.getTexture(PBRStandardMaterial02.OCCLUSIONTEXTURE);
	}

	set occlusionTexture(value: BaseTexture) {
		if (value) {
			this._shaderValues.addDefine(PBRStandardMaterial02.SHADERDEFINE_OCCLUSIONTEXTURE);
		} else {
			this._shaderValues.removeDefine(PBRStandardMaterial02.SHADERDEFINE_OCCLUSIONTEXTURE);
		}
		this._shaderValues.setTexture(PBRStandardMaterial02.OCCLUSIONTEXTURE, value);
	}

	/**
	 * 遮挡贴图强度,范围为0到1。
	 */
	get occlusionTextureStrength(): number {
		return this._OcclusionStrength;
	}

	set occlusionTextureStrength(value: number) {
		this._OcclusionStrength = Math.max(0.0, Math.min(1.0, value));
	}

	/**
	 * 金属光滑度贴图。
	 */
	get metallicGlossTexture(): BaseTexture {
		return this._shaderValues.getTexture(PBRStandardMaterial02.METALLICGLOSSTEXTURE);
	}

	set metallicGlossTexture(value: BaseTexture) {
		if (value) {
			this._shaderValues.addDefine(PBRStandardMaterial02.SHADERDEFINE_METALLICGLOSSTEXTURE);
		} else {
			this._shaderValues.removeDefine(PBRStandardMaterial02.SHADERDEFINE_METALLICGLOSSTEXTURE);
		}
		this._shaderValues.setTexture(PBRStandardMaterial02.METALLICGLOSSTEXTURE, value);
	}

	/**
	 * 获取金属度,范围为0到1。
	 */
	get metallic(): number {
		return this._Metallic;
	}

	set metallic(value: number) {
		this._Metallic = Math.max(0.0, Math.min(1.0, value));
	}

	/**
	 * 光滑度,范围为0到1。
	 */
	get smoothness(): number {
		return this._Glossiness;
	}

	set smoothness(value: number) {
		this._Glossiness = Math.max(0.0, Math.min(1.0, value));
	}

	/**
	 * 光滑度缩放系数,范围为0到1。
	 */
	get smoothnessTextureScale(): number {
		return this._GlossMapScale;
	}

	set smoothnessTextureScale(value: number) {
		this._GlossMapScale = Math.max(0.0, Math.min(1.0, value));
	}

	/**
	 * 光滑度数据源,0或1。
	 */
	get smoothnessSource(): number {
		return this._shaderValues.getInt(PBRStandardMaterial02.SMOOTHNESSSOURCE);
	}

	set smoothnessSource(value: number) {
		if (value) {
			this._shaderValues.addDefine(PBRStandardMaterial02.SHADERDEFINE_SMOOTHNESSSOURCE_ALBEDOTEXTURE_ALPHA);
			this._shaderValues.setInt(PBRStandardMaterial02.SMOOTHNESSSOURCE, 1);
		} else {
			this._shaderValues.removeDefine(PBRStandardMaterial02.SHADERDEFINE_SMOOTHNESSSOURCE_ALBEDOTEXTURE_ALPHA);
			this._shaderValues.setInt(PBRStandardMaterial02.SMOOTHNESSSOURCE, 0);
		}
	}

	/**
	 * 是否激活放射属性。
	 */
	get enableEmission(): boolean {
		return this._shaderValues.getBool(PBRStandardMaterial02.ENABLEEMISSION);
	}

	set enableEmission(value: boolean) {
		if (value) {
			this._shaderValues.addDefine(PBRStandardMaterial02.SHADERDEFINE_EMISSION);
		} else {
			this._shaderValues.removeDefine(PBRStandardMaterial02.SHADERDEFINE_EMISSION);
		}
		this._shaderValues.setBool(PBRStandardMaterial02.ENABLEEMISSION, value);
	}

	/**
	 * 放射颜色R分量。
	 */
	get emissionColorR(): number {
		return this._EmissionColorR;
	}

	set emissionColorR(value: number) {
		this._EmissionColorR = value;
	}

	/**
	 * 放射颜色G分量。
	 */
	get emissionColorG(): number {
		return this._EmissionColorG;
	}

	set emissionColorG(value: number) {
		this._EmissionColorG = value;
	}

	/**
	 * 放射颜色B分量。
	 */
	get emissionColorB(): number {
		return this._EmissionColorB;
	}

	set emissionColorB(value: number) {
		this._EmissionColorB = value;
	}

	/**
	 * 放射颜色A分量。
	 */
	get emissionColorA(): number {
		return this._EmissionColorA;
	}

	set emissionColorA(value: number) {
		this._EmissionColorA = value;
	}

	/**
	 * 放射颜色。
	 */
	get emissionColor(): Vector4 {
		return (<Vector4>this._shaderValues.getVector(PBRStandardMaterial02.EMISSIONCOLOR));
	}

	set emissionColor(value: Vector4) {
		this._shaderValues.setVector(PBRStandardMaterial02.EMISSIONCOLOR, value);
	}

	/**
	 * 放射贴图。
	 */
	get emissionTexture(): BaseTexture {
		return this._shaderValues.getTexture(PBRStandardMaterial02.EMISSIONTEXTURE);
	}

	set emissionTexture(value: BaseTexture) {
		if (value) {
			this._shaderValues.addDefine(PBRStandardMaterial02.SHADERDEFINE_EMISSIONTEXTURE);
		} else {
			this._shaderValues.removeDefine(PBRStandardMaterial02.SHADERDEFINE_EMISSIONTEXTURE);
		}
		this._shaderValues.setTexture(PBRStandardMaterial02.EMISSIONTEXTURE, value);
	}

	/**
	 * 是否开启反射。
	 */
	get enableReflection(): boolean {
		return this._shaderValues.getBool(PBRStandardMaterial02.ENABLEREFLECT);
	}

	set enableReflection(value: boolean) {
		this._shaderValues.setBool(PBRStandardMaterial02.ENABLEREFLECT, true);
		if (value) {
			this._disablePublicDefineDatas.remove(Scene3DShaderDeclaration.SHADERDEFINE_REFLECTMAP);
		} else {
			this._disablePublicDefineDatas.add(Scene3DShaderDeclaration.SHADERDEFINE_REFLECTMAP);
		}
	}

	/**
	 * 纹理平铺和偏移X分量。
	 */
	get tilingOffsetX(): number {
		return this._MainTex_STX;
	}

	set tilingOffsetX(x: number) {
		this._MainTex_STX = x;
	}

	/**
	 * 纹理平铺和偏移Y分量。
	 */
	get tilingOffsetY(): number {
		return this._MainTex_STY;
	}

	set tilingOffsetY(y: number) {
		this._MainTex_STY = y;
	}

	/**
	 * 纹理平铺和偏移Z分量。
	 */
	get tilingOffsetZ(): number {
		return this._MainTex_STZ;
	}

	set tilingOffsetZ(z: number) {
		this._MainTex_STZ = z;
	}

	/**
	 * 纹理平铺和偏移W分量。
	 */
	get tilingOffsetW(): number {
		return this._MainTex_STW;
	}

	set tilingOffsetW(w: number) {
		this._MainTex_STW = w;
	}

	/**
	 * 纹理平铺和偏移。
	 */
	get tilingOffset(): Vector4 {
		return (<Vector4>this._shaderValues.getVector(PBRStandardMaterial02.TILINGOFFSET));
	}

	set tilingOffset(value: Vector4) {
		if (value) {
			if (value.x != 1 || value.y != 1 || value.z != 0 || value.w != 0) {
				this._shaderValues.addDefine(PBRStandardMaterial02.SHADERDEFINE_TILINGOFFSET);
			} else {
				this._shaderValues.removeDefine(PBRStandardMaterial02.SHADERDEFINE_TILINGOFFSET);
			}
		} else {
			this._shaderValues.removeDefine(PBRStandardMaterial02.SHADERDEFINE_TILINGOFFSET);
		}
		this._shaderValues.setVector(PBRStandardMaterial02.TILINGOFFSET, value);
	}

	/**
	 * 渲染模式。
	 */
	set renderMode(value: number) {
		switch (value) {
			case PBRStandardMaterial02.RENDERMODE_OPAQUE:
				this.alphaTest = false;
				this.renderQueue = Material.RENDERQUEUE_OPAQUE;
				this.depthWrite = true;
				this.cull = RenderState.CULL_BACK;
				this.blend = RenderState.BLEND_DISABLE;
				this.depthTest = RenderState.DEPTHTEST_LESS;
				this._shaderValues.removeDefine(PBRStandardMaterial02.SHADERDEFINE_ALPHAPREMULTIPLY);
				break;
			case PBRStandardMaterial02.RENDERMODE_CUTOUT:
				this.renderQueue = Material.RENDERQUEUE_ALPHATEST;
				this.alphaTest = true;
				this.depthWrite = true;
				this.cull = RenderState.CULL_BACK;
				this.blend = RenderState.BLEND_DISABLE;
				this.depthTest = RenderState.DEPTHTEST_LESS;
				this._shaderValues.removeDefine(PBRStandardMaterial02.SHADERDEFINE_ALPHAPREMULTIPLY);
				break;
			case PBRStandardMaterial02.RENDERMODE_FADE:
				this.renderQueue = Material.RENDERQUEUE_TRANSPARENT;
				this.alphaTest = false;
				this.depthWrite = false;
				this.cull = RenderState.CULL_BACK;
				this.blend = RenderState.BLEND_ENABLE_ALL;
				this.blendSrc = RenderState.BLENDPARAM_SRC_ALPHA;
				this.blendDst = RenderState.BLENDPARAM_ONE_MINUS_SRC_ALPHA;
				this.depthTest = RenderState.DEPTHTEST_LESS;
				this._shaderValues.removeDefine(PBRStandardMaterial02.SHADERDEFINE_ALPHAPREMULTIPLY);
				break;
				break;
			case PBRStandardMaterial02.RENDERMODE_TRANSPARENT:
				this.renderQueue = Material.RENDERQUEUE_TRANSPARENT;
				this.alphaTest = false;
				this.depthWrite = false;
				this.cull = RenderState.CULL_BACK;
				this.blend = RenderState.BLEND_ENABLE_ALL;
				this.blendSrc = RenderState.BLENDPARAM_ONE;
				this.blendDst = RenderState.BLENDPARAM_ONE_MINUS_SRC_ALPHA;
				this.depthTest = RenderState.DEPTHTEST_LESS;
				this._shaderValues.addDefine(PBRStandardMaterial02.SHADERDEFINE_ALPHAPREMULTIPLY);
				break;
			default:
				throw new Error("PBRSpecularMaterial : renderMode value error.");
		}
	}

	/**
	 * 是否写入深度。
	 */
	get depthWrite(): boolean {
		return this._shaderValues.getBool(PBRStandardMaterial02.DEPTH_WRITE);
	}

	set depthWrite(value: boolean) {
		this._shaderValues.setBool(PBRStandardMaterial02.DEPTH_WRITE, value);
	}

	/**
	 * 剔除方式。
	 */
	get cull(): number {
		return this._shaderValues.getInt(PBRStandardMaterial02.CULL);
	}

	set cull(value: number) {
		this._shaderValues.setInt(PBRStandardMaterial02.CULL, value);
	}

	/**
	 * 混合方式。
	 */
	get blend(): number {
		return this._shaderValues.getInt(PBRStandardMaterial02.BLEND);
	}

	set blend(value: number) {
		this._shaderValues.setInt(PBRStandardMaterial02.BLEND, value);
	}

	/**
	 * 混合源。
	 */
	get blendSrc(): number {
		return this._shaderValues.getInt(PBRStandardMaterial02.BLEND_SRC);
	}

	set blendSrc(value: number) {
		this._shaderValues.setInt(PBRStandardMaterial02.BLEND_SRC, value);
	}

	/**
	 * 混合目标。
	 */
	get blendDst(): number {
		return this._shaderValues.getInt(PBRStandardMaterial02.BLEND_DST);
	}

	set blendDst(value: number) {
		this._shaderValues.setInt(PBRStandardMaterial02.BLEND_DST, value);
	}

	/**
	 * 深度测试方式。
	 */
	get depthTest(): number {
		return this._shaderValues.getInt(PBRStandardMaterial02.DEPTH_TEST);
	}


	set depthTest(value: number) {
		this._shaderValues.setInt(PBRStandardMaterial02.DEPTH_TEST, value);
	}

	//minerGI
	SetGIDiffuse(Ar:Vector4,Ag:Vector4,Ab:Vector4,Br:Vector4,Bg:Vector4,Bb:Vector4,C:Vector4)
	{
		this._shaderValues.setVector(PBRStandardMaterial02.SHAR,Ar);
		this._shaderValues.setVector(PBRStandardMaterial02.SHAG,Ag);
		this._shaderValues.setVector(PBRStandardMaterial02.SHAB,Ab);
		this._shaderValues.setVector(PBRStandardMaterial02.SHBR,Br);
		this._shaderValues.setVector(PBRStandardMaterial02.SHBG,Bg);
		this._shaderValues.setVector(PBRStandardMaterial02.SHBB,Bb);
	}

	SetGISpecular(GISpecular:TextureCube)
	{
		this._shaderValues.setTexture(PBRStandardMaterial02.REFLECTIONMAP,GISpecular);
	}



	/**
	 * 创建一个 <code>PBRStandardMaterial02</code> 实例。
	 */
	constructor() {
		super();
		this.setShaderName("PBRStandard02");
		this._albedoColor = new Vector4(1.0, 1.0, 1.0, 1.0);
		this._shaderValues.setVector(PBRStandardMaterial02.ALBEDOCOLOR, new Vector4(1.0, 1.0, 1.0, 1.0));
		this._emissionColor = new Vector4(0.0, 0.0, 0.0, 0.0);
		this._shaderValues.setVector(PBRStandardMaterial02.EMISSIONCOLOR, new Vector4(0.0, 0.0, 0.0, 0.0));
		this._shaderValues.setNumber(PBRStandardMaterial02.METALLIC, 0.0);
		this._shaderValues.setNumber(PBRStandardMaterial02.SMOOTHNESS, 0.5);
		this._shaderValues.setNumber(PBRStandardMaterial02.SMOOTHNESSSCALE, 1.0);
		this._shaderValues.setNumber(PBRStandardMaterial02.SMOOTHNESSSOURCE, 0);
		this._shaderValues.setNumber(PBRStandardMaterial02.OCCLUSIONSTRENGTH, 1.0);
		this._shaderValues.setNumber(PBRStandardMaterial02.NORMALSCALE, 1.0);
		this._shaderValues.setNumber(PBRStandardMaterial02.PARALLAX, 0.001);
		this._shaderValues.setBool(PBRStandardMaterial02.ENABLEEMISSION, false);
		this._shaderValues.setBool(PBRStandardMaterial02.ENABLEREFLECT, true);
		this._shaderValues.setNumber(Material.ALPHATESTVALUE, 0.5);
		this._disablePublicDefineDatas.remove(Scene3DShaderDeclaration.SHADERDEFINE_REFLECTMAP);
		this.renderMode = PBRStandardMaterial02.RENDERMODE_OPAQUE;
	}

	/**
	 * 克隆。
	 * @return	 克隆副本。
	 * @override
	 */
	clone(): any {
		var dest: PBRStandardMaterial02 = new PBRStandardMaterial02();
		this.cloneTo(dest);
		return dest;
	}

	/**
	 * @inheritDoc
	 * @override
	 */
	cloneTo(destObject: any): void {
		super.cloneTo(destObject);
		var destMaterial: PBRStandardMaterial02 = (<PBRStandardMaterial02>destObject);
		this._albedoColor.cloneTo(destMaterial._albedoColor);
		this._emissionColor.cloneTo(destMaterial._emissionColor);
	}
}


