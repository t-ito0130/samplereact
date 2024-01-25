import {
  initCognitoSession,
  isLoggedIn,
} from "@/data/repository/cognito.repository";
import { AwsExports } from "@/shared/const/aws-exports";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async () => {
  // TODO: Amplify Configureを常に行うで良い？セッションがリセットされてしまうのでは？
  initCognitoSession({
    domain: AwsExports.REGION,
    userPoolId: AwsExports.USER_POOL_ID,
    userPoolClientId: AwsExports.USER_POOL_APP_CLIENT_ID,
  });
  const isLogin = await isLoggedIn();
  // TODO: permanent見直し。
  if (isLogin) {
    return { redirect: { permanent: false, destination: "/home" } };
  } else {
    return { redirect: { permanent: false, destination: "/login" } };
  }
};

export function Index() {
  // TODO: ここに何を書けば良い？
}

export default Index;
