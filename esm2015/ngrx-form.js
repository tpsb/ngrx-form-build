import { ChangeDetectorRef, Directive, Input, NgModule } from '@angular/core';
import { FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { Store, StoreModule } from '@ngrx/store';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/** @enum {string} */
const FormActions = {
    UpdateStatus: '[Form] Update Status',
    UpdateValue: '[Form] Update Value',
    UpdateDirty: '[Form] Update Dirty',
    SetDirty: '[Form] Set Dirty',
    SetPrestine: '[Form] Set Prestine',
    UpdateErrors: '[Form] Update Errors',
    SetDisabled: '[Form] Disable Form',
    SetEnabled: '[Form] Enable Form',
    UpdateForm: '[Form] Update Form',
};
class UpdateFormStatus {
    /**
     * @param {?} payload
     */
    constructor(payload) {
        this.payload = payload;
        this.type = FormActions.UpdateStatus;
    }
}
class UpdateFormValue {
    /**
     * @param {?} payload
     */
    constructor(payload) {
        this.payload = payload;
        this.type = FormActions.UpdateValue;
    }
}
class UpdateForm {
    /**
     * @param {?} payload
     */
    constructor(payload) {
        this.payload = payload;
        this.type = FormActions.UpdateForm;
    }
}
class UpdateFormDirty {
    /**
     * @param {?} payload
     */
    constructor(payload) {
        this.payload = payload;
        this.type = FormActions.UpdateDirty;
    }
}
class SetFormDirty {
    /**
     * @param {?} payload
     */
    constructor(payload) {
        this.payload = payload;
        this.type = FormActions.SetDirty;
    }
}
class SetFormPristine {
    /**
     * @param {?} payload
     */
    constructor(payload) {
        this.payload = payload;
        this.type = FormActions.SetPrestine;
    }
}
class UpdateFormErrors {
    /**
     * @param {?} payload
     */
    constructor(payload) {
        this.payload = payload;
        this.type = FormActions.UpdateErrors;
    }
}
class SetFormDisabled {
    /**
     * @param {?} payload
     */
    constructor(payload) {
        this.payload = payload;
        this.type = FormActions.SetDisabled;
    }
}
class SetFormEnabled {
    /**
     * @param {?} payload
     */
    constructor(payload) {
        this.payload = payload;
        this.type = FormActions.SetEnabled;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @record
 * @template T
 */

const setValue = (obj, prop, val) => {
    obj = Object.assign({}, obj);
    const /** @type {?} */ split = prop.split('.');
    const /** @type {?} */ last = split[split.length - 1];
    split.reduce((acc, part) => {
        if (part === last) {
            acc[part] = val;
        }
        else {
            acc[part] = Object.assign({}, acc[part]);
        }
        return acc && acc[part];
    }, obj);
    return obj;
};
/**
 * @param {?} reducer
 * @return {?}
 */
function form(reducer) {
    return function (state, action) {
        let /** @type {?} */ nextState = reducer(state, action);
        if (action.type === FormActions.UpdateValue || action.type === FormActions.UpdateForm) {
            nextState = setValue(nextState, `${action.payload.path}.model`, Object.assign({}, action.payload.value));
        }
        if (action.type === FormActions.UpdateStatus || action.type === FormActions.UpdateForm) {
            nextState = setValue(nextState, `${action.payload.path}.status`, action.payload.status);
        }
        if (action.type === FormActions.UpdateErrors || action.type === FormActions.UpdateForm) {
            nextState = setValue(nextState, `${action.payload.path}.errors`, Object.assign({}, action.payload.errors));
        }
        if (action.type === FormActions.UpdateDirty || action.type === FormActions.UpdateForm) {
            nextState = setValue(nextState, `${action.payload.path}.dirty`, action.payload.dirty);
        }
        if (action.type === FormActions.SetDirty) {
            nextState = setValue(nextState, `${action.payload}.dirty`, true);
        }
        if (action.type === FormActions.SetPrestine) {
            nextState = setValue(nextState, `${action.payload}.dirty`, false);
        }
        if (action.type === FormActions.SetDisabled) {
            nextState = setValue(nextState, `${action.payload}.disabled`, true);
        }
        if (action.type === FormActions.SetEnabled) {
            nextState = setValue(nextState, `${action.payload}.disabled`, false);
        }
        return nextState;
    };
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const getValue = (obj, prop) => prop.split('.').reduce((acc, part) => acc && acc[part], obj);
class FormDirective {
    /**
     * @param {?} _store
     * @param {?} _formGroupDirective
     * @param {?} _cd
     */
    constructor(_store, _formGroupDirective, _cd) {
        this._store = _store;
        this._formGroupDirective = _formGroupDirective;
        this._cd = _cd;
        this.debounce = 100;
        this._destroy$ = new Subject();
        this._updating = false;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._store
            .select(state => getValue(state, `${this.path}.model`))
            .pipe(takeUntil(this._destroy$))
            .subscribe(model => {
            if (!this._updating) {
                this._updating = false;
                if (model) {
                    this._formGroupDirective.form.patchValue(model);
                    this._cd.markForCheck();
                }
            }
        });
        this._store
            .select(state => getValue(state, `${this.path}.dirty`))
            .pipe(takeUntil(this._destroy$))
            .subscribe(dirty => {
            if (this._formGroupDirective.form.dirty !== dirty) {
                if (dirty === true) {
                    this._formGroupDirective.form.markAsDirty();
                    this._cd.markForCheck();
                }
                else if (dirty === false) {
                    this._formGroupDirective.form.markAsPristine();
                    this._cd.markForCheck();
                }
            }
        });
        this._store
            .select(state => getValue(state, `${this.path}.disabled`))
            .pipe(takeUntil(this._destroy$))
            .subscribe(disabled => {
            if (this._formGroupDirective.form.disabled !== disabled) {
                if (disabled === true) {
                    this._formGroupDirective.form.disable();
                    this._cd.markForCheck();
                }
                else if (disabled === false) {
                    this._formGroupDirective.form.enable();
                    this._cd.markForCheck();
                }
            }
        });
        this._formGroupDirective.valueChanges
            .pipe(debounceTime(this.debounce), takeUntil(this._destroy$))
            .subscribe(value => {
            this._updating = true;
            this._store.dispatch(new UpdateFormValue({
                path: this.path,
                value
            }));
            this._store.dispatch(new UpdateFormDirty({
                path: this.path,
                dirty: this._formGroupDirective.dirty
            }));
            this._store.dispatch(new UpdateFormErrors({
                path: this.path,
                errors: this._formGroupDirective.errors
            }));
        });
        this._formGroupDirective.statusChanges
            .pipe(debounceTime(this.debounce), takeUntil(this._destroy$))
            .subscribe(status => {
            this._store.dispatch(new UpdateFormStatus({
                path: this.path,
                status
            }));
        });
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._destroy$.next();
        this._destroy$.complete();
        if (this.clearDestroy) {
            this._store.dispatch(new UpdateForm({
                path: this.path,
                value: null,
                dirty: null,
                status: null,
                errors: null
            }));
        }
    }
}
FormDirective.decorators = [
    { type: Directive, args: [{ selector: '[ngrxForm]' },] },
];
/** @nocollapse */
FormDirective.ctorParameters = () => [
    { type: Store, },
    { type: FormGroupDirective, },
    { type: ChangeDetectorRef, },
];
FormDirective.propDecorators = {
    "path": [{ type: Input, args: ['ngrxForm',] },],
    "debounce": [{ type: Input, args: ['ngrxFormDebounce',] },],
    "clearDestroy": [{ type: Input, args: ['ngrxFormClearOnDestroy',] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NgrxFormModule {
}
NgrxFormModule.decorators = [
    { type: NgModule, args: [{
                imports: [ReactiveFormsModule, StoreModule],
                declarations: [FormDirective],
                exports: [FormDirective]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Generated bundle index. Do not edit.
 */

export { form, NgrxFormModule, FormDirective, FormActions, UpdateFormStatus, UpdateFormValue, UpdateForm, UpdateFormDirty, SetFormDirty, SetFormPristine, UpdateFormErrors, SetFormDisabled, SetFormEnabled };
//# sourceMappingURL=ngrx-form.js.map
