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
        .subscribe(error => {
        Object.keys(error).forEach(prop => {
          if (prop == 'globalError') {
            this.form.setErrors({
              serverError: error[prop]
            })
          } else {
            const control = this.form.get(prop);
            if (control) {
              control.setErrors({
                serverError: error[prop]
              })
            }
          }
        })
      }))
  }

  formToJson(): T {
    return this.form.value
  }

  onSubmit(): void {
    this.formSubmitted.emit(this.formToJson());
  }

  ngOnDestroy() {
  }
}
