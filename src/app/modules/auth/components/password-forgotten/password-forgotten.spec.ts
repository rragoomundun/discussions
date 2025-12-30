import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordForgotten } from './password-forgotten';

describe('PasswordForgotten', () => {
  let component: PasswordForgotten;
  let fixture: ComponentFixture<PasswordForgotten>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasswordForgotten]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasswordForgotten);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
