import { configOverridesGenerated } from './config-overrides-generated'
// DO NOT DELETE THIS FILE!!!

//==============================================
// Default configurations
//==============================================

const Config = {

  USER_POOL_ID:               'us-east-1_CxEn4jspx',
  CLIENT_ID:                  '78tp8pl89d9gftn949c2thtrf6',
  IDENTITY_POOL_ID:           'us-east-1:3c7abbd9-5d43-4a36-8cc9-6c3cd81dcac0',
  REGION:                     'us-east-1',  // Your AWS region where you setup your Cognito User Pool and Federated Identities

  PROFILE_IMAGES_S3_BUCKET:   'nomfoods-app-meal-images',

  API_ENDPOINT:               'https://a8qijwunca.execute-api.us-east-1.amazonaws.com/prod',

  DEVELOPER_MODE:             false, // enable to automatically login
  CODE_VERSION:               '1.0.0',
  DEFAULT_USERNAMES:          ['user1', 'admin1'] // default users cannot change their passwords
};

//==============================================



// Merge in the values from the auto-generated config.
// If there are are conflicts, then the values from the
// auto-generated config will override
function mergeConfigurations() {
  for (let attributeName of Object.keys(configOverridesGenerated)) {
    Config[attributeName] = configOverridesGenerated[attributeName];
  }
}

mergeConfigurations();

export { Config }
