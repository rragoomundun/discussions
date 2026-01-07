import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomLinks } from './bottom-links';

describe('BottomLinks', () => {
  let component: BottomLinks;
  let fixture: ComponentFixture<BottomLinks>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BottomLinks]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BottomLinks);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
