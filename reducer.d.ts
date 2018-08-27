export interface FormState<T> {
    model: T;
    modelId?: string;
    errors?: {
        [k: string]: string;
    };
    dirty?: boolean;
    status?: string;
}
export declare function form(reducer: Function): (state: any, action: any) => any;
