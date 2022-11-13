interface SetupPayload {
    onProduction: () => void;
    onDevelopment: () => void;
}

export function setup({ onProduction, onDevelopment }: SetupPayload) {
    if (process.env.NODE_EV !== 'production') {
        onDevelopment();
        return;
    }

    onProduction();
}
