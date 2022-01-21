import * as utils from "@iobroker/adapter-core";
import {exec} from  "child_process";

const POWER_OFF = "powerOff";
const REBOOT = "reboot";

class PowerOff extends utils.Adapter {

    public constructor(options: Partial<utils.AdapterOptions> = {}) {
        super({
            ...options,
            name: "power-off",
        });
        this.on("ready", this.onReady.bind(this));
        this.on("stateChange", this.onStateChange.bind(this));
        this.on("unload", this.onUnload.bind(this));
    }

    /**
     * Is called when databases are connected and adapter received configuration.
     */
    private async onReady(): Promise<void> {

        await this.setObjectNotExistsAsync(POWER_OFF, {
            type: "state",
            common: {
                name: POWER_OFF,
                type: "boolean",
                role: "switch",
                read: true,
                write: true,
            },
            native: {},
        });
        this.setStateAsync(POWER_OFF, { val: false, ack: true });
        this.subscribeStates(POWER_OFF);

        await this.setObjectNotExistsAsync(REBOOT, {
            type: "state",
            common: {
                name: REBOOT,
                type: "boolean",
                role: "switch",
                read: true,
                write: true,
            },
            native: {},
        });
        this.setStateAsync(REBOOT, { val: false, ack: true });
        this.subscribeStates(REBOOT);
    }

    private onUnload(callback: () => void): void {
        callback();
    }

    private onStateChange(id: string, state: ioBroker.State | null | undefined): void {
        if (state) {
            this.log.info(`state ${id} changed: ${state.val} (ack = ${state.ack})`);
            if (state.val === true) {
                if (id === POWER_OFF) {
                    this.setStateAsync(POWER_OFF, { val: false, ack: true });
                    exec("systemctl poweroff -i");
                }
                else if (id === REBOOT) {
                    this.setStateAsync(REBOOT, { val: false, ack: true });
                    exec("systemctl reboot -i");
                }
            }
        } else {
            this.log.info(`state ${id} deleted`);
        }
    }
}

if (require.main !== module) {
    module.exports = (options: Partial<utils.AdapterOptions> | undefined) => new PowerOff(options);
} else {
    (() => new PowerOff())();
}