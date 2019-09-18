import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import {
  Validator,
  validateSet,
  regMapElement
} from "../services/validator.service";

@Component({
  template: `
    <div class="row skts-process-form-section form-group">
      <div class="col-sm-6">
        <label
          >{{ label
          }}<span
            *ngIf="showHelper()"
            class="skts-rounded-icon hover"
            (click)="toggleHelpTxt = !toggleHelpTxt"
            >?</span
          ></label
        >
      </div>
      <div class="col-sm-6">
        <div *ngIf="showHelper()" [hidden]="toggleHelpTxt" class="helper-txt">
          {{ helpTxt }}
        </div>
        <div class="input-group">
          <input
            [(ngModel)]="value"
            [class.text-right]="!!postfix"
            class="form-control"
            (focus)="errors = []"
            (keyup)="inputChanged($event)"
            (blur)="blur()"
            [attr.placeholder]="placeholder"
            #spy="ngModel"
          />
          <div class="input-group-append" *ngIf="!!postfix">
            <span class="input-group-text align-units">{{ postfix }}</span>
          </div>
        </div>
        <div
          [hidden]="errors.length === 0 || spy.pristine"
          class="text-danger"
          [class.show]="errors.length > 0"
        >
          {{ printMostRelevantError() }}
        </div>
      </div>
    </div>
    <div class="row" [hidden]="errors.length === 0 || spy.pristine">
      <div class="col-sm-12"></div>
    </div>
  `,
  selector: "regular-input",
  styleUrls: ["../styles/helperTxt.css"]
})
export class normalInput {
  postFixClass: string;
  errorMessage: string;
  errors: regMapElement[] = [];
  _value: string;
  toggleHelpTxt: boolean = true;

  @Input()
  label: string;

  @Input()
  helpTxt: string;

  @Input()
  get value() {
    return this._value;
  }

  @Output()
  valueChange: EventEmitter<any> = new EventEmitter();

  set value(val) {
    this._value = val;
    this.valueChange.emit(this._value);
  }

  @Input()
  postfix: string;

  @Input()
  validateType: regMapElement[];

  @Input()
  default: string;

  @Input()
  placeholder: string;

  @Input()
  errormessage: string;

  @Output()
  changed: EventEmitter<any> = new EventEmitter();

  @Output()
  validateStep: EventEmitter<any> = new EventEmitter();

  printMostRelevantError() {
    return this.errors.length > 0 ? this.errors[0].errorTxt : "";
  }

  inputChanged(event: KeyboardEvent) {
    let keyCode = event.which;

    let validateKeyupGroup = this.validateType.filter(el => {
      return el.event === "keyup" || !el.event;
    });

    var validate: validateSet = {
      element: this.value,
      regExContainer: validateKeyupGroup
    };

    /* hitting Tab should not cause any errors */
    if (keyCode !== 9) {
      this.errors = new Validator().add([validate]).errorsOnInput();
      this.validateAll();
    }

    this.changed.emit(null);
  }

  validateAll() {
    var validate: validateSet = {
      element: this.value,
      regExContainer: this.validateType
    };

    this.validateStep.emit(new Validator().add([validate]).checkAll());
  }

  blur() {
    let validateBlurGroup = this.validateType.filter(el => el.event === "blur");

    if (validateBlurGroup.length > 0) {
      var validate: validateSet = {
        element: this.value,
        regExContainer: validateBlurGroup
      };

      this.errors = new Validator().add([validate]).errorsOnInput();
      this.validateAll();
    }
  }

  ngOnInit() {
    this.postFixClass = "skts-postfix-" + this.postfix;
  }

  showHelper() {
    return this.helpTxt && this.helpTxt.length > 2;
  }
}
