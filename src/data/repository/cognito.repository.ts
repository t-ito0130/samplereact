import { isNullorUndefined } from "@/shared/utility/validation.utility";
import { Amplify } from "aws-amplify";
import { AuthUser, getCurrentUser } from "aws-amplify/auth";

export function initCognitoSession(configure: {
  domain: string;
  userPoolId: string;
  userPoolClientId: string;
}) {
  Amplify.configure({
    Auth: {
      Cognito: {
        userPoolClientId: configure.userPoolClientId,
        userPoolId: configure.userPoolId,
        loginWith: {
          oauth: {
            domain: configure.domain,
            scopes: [
              "openid email phone profile aws.cognito.signin.user.admin ",
            ],
            redirectSignIn: ["http://localhost:3000/", "https://example.com/"],
            redirectSignOut: ["http://localhost:3000/", "https://example.com/"],
            responseType: "code",
          },
          username: true,
          email: false,
          phone: false,
        },
      },
    },
  });
}

export async function isLoggedIn(): Promise<boolean> {
  try {
    const currentUser = await getCurrentUser();
    if (isNullorUndefined<AuthUser>(currentUser)) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("error:" + error);
    return false;
  }
}
