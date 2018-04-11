import {Inject, Injectable} from "@angular/core";
import {CognitoCallback, CognitoUtil} from "./cognito.service";
import {AuthenticationDetails, CognitoUser, CognitoUserAttribute} from "amazon-cognito-identity-js";
// import {RegistrationUser} from "app/register/registration.component";
import {NewPasswordUser, RegistrationUser} from "app/password/password.component";
import * as AWS from "aws-sdk/global";

@Injectable()
export class UserRegistrationService {

    constructor(@Inject(CognitoUtil) public cognitoUtil: CognitoUtil) {

    }

    register(user: RegistrationUser, callback: CognitoCallback): void {
        console.log("UserRegistrationService: user is " + user);

        let attributeList = [];

        let dataEmail = {
            Name: 'email',
            Value: user.email
        };
        let dataFirstName = {
            Name: 'first',
            Value: user.firstName
        };
        let dataLastName = {
            Name: 'last',
            Value: user.lastName
        };
        let dataNickname = {
            Name: 'nickname',
            Value: user.name
        };
        let dataCompany = {
            Name: 'company',
            Value: user.company
        };
        attributeList.push(new CognitoUserAttribute(dataEmail));
        attributeList.push(new CognitoUserAttribute(dataFirstName));
        attributeList.push(new CognitoUserAttribute(dataLastName));
        attributeList.push(new CognitoUserAttribute(dataNickname));
        attributeList.push(new CognitoUserAttribute(dataCompany));

        this.cognitoUtil.getUserPool().signUp(user.email, user.password, attributeList, null, function (err, result) {
            if (err) {
                callback.cognitoCallback(err.message, null);
            } else {
                console.log("UserRegistrationService: registered user is " + result);
                callback.cognitoCallback(null, result);
            }
        });

    }

    confirmRegistration(username: string, firstName: string, lastName: string, confirmationCode: string, callback: CognitoCallback): void {

        let userData = {
            Username: username,
            FirstName: firstName,
            LastName: lastName,
            Pool: this.cognitoUtil.getUserPool()
        };

        let cognitoUser = new CognitoUser(userData);

        cognitoUser.confirmRegistration(confirmationCode, true, function (err, result) {
            if (err) {
                callback.cognitoCallback(err.message, null);
            } else {
                callback.cognitoCallback(null, result);
            }
        });
    }

    resendCode(username: string, callback: CognitoCallback): void {
        let userData = {
            Username: username,
            Pool: this.cognitoUtil.getUserPool()
        };

        let cognitoUser = new CognitoUser(userData);

        cognitoUser.resendConfirmationCode(function (err, result) {
            if (err) {
                callback.cognitoCallback(err.message, null);
            } else {
                callback.cognitoCallback(null, result);
            }
        });
    }

    newPassword(newPasswordUser: NewPasswordUser, callback: CognitoCallback): void {
        // Get these details and call
        //cognitoUser.completeNewPasswordChallenge(newPassword, userAttributes, this);
        let authenticationData = {
            Username: newPasswordUser.username,
            FirstName: newPasswordUser.firstName,
            LastName: newPasswordUser.lastName,
            Password: newPasswordUser.existingPassword,
            company: newPasswordUser.company
        };
        let authenticationDetails = new AuthenticationDetails(authenticationData);

        let userData = {
            Username: newPasswordUser.username,
            FirstName: newPasswordUser.firstName,
            LastName: newPasswordUser.lastName,
            Password: newPasswordUser.password,
            company: newPasswordUser.company,
            Pool: this.cognitoUtil.getUserPool()
        };

        console.log("UserLoginService: Params set...Authenticating the user");
        let cognitoUser = new CognitoUser(userData);
        console.log("UserLoginService: config is " + AWS.config);
        cognitoUser.authenticateUser(authenticationDetails, {
            newPasswordRequired: function (userAttributes, requiredAttributes) {
                // User was signed up by an admin and must provide new
                // password and required attributes, if any, to complete
                // authentication.

                // the api doesn't accept this field back
                delete userAttributes.email_verified;
                
                userAttributes = {
                    "given_name": newPasswordUser.firstName,
                    "family_name": newPasswordUser.lastName,
                    "custom:company": newPasswordUser.company
                }

                console.log('userAttributes: ' + JSON.stringify(userAttributes));
                cognitoUser.completeNewPasswordChallenge(newPasswordUser.password, userAttributes, {
                    onSuccess: function (result) {
                        callback.cognitoCallback(null, userAttributes);
                    },
                    onFailure: function (err) {
                        callback.cognitoCallback(err, null);
                    }
                });
            },
            onSuccess: function (result) {
                callback.cognitoCallback(null, result);
            },
            onFailure: function (err) {
                callback.cognitoCallback(err, null);
            }
        });
    }
}