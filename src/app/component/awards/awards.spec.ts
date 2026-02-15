import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Awards } from './awards';

describe('Awards', () => {
  let component: Awards;
  let fixture: ComponentFixture<Awards>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Awards]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Awards);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
