interface RouteFunction {
    (name: string): string;
    current(): string | null;
}

declare global {
    function route(name?: string): string | RouteFunction;
}

export {};
