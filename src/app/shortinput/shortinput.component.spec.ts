import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortinputComponent } from './shortinput.component';

describe('ShortinputComponent', () => {
  let component: ShortinputComponent;
  let fixture: ComponentFixture<ShortinputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShortinputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShortinputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
