(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/forms'), require('@ngrx/store'), require('rxjs'), require('rxjs/operators')) :
	typeof define === 'function' && define.amd ? define('ngrx-form', ['exports', '@angular/core', '@angular/forms', '@ngrx/store', 'rxjs', 'rxjs/operators'], factory) :
	(factory((global['ngrx-form'] = {}),global.ng.core,global.ng.forms,global.store,global.rxjs,global.Rx.Observable.prototype));
}(this, (function (exports,core,forms,store,rxjs,operators) { 'use strict';

var FormActions = {
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
var UpdateFormStatus = /** @class */ (function () {
    function UpdateFormStatus(payload) {
        this.payload = payload;
        this.type = FormActions.UpdateStatus;
    }
    return UpdateFormStatus;
}());
var UpdateFormValue = /** @class */ (function () {
    function UpdateFormValue(payload) {
        this.payload = payload;
        this.type = FormActions.UpdateValue;
    }
    return UpdateFormValue;
}());
var UpdateForm = /** @class */ (function () {
    function UpdateForm(payload) {
        this.payload = payload;
        this.type = FormActions.UpdateForm;
    }
    return UpdateForm;
}());
var UpdateFormDirty = /** @class */ (function () {
    function UpdateFormDirty(payload) {
        this.payload = payload;
        this.type = FormActions.UpdateDirty;
    }
    return UpdateFormDirty;
}());
var SetFormDirty = /** @class */ (function () {
    function SetFormDirty(payload) {
        this.payload = payload;
        this.type = FormActions.SetDirty;
    }
    return SetFormDirty;
}());
var SetFormPristine = /** @class */ (function () {
    function SetFormPristine(payload) {
        this.payload = payload;
        this.type = FormActions.SetPrestine;
    }
    return SetFormPristine;
}());
var UpdateFormErrors = /** @class */ (function () {
    function UpdateFormErrors(payload) {
        this.payload = payload;
        this.type = FormActions.UpdateErrors;
    }
    return UpdateFormErrors;
}());
var SetFormDisabled = /** @class */ (function () {
    function SetFormDisabled(payload) {
        this.payload = payload;
        this.type = FormActions.SetDisabled;
    }
    return SetFormDisabled;
}());
var SetFormEnabled = /** @class */ (function () {
    function SetFormEnabled(payload) {
        this.payload = payload;
        this.type = FormActions.SetEnabled;
    }
    return SetFormEnabled;
}());
var setValue = function (obj, prop, val) {
    obj = Object.assign({}, obj);
    var split = prop.split('.');
    var last = split[split.length - 1];
    split.reduce(function (acc, part) {
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
function form(reducer) {
    return function (state, action) {
        var nextState = reducer(state, action);
        if (action.type === FormActions.UpdateValue || action.type === FormActions.UpdateForm) {
            nextState = setValue(nextState, action.payload.path + ".model", Object.assign({}, action.payload.value));
        }
        if (action.type === FormActions.UpdateStatus || action.type === FormActions.UpdateForm) {
            nextState = setValue(nextState, action.payload.path + ".status", action.payload.status);
        }
        if (action.type === FormActions.UpdateErrors || action.type === FormActions.UpdateForm) {
            nextState = setValue(nextState, action.payload.path + ".errors", Object.assign({}, action.payload.errors));
        }
        if (action.type === FormActions.UpdateDirty || action.type === FormActions.UpdateForm) {
            nextState = setValue(nextState, action.payload.path + ".dirty", action.payload.dirty);
        }
        if (action.type === FormActions.SetDirty) {
            nextState = setValue(nextState, action.payload + ".dirty", true);
        }
        if (action.type === FormActions.SetPrestine) {
            nextState = setValue(nextState, action.payload + ".dirty", false);
        }
        if (action.type === FormActions.SetDisabled) {
            nextState = setValue(nextState, action.payload + ".disabled", true);
        }
        if (action.type === FormActions.SetEnabled) {
            nextState = setValue(nextState, action.payload + ".disabled", false);
        }
        return nextState;
    };
}
var getValue = function (obj, prop) { return prop.split('.').reduce(function (acc, part) { return acc && acc[part]; }, obj); };
var FormDirective = /** @class */ (function () {
    function FormDirective(_store, _formGroupDirective, _cd) {
        this._store = _store;
        this._formGroupDirective = _formGroupDirective;
        this._cd = _cd;
        this.debounce = 100;
        this._destroy$ = new rxjs.Subject();
        this._updating = false;
    }
    FormDirective.prototype.ngOnInit = function () {
        var _this = this;
        this._store
            .select(function (state) { return getValue(state, _this.path + ".model"); })
            .pipe(operators.takeUntil(this._destroy$))
            .subscribe(function (model) {
            if (!_this._updating) {
                _this._updating = false;
                if (model) {
                    _this._formGroupDirective.form.patchValue(model);
                    _this._cd.markForCheck();
                }
            }
        });
        this._store
            .select(function (state) { return getValue(state, _this.path + ".dirty"); })
            .pipe(operators.takeUntil(this._destroy$))
            .subscribe(function (dirty) {
            if (_this._formGroupDirective.form.dirty !== dirty) {
                if (dirty === true) {
                    _this._formGroupDirective.form.markAsDirty();
                    _this._cd.markForCheck();
                }
                else if (dirty === false) {
                    _this._formGroupDirective.form.markAsPristine();
                    _this._cd.markForCheck();
                }
            }
        });
        this._store
            .select(function (state) { return getValue(state, _this.path + ".disabled"); })
            .pipe(operators.takeUntil(this._destroy$))
            .subscribe(function (disabled) {
            if (_this._formGroupDirective.form.disabled !== disabled) {
                if (disabled === true) {
                    _this._formGroupDirective.form.disable();
                    _this._cd.markForCheck();
                }
                else if (disabled === false) {
                    _this._formGroupDirective.form.enable();
                    _this._cd.markForCheck();
                }
            }
        });
        this._formGroupDirective.valueChanges
            .pipe(operators.debounceTime(this.debounce), operators.takeUntil(this._destroy$))
            .subscribe(function (value) {
            _this._updating = true;
            _this._store.dispatch(new UpdateFormValue({
                path: _this.path,
                value: value
            }));
            _this._store.dispatch(new UpdateFormDirty({
                path: _this.path,
                dirty: _this._formGroupDirective.dirty
            }));
            _this._store.dispatch(new UpdateFormErrors({
                path: _this.path,
                errors: _this._formGroupDirective.errors
            }));
        });
        this._formGroupDirective.statusChanges
            .pipe(operators.debounceTime(this.debounce), operators.takeUntil(this._destroy$))
            .subscribe(function (status) {
            _this._store.dispatch(new UpdateFormStatus({
                path: _this.path,
                status: status
            }));
        });
    };
    FormDirective.prototype.ngOnDestroy = function () {
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
    };
    return FormDirective;
}());
FormDirective.decorators = [
    { type: core.Directive, args: [{ selector: '[ngrxForm]' },] },
];
FormDirective.ctorParameters = function () { return [
    { type: store.Store, },
    { type: forms.FormGroupDirective, },
    { type: core.ChangeDetectorRef, },
]; };
FormDirective.propDecorators = {
    "path": [{ type: core.Input, args: ['ngrxForm',] },],
    "debounce": [{ type: core.Input, args: ['ngrxFormDebounce',] },],
    "clearDestroy": [{ type: core.Input, args: ['ngrxFormClearOnDestroy',] },],
};
var NgrxFormModule = /** @class */ (function () {
    function NgrxFormModule() {
    }
    return NgrxFormModule;
}());
NgrxFormModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [forms.ReactiveFormsModule, store.StoreModule],
                declarations: [FormDirective],
                exports: [FormDirective]
            },] },
];

exports.form = form;
exports.NgrxFormModule = NgrxFormModule;
exports.FormDirective = FormDirective;
exports.FormActions = FormActions;
exports.UpdateFormStatus = UpdateFormStatus;
exports.UpdateFormValue = UpdateFormValue;
exports.UpdateForm = UpdateForm;
exports.UpdateFormDirty = UpdateFormDirty;
exports.SetFormDirty = SetFormDirty;
exports.SetFormPristine = SetFormPristine;
exports.UpdateFormErrors = UpdateFormErrors;
exports.SetFormDisabled = SetFormDisabled;
exports.SetFormEnabled = SetFormEnabled;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ngrx-form.umd.js.map
