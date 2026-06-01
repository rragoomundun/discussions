import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryHome } from './category-home';

describe('CategoryHome', () => {
  let component: CategoryHome;
  let fixture: ComponentFixture<CategoryHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryHome],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryHome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
