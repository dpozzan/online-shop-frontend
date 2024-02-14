import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing"
import { TestBed } from "@angular/core/testing"
import { AuthService } from "./auth.service"


fdescribe('AuthService', () => {
    let authService: AuthService;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [AuthService]
        })

        authService = TestBed.inject(AuthService);
        httpTestingController = TestBed.inject(HttpTestingController);
    })

    it('should create a new user', () => {
        const mockResponse = {message: "User created successfully"};

        const user = { email: "user@test.de", password: "superSecure" };

        authService.register(user).subscribe((response) => {
            expect(response).toBeTruthy();
            expect(response.message).toBe("User created successfully");
        })

        const req = httpTestingController.expectOne('http://localhost:8080/signup');
        expect(req.request.body).toEqual(user);
        expect(req.request.method).toBe('POST');
        req.flush(mockResponse);
    })

    it('should get a valid token', () => {
        const mockResponse = {exp:1234567, token: "abc"};

        const user = { email: "user@test.de", password: "superSecure" };

        authService.login(user).subscribe((response) => {
            expect(response).toBeTruthy();
            expect(response.token).toEqual('abc');
        })

        const req = httpTestingController.expectOne('http://localhost:8080/login');
        expect(req.request.body).toEqual(user);
        expect(req.request.method).toBe('POST');
        req.flush(mockResponse);
    })


    afterEach(() => {
        httpTestingController.verify()
    })
})