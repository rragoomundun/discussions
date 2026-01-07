import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumSettings } from './forum-settings';

describe('ForumSettings', () => {
  let component: ForumSettings;
  let fixture: ComponentFixture<ForumSettings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForumSettings]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForumSettings);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
