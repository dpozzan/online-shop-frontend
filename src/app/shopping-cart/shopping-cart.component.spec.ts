import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing"
import { ShoppingCartComponent } from "./shopping-cart.component"
import { By } from "@angular/platform-browser";
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientModule } from "@angular/common/http";
import { Product } from "../product/product.model";
import { provideMockStore } from '@ngrx/store/testing'
import { Observable, Subject, of } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";

const mockBasket: Product[] = [
  {name: 'Test name', description: 'Test description', price: 10.10, id: 1, quantity: 1, image_urls: ['test-1.jpg', 'test-2.jpg']},
  {name: 'Test name', description: 'Test description', price: 10.10, id: 2, quantity: 1, image_urls: ['test-1.jpg', 'test-2.jpg']},
]

class RouterStub {
  navigate(params: any){
  }
}

class ActivatedRouteStub {
  data: Observable<any> = of({})
}

class StoreStub {
  private subject = new Subject();

  push(state: any){
    this.subject.next(state);
  }

  select(selector?: any): Observable<any> {
    return this.subject.asObservable();
  }
}


describe('ShoppingCartComponent', () => {
  let component: ShoppingCartComponent;
  let fixture: ComponentFixture<ShoppingCartComponent>;


  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShoppingCartComponent],
      imports: [HttpClientModule],
      providers: [
        // { provide: provideMockStore({
        //   initialState: { shoppingCart: mockBasket }
        // })},
        { provide: Router, useClass: RouterStub },
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
        { provide: Store, useClass: StoreStub }
      ]
    })

    fixture = TestBed.createComponent(ShoppingCartComponent);

    component = fixture.componentInstance;

    component.basket = mockBasket;
    component.totalPrice = 100;

    fixture.detectChanges();

    
  })

  it('should contain the € symbol in total price',() => {
    let de = fixture.debugElement.query(By.css('.card-header'));
    fixture.detectChanges()
    expect(de).not.toBeNull();
    let el: HTMLElement = de.nativeElement;

    expect(el.innerText).toContain('€');
  })
})
