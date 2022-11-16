function init(apiKey) {
    async function handleLoadWidget() {
        const page = `${window.location.origin}${window.location.pathname}`;
        const fp = await window.FingerprintJS.load();
        const fingerprint = await fp.get();

        const WIDGET_URL = `https://merieli-showmetheproblem-widget.netlify.app/?api_key=${apiKey}&page=${page}&fingerprint=${fingerprint.visitorId}`;
        console.log(WIDGET_URL);
        const config = { method: 'HEAD' };
        const response = await fetch(
            `https://backend-show-me-the-problem-etg6ezsb2-merieli.vercel.app/apiKey/exists?apiKey=${apiKey}`,
            config
        );
        if (response.status === 200) {
            const iframe = document.createElement('iframe');
            iframe.src = WIDGET_URL;
            iframe.id = 'showmetheproblem-iframe';
            iframe.style.position = 'fixed';
            iframe.style.bottom = '0px';
            iframe.style.right = '0px';
            iframe.style.overflow = 'hidden';
            iframe.style.border = '0px';
            iframe.style.zIndex = '99999';
            document.body.appendChild(iframe);

            window.addEventListener('message', (event) => {
                if (!event.data.isWidget) return;

                if (event.data.isOpen) {
                    iframe.width = '100%';
                    iframe.height = '100%';
                } else {
                    iframe.width = '300px';
                    iframe.height = '150px';
                }
            });

            return;
        }
        console.error('* [ShowMeTheProblem] was not loaded because apiKey does not exists');
    }

    const script = document.createElement('script');
    script.src = '//cdn.jsdelivr.net/npm/@fingerprintjs/fingerprintjs@3/dist/fp.min.js';
    script.async = 'async';
    script.addEventListener('load', handleLoadWidget);

    document.body.appendChild(script);
}

window.init = init;
