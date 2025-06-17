import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImpoundsPage } from './impounds.page';

describe('ImpoundsPage', () => {
  let component: ImpoundsPage;
  let fixture: ComponentFixture<ImpoundsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpoundsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
