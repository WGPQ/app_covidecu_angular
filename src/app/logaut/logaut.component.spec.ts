import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogautComponent } from './logaut.component';

describe('LogautComponent', () => {
  let component: LogautComponent;
  let fixture: ComponentFixture<LogautComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogautComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogautComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
