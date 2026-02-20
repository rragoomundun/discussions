import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumForumEdit } from './forum-forum-edit';

describe('ForumForumEdit', () => {
  let component: ForumForumEdit;
  let fixture: ComponentFixture<ForumForumEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForumForumEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForumForumEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
