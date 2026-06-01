import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumLink } from './forum-link';

describe('ForumLink', () => {
  let component: ForumLink;
  let fixture: ComponentFixture<ForumLink>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForumLink]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForumLink);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
