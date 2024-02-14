import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { ProductsComponent } from './products.component';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let storeMock: any;

  beforeEach(async() => {
    storeMock = {
      select: jasmine.createSpy().and.returnValues(of([
        {
          id: 1,
          name: "Sensation Benetton",
          description: "Introducing a vibrant collection of stylish shirts that effortlessly blend comfort and fashion.",
          price: 34.34,
          image_urls: ["benetton_hawaii_red.jpg", "benetton_hawaii_green.jpg"]
        },
        {
          id: 2,
          name: "Profession Burberry",
          description: "Wrap yourself in timeless sophistication with the Burberry Flannel Shirt.",
          price: 54.99,
          image_urls: [ "burberry_flannel_black.webp", "burberry_flannel_blue.jpg"]
        }
      ]))
    }
    await TestBed.configureTestingModule({
      declarations: [ProductsComponent],
      providers: [
        { provide: Store, useValue: storeMock }
      ],
      imports: [
        RouterTestingModule
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch products data', (done) => {
    component.products$.subscribe(products => {
      expect(products.length).toBe(2);
      expect(products[0].name).toBe('Sensation Benetton');
      expect(products[1].name).toBe('Profession Burberry');
      done();
    })
  })


});
