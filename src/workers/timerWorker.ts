
type WorkerIncomingMessage = {
    message: 'start' | 'stop';
};

type WorkerOutgoingMessage = {
    message: 'tick' | 'error';
    error?: ErrorEvent;
};

declare const self: DedicatedWorkerGlobalScope;

let interval: number | null;

self.onmessage = function (e: MessageEvent<WorkerIncomingMessage>) {
    const {message} = e.data;

    console.log('Worker received:', e.data);

    if (message === 'start') {
        if (interval) return;

        interval = self.setInterval(() => {
            self.postMessage({message: 'tick'} satisfies WorkerOutgoingMessage);
        }, 1000);

    }
    if (message === 'stop') {
        if (interval) {
            self.clearInterval(interval);
            interval = null;
        }
    }
};

self.onerror = function (error: ErrorEvent) {
    console.error('Worker error:', error);
    self.postMessage({message: 'error', error} satisfies WorkerOutgoingMessage);
};
