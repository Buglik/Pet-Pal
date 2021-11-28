import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PetSitterUpdateFormComponent} from './pet-sitter-update-form.component';

describe('PetSitterUpdateFormComponent', () => {
  let component: PetSitterUpdateFormComponent;
  let fixture: ComponentFixture<PetSitterUpdateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PetSitterUpdateFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PetSitterUpdateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
