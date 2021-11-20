import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {MatChip} from "@angular/material/chips";
import {MeResponse} from "../../../../../api/src";
import {EnumService, SelectOption} from "../../../../utils/enum.service";

@Component({
  selector: 'app-experience-form',
  templateUrl: './experience-form.component.html',
  styleUrls: ['./experience-form.component.scss']
})
export class ExperienceFormComponent {

  @Input() profile: MeResponse | null;
  @Input() form: FormGroup;
  @Output() formChange: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  @Output() goNext: EventEmitter<void> = new EventEmitter<void>();

  constructor(private readonly enumService: EnumService) {
  }

  petOptions: SelectOption<string>[] = this.enumService.getPetsSelectOptions();

  get motivation() {
    return this.form.get('motivation');
  }

  get experience() {
    return this.form.get('experience');
  }

  get pets() {
    return this.form.get('pets');
  }

  onSubmit() {
    this.goNext.emit()
  }

  // Quick but nasty solution
  toggleSelection(chip: MatChip, val: string) {
    const result = chip.toggleSelected();
    if (result && !this.pets?.value.includes(val)) {
      this.pets?.value.push(val);
    } else if (this.pets?.value.includes(val)) {
      const index = this.pets?.value.indexOf(val);
      if (index !== -1) {
        this.pets?.value.splice(index, 1);
      }
    }
    this.pets?.updateValueAndValidity();
  }
}
