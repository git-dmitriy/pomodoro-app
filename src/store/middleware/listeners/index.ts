import {registerLoggingListeners} from "@/store/middleware/listeners/loggingListener";
import {registerTimerListener} from "@/store/middleware/listeners/timerListener";
import {tasksListener} from "@/store/middleware/listeners/tasksListener";
import {appListener} from "@/store";
import {settingsListener} from "@/store/middleware/listeners/settingsListener";



export function registerAllListeners(middleware: typeof appListener) {
    registerTimerListener(middleware);
    registerLoggingListeners(middleware);
    tasksListener(middleware);
    settingsListener(middleware);
}