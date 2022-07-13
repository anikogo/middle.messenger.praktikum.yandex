export type Listener<T extends unknown[] = any[]> = (...args: T) => void;

export default class EventBus<E extends string = string, M extends { [K in E]: unknown[] } = Record<E, any[]>> {
    private listeners: { [key in E]?: Record<any, any> } = {};

    on(event: E, id: string, callback: Listener<M[E]>) {
        if (!this.listeners[event]) {
            this.listeners[event] = {};
        };

        this.listeners[event]![id] = callback;
    };

    off(event: E, id: string) {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }
        // debugger;
        delete this.listeners[event]![id];

        // console.log(event, id, this.listeners[event], this.listeners[event]![id]);


        // this.listeners[event] = this.listeners[event]!.filter(
        //     (listener) => listener !== callback,
        // );
    }

    emit(event: E, ...args: M[E]) {
        if (!this.listeners[event]) {
            return;
            // throw new Error(`Нет события: ${event}`);
        };

        Object.values(this.listeners[event]!).forEach(listener => {
            if (listener) {
                listener(...args);
            }
        });
    };

    destroy() {
        this.listeners = {};
    };
};
