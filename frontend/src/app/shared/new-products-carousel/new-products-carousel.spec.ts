import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProductsCarousel } from './new-products-carousel';

describe('NewProductsCarousel', () => {
  let component: NewProductsCarousel;
  let fixture: ComponentFixture<NewProductsCarousel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewProductsCarousel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewProductsCarousel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
