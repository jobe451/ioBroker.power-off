"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils = __importStar(require("@iobroker/adapter-core"));
const child_process_1 = require("child_process");
const POWER_OFF = "powerOff";
const REBOOT = "reboot";
class PowerOff extends utils.Adapter {
    constructor(options = {}) {
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
    async onReady() {
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
    onUnload(callback) {
        callback();
    }
    execCommand(id, command) {
        (0, child_process_1.exec)(command, (error, stdout, stderr) => {
            if (error) {
                this.log.error(`state ${id} exec error: ${error}`);
                return;
            }
            else if (stderr) {
                this.log.error(`state ${id} exec std error: ${stderr}`);
                return;
            }
            else {
                this.log.info(`state ${id} exec result: ${stdout}`);
                return;
            }
        });
    }
    onStateChange(id, state) {
        if (state) {
            this.log.info(`state ${id} changed: ${state.val} (ack = ${state.ack})`);
            if (state.val === true) {
                this.setTimeout(() => {
                    if (id.endsWith(POWER_OFF)) {
                        this.setStateAsync(POWER_OFF, { val: false, ack: true });
                        this.execCommand(id, "sudo poweroff");
                    }
                    else if (id.endsWith(REBOOT)) {
                        this.setStateAsync(REBOOT, { val: false, ack: true });
                        this.execCommand(id, "sudo reboot");
                    }
                }, 1000);
            }
        }
        else {
            this.log.info(`state ${id} deleted`);
        }
    }
}
if (require.main !== module) {
    module.exports = (options) => new PowerOff(options);
}
else {
    (() => new PowerOff())();
}
//# sourceMappingURL=main.js.map