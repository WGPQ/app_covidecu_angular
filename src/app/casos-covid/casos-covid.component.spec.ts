import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CasosCovidComponent } from './casos-covid.component';

describe('CasosCovidComponent', () => {
  let component: CasosCovidComponent;
  let fixture: ComponentFixture<CasosCovidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CasosCovidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasosCovidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
