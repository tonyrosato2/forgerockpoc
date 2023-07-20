import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentralLoginComponent } from './central-login.component';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import {HeaderComponent} from "../../../header/components/header.component";

describe('CentralLoginComponent', () => {
  let component: CentralLoginComponent;
  let fixture: ComponentFixture<CentralLoginComponent>;

  beforeAll(() => {
    TestBed.initTestEnvironment(
      BrowserDynamicTestingModule,
      platformBrowserDynamicTesting()
    );
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CentralLoginComponent, HeaderComponent]
    });
    fixture = TestBed.createComponent(CentralLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
