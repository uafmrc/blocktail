import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatenftComponent } from './createnft.component';

describe('CreatenftComponent', () => {
  let component: CreatenftComponent;
  let fixture: ComponentFixture<CreatenftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatenftComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatenftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
