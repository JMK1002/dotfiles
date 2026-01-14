import WindowRevealer from "../../utils/WindowRevealer"
import {Variable} from "astal"
import {Gtk, App, Astal, Gdk} from "astal/gtk3"

const text = `
1. extremist a person who holds fanatical views, especially one who advocates radical action.
2. fundamentalism a form of religion that upholds belief in strict, literal interpretation of scripture.
3. decentralized to transfer authority from central to local control; often with a degree of autonomy.
4. animosity strong hostility or antipathy.
5. containment the act of keeping something harmful or threatening under control.
6. uprising an act of resistance, or rebellion; a revolt.
7. populist a political leader that strives to appeal to ordinary people who feel that their concerns
are disregarded by the elite.
8. interdependence the reliance of two or more people, things, or groups on each other.
9. conventional based on or in accordance with what is generally done or believed.
10. standardization the process of making something conform to a norm.






`

export default function TextDisplay(gdkmonitor: Gdk.Monitor) {
	return WindowRevealer({
		name:"textDisplay",
		className: "",
		child:<scrollable
			className={"scroll"}
			minContentHeight={100}
			minContentWidth={100}>
			<label label={text}/>
		</scrollable>,
		anchor:Astal.WindowAnchor.BOTTOM | Astal.WindowAnchor.LEFT,
		layer:Astal.Layer.TOP,
		keymode:Astal.Keymode.ON_DEMAND,
		exclusivity:Astal.Exclusivity.NORMAL,
		css:`
		window {
			all: unset;
			background-color: alpha(black, 0);
			font-size: 10px;
		}
		.scroll {
			all: unset;
			background-color: alpha(black, 0);
			font-size: 10px;
		}
		`,
		visible: true,
		setup:()=>{return}
	})
}