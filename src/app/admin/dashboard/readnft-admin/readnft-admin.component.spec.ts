import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadnftAdminComponent } from './readnft-admin.component';

describe('ReadnftAdminComponent', () => {
  let component: ReadnftAdminComponent;
  let fixture: ComponentFixture<ReadnftAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadnftAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadnftAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
