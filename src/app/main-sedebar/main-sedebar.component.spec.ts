import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainSedebarComponent } from './main-sedebar.component';

describe('MainSedebarComponent', () => {
  let component: MainSedebarComponent;
  let fixture: ComponentFixture<MainSedebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainSedebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainSedebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
