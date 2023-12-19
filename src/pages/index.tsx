import { GetServerSideProps } from "next";
import { Book, getData } from "./api/getBooks";
import { useRouter } from "next/router";
import { useState } from "react";
import { Amplify } from "aws-amplify";
import awsExports from ".././aws-exports";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

// Configure Amplify in index file or root file
Amplify.configure({
  Auth: {
    Cognito: {
      userPoolClientId: awsExports.USER_POOL_APP_CLIENT_ID,
      userPoolId: awsExports.USER_POOL_ID,
      loginWith: {
        oauth: {
          domain: awsExports.REGION,
          scopes: ["openid email phone profile aws.cognito.signin.user.admin "],
          redirectSignIn: ["http://localhost:3000/", "https://example.com/"],
          redirectSignOut: ["http://localhost:3000/", "https://example.com/"],
          responseType: "code",
        },
        username: true,
        email: false, // Optional
        phone: false, // Optional
      },
    },
  },
});

export const getServerSideProps: GetServerSideProps = async (context) => {
  var input = context?.query?.input?.toString() ?? "AWS";
  const books: Book[] = await getData(input);
  return {
    props: { items: books },
  };
};

export default function Home(props: any) {
  const router = useRouter(); //ルーターの取得
  const [input, setInput] = useState("");

  // ボタンをクリックしたときの処理
  const clickButton = () => {
    //未入力の時
    if (!input) {
      return;
    }

    router.push({
      pathname: "/", //URL
      query: { input: input }, //検索クエリ
    });
  };

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <>
          <div>
            <p>
              Welcome {user?.userId}:{user?.username}
            </p>
            <button onClick={signOut}>Sign out</button>
          </div>
          <div style={{ textAlign: "center", marginTop: "50px" }}>
            {/* 入力項目 */}
            <input
              type="text"
              value={input}
              onChange={(e) =>
                setInput(e.target.value)
              } /*変更時inputに値をセット*/
            />

            {/* ボタン */}
            <button onClick={clickButton} disabled={!input}>
              {" "}
              {/*入力項目が未入力の場合、非活性*/}
              検索
            </button>
          </div>
          <br></br>
          <br></br>
          <ul>
            {props.items.map((item: Book) => (
              <li key={item.id}>
                <p key={item.id}>{item.id}</p>
                <p key={item.title}>{item.title}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </Authenticator>
  );
}
