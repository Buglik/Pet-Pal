import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Link} from "../../../../../interfaces/link";
import {MatChip} from "@angular/material/chips";

@Component({
  selector: 'app-experience-form',
  templateUrl: './experience-form.component.html',
  styleUrls: ['./experience-form.component.scss']
})
export class ExperienceFormComponent {

  @Input() form: FormGroup;
  @Output() formChange: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  petOptions: Link[] = [
    {
      value: 'doggo',
      label: 'pet.dog'
    },
    {
      value: 'cat',
      label: 'pet.cat'
    }]

  get motivation() {
    return this.form.get('motivation');
  }

  get experience() {
    return this.form.get('experience');
  }

  onSubmit() {
    console.log('what should i do')
  }

  toggleSelection(chip: MatChip) {
    chip.toggleSelected();
  }

  showForm(){
    console.log(this.form)
  }

}
