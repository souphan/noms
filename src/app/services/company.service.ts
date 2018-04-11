import {Injectable, EventEmitter} from "@angular/core";
import {AuthenticationDetails, CognitoUser} from "amazon-cognito-identity-js";
import { Observable } from "rxjs";
import { UserLoginService } from "../../service/user-login.service";
import { CompanyInfoListResponse } from '../model/CompanyInfoListResponse';
import { DatabaseService } from "../services/database.service";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Router } from "@angular/router";

@Injectable()
export class CompanyService {
    public companyInfo = new EventEmitter<CompanyInfoListResponse>();
    public currentCompany: any;

    constructor(private database: DatabaseService, public router: Router) {
    }

    public getCompanyInfo(company) {
        if (this.currentCompany == null) {
            this.database.getCompanyInfo(company).subscribe( data => {
                this.currentCompany = data;
                this.companyInfo.emit(this.currentCompany);
                sessionStorage.setItem('currentCompany', JSON.stringify(this.currentCompany));
                this.router.navigate(['/restaurants']);
            });
        }
    }
    
    public async retrieveCompanyInfo(company) {
        await this.getCompanyInfo(company);
    }

}
