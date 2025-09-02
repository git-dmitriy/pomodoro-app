import {registerLoggingListeners} from "@/store/middleware/listeners/loggingListener.ts";
import {registerTimerListener} from "@/store/middleware/listeners/timerListener.ts";
import {tasksListener} from "@/store/middleware/listeners/tasksListener.ts";
import {appListener} from "@/store";
import {settingsListener} from "@/store/middleware/listeners/settingsListener.ts";



export function registerAllListeners(middleware: typeof appListener) {
    registerTimerListener(middleware);
    registerLoggingListeners(middleware);
    tasksListener(middleware);
    settingsListener(middleware);
}