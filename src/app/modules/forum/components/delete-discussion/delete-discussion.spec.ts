import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDiscussion } from './delete-discussion';

describe('DeleteDiscussion', () => {
  let component: DeleteDiscussion;
  let fixture: ComponentFixture<DeleteDiscussion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteDiscussion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteDiscussion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
