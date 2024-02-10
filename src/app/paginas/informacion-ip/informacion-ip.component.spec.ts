import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionIpComponent } from './informacion-ip.component';

describe('InformacionIpComponent', () => {
  let component: InformacionIpComponent;
  let fixture: ComponentFixture<InformacionIpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformacionIpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformacionIpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
