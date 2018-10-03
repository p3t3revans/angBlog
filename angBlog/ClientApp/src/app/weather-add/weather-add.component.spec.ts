import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherAddComponent } from './weather-add.component';

describe('WeatherAddComponent', () => {
  let component: WeatherAddComponent;
  let fixture: ComponentFixture<WeatherAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeatherAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
