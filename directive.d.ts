import { ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { Store } from '@ngrx/store';
export declare class FormDirective implements OnInit, OnDestroy {
    private _store;
    private _formGroupDirective;
    private _cd;
    path: string;
    debounce: number;
    clearDestroy: boolean;
    private _destroy$;
    private _updating;
    constructor(_store: Store<any>, _formGroupDirective: FormGroupDirective, _cd: ChangeDetectorRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
}
