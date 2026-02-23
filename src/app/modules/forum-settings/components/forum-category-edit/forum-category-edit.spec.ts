import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumCategoryEdit } from './forum-category-edit';

describe('ForumCategoryEdit', () => {
  let component: ForumCategoryEdit;
  let fixture: ComponentFixture<ForumCategoryEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForumCategoryEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForumCategoryEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
