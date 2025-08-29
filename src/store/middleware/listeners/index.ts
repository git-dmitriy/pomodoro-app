import {registerLoggingListeners} from "@/store/middleware/listeners/loggingListener.ts";
import {registerTimerListener} from "@/store/middleware/listeners/timerListener.ts";
import {Middleware} from "@reduxjs/toolkit";

export function registerAllListeners(middleware: Middleware) {
    registerTimerListener(middleware);
    registerLoggingListeners(middleware);
}