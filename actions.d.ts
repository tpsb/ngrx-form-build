import { Action } from '@ngrx/store';
export declare enum FormActions {
    UpdateStatus = "[Form] Update Status",
    UpdateValue = "[Form] Update Value",
    UpdateDirty = "[Form] Update Dirty",
    SetDirty = "[Form] Set Dirty",
    SetPrestine = "[Form] Set Prestine",
    UpdateErrors = "[Form] Update Errors",
    SetDisabled = "[Form] Disable Form",
    SetEnabled = "[Form] Enable Form",
    UpdateForm = "[Form] Update Form",
}
export declare class UpdateFormStatus implements Action {
    payload: {
        status: string | null;
        path: string;
    };
    readonly type: FormActions;
    constructor(payload: {
        status: string | null;
        path: string;
    });
}
export declare class UpdateFormValue implements Action {
    payload: {
        value: any;
        path: string;
    };
    readonly type: FormActions;
    constructor(payload: {
        value: any;
        path: string;
    });
}
export declare class UpdateForm implements Action {
    payload: {
        value: any;
        errors: {
            [k: string]: string;
        } | null;
        dirty: boolean | null;
        status: string | null;
        path: string;
    };
    readonly type: FormActions;
    constructor(payload: {
        value: any;
        errors: {
            [k: string]: string;
        } | null;
        dirty: boolean | null;
        status: string | null;
        path: string;
    });
}
export declare class UpdateFormDirty implements Action {
    payload: {
        dirty: boolean | null;
        path: string;
    };
    readonly type: FormActions;
    constructor(payload: {
        dirty: boolean | null;
        path: string;
    });
}
export declare class SetFormDirty implements Action {
    payload: string;
    readonly type: FormActions;
    constructor(payload: string);
}
export declare class SetFormPristine implements Action {
    payload: string;
    readonly type: FormActions;
    constructor(payload: string);
}
export declare class UpdateFormErrors implements Action {
    payload: {
        errors: {
            [k: string]: string;
        } | null;
        path: string;
    };
    readonly type: FormActions;
    constructor(payload: {
        errors: {
            [k: string]: string;
        } | null;
        path: string;
    });
}
export declare class SetFormDisabled implements Action {
    payload: string;
    readonly type: FormActions;
    constructor(payload: string);
}
export declare class SetFormEnabled implements Action {
    payload: string;
    readonly type: FormActions;
    constructor(payload: string);
}
