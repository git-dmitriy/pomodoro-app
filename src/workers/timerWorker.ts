let interval: number | null;

self.onmessage = function (e) {
    const {message} = e.data;

    console.log('Worker received:', e.data);

    if (message === 'start') {
        if (interval) return;

        interval = setInterval(() => {
            postMessage({message: 'tick'});
        }, 1000);

    }
    if (message === 'stop') {
        if (interval) {
            clearInterval(interval);
            interval = null;
        }
    }
};

self.onerror = function (error) {
    console.error('Worker error:', error);
    postMessage({message: 'error', error});
};
