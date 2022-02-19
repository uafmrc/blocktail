import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadnftComponent } from './readnft.component';

describe('ReadnftComponent', () => {
  let component: ReadnftComponent;
  let fixture: ComponentFixture<ReadnftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadnftComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadnftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
