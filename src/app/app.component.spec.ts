import { ComponentFixture, TestBed } from "@angular/core/testing"
import { AppComponent } from "./app.component"
import { By } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { Store } from "@ngrx/store";
import { RouterTestingModule } from "@angular/router/testing";

class StoreStub {
  dispatch() {}
}

xdescribe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [HttpClientModule, RouterTestingModule],
      providers: [
        { provide: Store, useClass: StoreStub }
      ]
    })

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  })

  it('should have a link with name Online Shop', () => {
    let de = fixture.debugElement.query(By.css('.navbar-brand'));
    let el: HTMLElement = de.nativeElement;

    expect(el.innerText).toContain('OnlineShop');
  })
})