import {environment} from "../environments/environment";
import {Injectable, EventEmitter} from "@angular/core";
import {DynamoDBService} from "./ddb.service";
import {CognitoCallback, CognitoUtil, LoggedInCallback} from "./cognito.service";
import {AuthenticationDetails, CognitoUser} from "amazon-cognito-identity-js";
import {User} from '../app/model/User';
import * as AWS from "aws-sdk/global";
import * as STS from "aws-sdk/clients/sts";

@Injectable()
export class UserLoginService {
    public onAuthUserChange = new EventEmitter<User>();
    public currentUser: any;

    constructor(public ddb: DynamoDBService, public cognitoUtil: CognitoUtil) {
    }

    authenticate(username: string, password: string, callback: CognitoCallback) {
        console.log("UserLoginService: starting the authentication")

        let authenticationData = {
            Username: username,
            Password: password,
        };
        let authenticationDetails = new AuthenticationDetails(authenticationData);

        let userData = {
            Username: username,
            Pool: this.cognitoUtil.getUserPool()
        };

        console.log("UserLoginService: Params set...Authenticating the user");
        let cognitoUser = new CognitoUser(userData);
        this.currentUser = cognitoUser;
        this.onAuthUserChange.emit(this.currentUser);
        sessionStorage.setItem('currentUser', this.currentUser);
        // const userFromStorageJson = JSON.parse(sessionStorage.getItem('currentUser'));

        console.log("UserLoginService: config is " + AWS.config);
        var self = this;
        cognitoUser.authenticateUser(authenticationDetails, {
            newPasswordRequired: function (userAttributes, requiredAttributes) {
                callback.cognitoCallback(`User needs to set password.`, null);
            },
            onSuccess: function (result) {
                // this.isLoggedIn = true;
                // console.log(this.isLoggedIn, 'getting into authentication logged in true');

                console.log("In authenticateUser onSuccess callback");

                let creds = self.cognitoUtil.buildCognitoCreds(result.getIdToken().getJwtToken());

                AWS.config.credentials = creds;

                // So, when CognitoIdentity authenticates a user, it doesn't actually hand us the IdentityID,
                // used by many of our other handlers. This is handled by some sly underhanded calls to AWS Cognito
                // API's by the SDK itself, automatically when the first AWS SDK request is made that requires our
                // security credentials. The identity is then injected directly into the credentials object.
                // If the first SDK call we make wants to use our IdentityID, we have a
                // chicken and egg problem on our hands. We resolve this problem by "priming" the AWS SDK by calling a
                // very innocuous API call that forces this behavior.
                let clientParams:any = {};
                if (environment.sts_endpoint) {
                    clientParams.endpoint = environment.sts_endpoint;
                }
                let sts = new STS(clientParams);
                sts.getCallerIdentity(function (err, data) {
                    console.log("UserLoginService: Successfully set the AWS credentials");
                    callback.cognitoCallback(null, result);
                });

            },
            onFailure: function (err) {
                callback.cognitoCallback(err.message, null);
            },
        });
    }

    forgotPassword(username: string, callback: CognitoCallback) {
        let userData = {
            Username: username,
            Pool: this.cognitoUtil.getUserPool()
        };

        let cognitoUser = new CognitoUser(userData);

        cognitoUser.forgotPassword({
            onSuccess: function () {

            },
            onFailure: function (err) {
                callback.cognitoCallback(err.message, null);
            },
            inputVerificationCode() {
                callback.cognitoCallback(null, null);
            }
        });
    }

    confirmNewPassword(email: string, verificationCode: string, password: string, callback: CognitoCallback) {
        let userData = {
            Username: email,
            Pool: this.cognitoUtil.getUserPool()
        };

        let cognitoUser = new CognitoUser(userData);

        cognitoUser.confirmPassword(verificationCode, password, {
            onSuccess: function () {
                callback.cognitoCallback(null, null);
            },
            onFailure: function (err) {
                callback.cognitoCallback(err.message, null);
            }
        });
    }

    logout() {
        console.log("UserLoginService: Logging out");
        // this.ddb.writeLogEntry("logout");
        this.cognitoUtil.getCurrentUser().signOut();
    }

    isAuthenticated(callback: LoggedInCallback) {
        if (callback == null)
            throw("UserLoginService: Callback in isAuthenticated() cannot be null");

        let cognitoUser = this.cognitoUtil.getCurrentUser();

        // console.log(cognitoUser, 'is in authenticated user souphan');
        this.currentUser = cognitoUser;
        this.onAuthUserChange.emit(this.currentUser);
        sessionStorage.setItem('currentUser', this.currentUser);
        // const userFromStorageJson = JSON.parse(sessionStorage.getItem('currentUser'));
        if (cognitoUser != null) {
            cognitoUser.getSession(function (err, session) {
                if (err) {
                    console.log("UserLoginService: Couldn't get the session: " + err, err.stack);
                    callback.isLoggedIn(err, false);
                }
                else {
                    console.log("UserLoginService: Session is " + session.isValid());
                    callback.isLoggedIn(err, session.isValid());
                }
            });
        } else {
            console.log("UserLoginService: can't retrieve the current user");
            callback.isLoggedIn("Can't retrieve the CurrentUser", false);
        }
    }

}
