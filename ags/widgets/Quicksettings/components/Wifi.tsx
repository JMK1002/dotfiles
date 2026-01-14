import AstalNetwork from "gi://AstalNetwork"
import {bind, interval, timeout, Variable} from "astal"
import {Gtk, App} from "astal/gtk3"
import {execAsync} from "astal/process"

const network = AstalNetwork.get_default()
const accessPoints = Variable(network.wifi.accessPoints)

function scan() {
    network.wifi.scan()
}

function updateWifiList() {
    scan()
    accessPoints.set(
        network.wifi.accessPoints
            .filter(a => a.ssid != null) // ! removing duplicates
            .sort((a, b) => +(a.ssid < b.ssid))
            .filter(function(item, pos, ary) {
                return !pos || item.ssid != ary[pos - 1].ssid;
            })
            .sort((a, b) => b.strength - a.strength) // ! sorting
    )
}

function getWifiElement(accessPoint : AstalNetwork.AccessPoint) {
    const currentlyRevealed = Variable(false)

    return <box
        vertical>
        <button
            onClicked={
                () => currentlyRevealed.set(!currentlyRevealed.get())
            }>
            {accessPoint.ssid}
        </button>
        <revealer
            transitionType={Gtk.RevealerTransitionType.SLIDE_DOWN}
            revealChild={currentlyRevealed()}>
                <button
                    onClicked={() => {
                        print(`connecting to ${accessPoint.bssid}`)
                        execAsync(`nmcli device wifi connect ${accessPoint.bssid}`)
                    }}>
                        Connect
                    </button>
        </revealer>
    </box>
}

const networkRevealed = Variable(false)

const networkElement = <revealer
    revealChild={networkRevealed()}
    transitionType={Gtk.RevealerTransitionType.SLIDE_DOWN}>
    <box vertical>
            {accessPoints(lst => lst.map(a => getWifiElement(a)))}
    </box>
</revealer>

const header = <box>
    <button
        onClicked={() => {
            networkRevealed.set(!networkRevealed.get())
        }}>
            show
    </button>
    {bind(network.wifi, "ssid")}
    <button
        onClicked={() => {
            print("updating wifi list")
            updateWifiList()
        }}>
            Scan
    </button>
</box>

updateWifiList()
export default <box
    vertical>
        {header}
        {networkElement}
</box>