import { Component, Input, OnInit } from "@angular/core";
import { WizardState } from "../services/app.wizardState.service";

@Component({
  selector: "global-buttons",
  template: `
    <hr class="skts-divider" />
    <div class="clearfix skts-wizard-buttons">
      <button
        *ngIf="wizardState.trin > 0 && wizardState.trin < links.length - 1"
        [value]="content.back"
        type="button"
        class="alt-btn alt-btn-arrow-left float-left"
        [routerLink]="links[wizardState.trin - 1]"
      >
        {{ content.back }}
      </button>
      <input
        *ngIf="wizardState.trin < links.length - 1"
        [value]="content.next"
        type="button"
        class="btn btn-primary float-right"
        [routerLink]="links[wizardState.trin + 1]"
        [disabled]="disable"
      />
    </div>
  `
})
export class globalButtoms {
  @Input()
  links: string[];

  @Input()
  disable: boolean;

  content: Object = {};

  constructor(private wizardState: WizardState) {}

  ngOnInit() {
    this.wizardState.getText("general", "globalbuttons").subscribe(text => {
      text.forEach(element => {
        this.content[element.id] = element[this.wizardState.language];
      });
    });
  }
}
