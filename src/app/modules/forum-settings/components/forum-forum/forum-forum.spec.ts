import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumForum } from './forum-forum';

describe('ForumForum', () => {
  let component: ForumForum;
  let fixture: ComponentFixture<ForumForum>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForumForum]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForumForum);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
