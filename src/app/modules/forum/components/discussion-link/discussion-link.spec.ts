import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscussionLink } from './discussion-link';

describe('DiscussionLink', () => {
  let component: DiscussionLink;
  let fixture: ComponentFixture<DiscussionLink>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiscussionLink]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscussionLink);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
