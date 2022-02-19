import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestroySaveComponent } from './destroy-save.component';

describe('DestroySaveComponent', () => {
  let component: DestroySaveComponent;
  let fixture: ComponentFixture<DestroySaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DestroySaveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DestroySaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
