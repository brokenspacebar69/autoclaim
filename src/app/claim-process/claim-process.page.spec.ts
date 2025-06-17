import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClaimProcessPage } from './claim-process.page';

describe('ClaimProcessPage', () => {
  let component: ClaimProcessPage;
  let fixture: ComponentFixture<ClaimProcessPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimProcessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
