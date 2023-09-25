import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateStateComponent } from './station-form.component';

describe('StationFormComponent', () => {
  let component: UpdateStateComponent;
  let fixture: ComponentFixture<UpdateStateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateStateComponent]
    });
    fixture = TestBed.createComponent(UpdateStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
