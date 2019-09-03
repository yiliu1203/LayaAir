package laya.ui {
	import laya.ui.Button;

	/*
	 * 当按钮的选中状态（ <code>selected</code> 属性）发生改变时调度。
	 * @eventType laya.events.Event
	 */

	/*
	 * <code>CheckBox</code> 组件显示一个小方框，该方框内可以有选中标记。
	 * <code>CheckBox</code> 组件还可以显示可选的文本标签，默认该标签位于 CheckBox 右侧。
	 * <p><code>CheckBox</code> 使用 <code>dataSource</code>赋值时的的默认属性是：<code>selected</code>。</p>
	 * @example <caption>以下示例代码，创建了一个 <code>CheckBox</code> 实例。</caption>
	 * @example Laya.init(640, 800);//设置游戏画布宽高
	 * @example import CheckBox= laya.ui.CheckBox;
	 */
	public class CheckBox extends Button {

		/*
		 * 创建一个新的 <code>CheckBox</code> 组件实例。
		 * @param skin 皮肤资源地址。
		 * @param label 文本标签的内容。
		 */

		public function CheckBox(skin:String = undefined,label:String = undefined){}

		/*
		 * @inheritDoc 
		 * @override 
		 */
		override protected function preinitialize():void{}

		/*
		 * @inheritDoc 
		 * @override 
		 */
		override protected function initialize():void{}
	}

}