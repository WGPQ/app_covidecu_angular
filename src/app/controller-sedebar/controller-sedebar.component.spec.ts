import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControllerSedebarComponent } from './controller-sedebar.component';

describe('ControllerSedebarComponent', () => {
  let component: ControllerSedebarComponent;
  let fixture: ComponentFixture<ControllerSedebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControllerSedebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControllerSedebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
