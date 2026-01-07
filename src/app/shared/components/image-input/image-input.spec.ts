import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageInput } from './image-input';

describe('ImageInput', () => {
  let component: ImageInput;
  let fixture: ComponentFixture<ImageInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageInput]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageInput);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
