import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDiscussion } from './edit-discussion';

describe('EditDiscussion', () => {
  let component: EditDiscussion;
  let fixture: ComponentFixture<EditDiscussion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditDiscussion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDiscussion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
