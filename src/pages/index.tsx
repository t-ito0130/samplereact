import { GetServerSideProps } from "next";
import { Book, getData } from "./api/getBooks";

export default function Home(props: any) {
  return (
    <>
      <ul>
        {props.items.map((item: Book) => (
          <li key={item.id}>
            <p key={item.id}>{item.id}</p>
            <p key={item.title}>{item.title}</p>
          </li>
        ))}
      </ul>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const books: Book[] = await getData("AWS");
  return {
    props: { items: books },
  };
};
