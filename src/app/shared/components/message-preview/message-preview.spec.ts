import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagePreview } from './message-preview';

describe('MessagePreview', () => {
  let component: MessagePreview;
  let fixture: ComponentFixture<MessagePreview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessagePreview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessagePreview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
