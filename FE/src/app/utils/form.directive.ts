import {Directive, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Observable, of, Subscription} from "rxjs";
import {filter} from "rxjs/operators";
import {FormGroup} from "@angular/forms";

@Directive({
  selector: '[appForm]'
})
export class FormDirective<T> implements OnInit, OnDestroy {

  @Output() formSubmitted: EventEmitter<T> = new EventEmitter<T>();
  @Input() pending: boolean = false;
  @Input() errors: Observable<any> = of(null);

  private subSink = new Subscription();

  form: FormGroup;

  ngOnInit() {
    this.subSink.add(
      this.errors.pipe(
        filter(err => err))
        .subscribe(error => this.errorSetter(error)))
  }

  private errorSetter(error: any) {
    Object.keys(error).forEach(prop => {
      if (prop == 'globalError') {
        this.form.setErrors({
          serverError: error[prop]
        })
      } else {
        this.controlDigger(error);
      }
    })
  }

  private controlDigger(error: any, path: string[] = []) {
    Object.keys(error).forEach(prop => {
      if (error[prop] instanceof Object) {
        path.push(prop)
        this.controlDigger(error[prop], path)
      } else {
        const control = this.form.get(path.join('.'));
        if (control) {
          control.setErrors({
            serverError: error
          })
        }
      }
      path.pop();
    })
  }

  formToJson(): T {
    return this.form.value
  }

  onSubmit(): void {
    this.formSubmitted.emit(this.formToJson());
  }

  ngOnDestroy() {
    this.subSink.unsubscribe();
  }
}
