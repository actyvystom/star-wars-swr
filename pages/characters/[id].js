import Card from "../../components/Card";
import Layout from "../../components/Layout";
import useSWR from "swr";
import { useRouter } from "next/router";
const fetcher = async (url) => {
  const res = await fetch(url);

  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    // Attach extra info to the error object
    const apiError = await res.json();
    error.info = apiError.detail;
    error.status = res.status;
    throw error;
  }

  return res.json();
};
export default function Character() {
  const router = useRouter();
  const id = router.query.id;
  const { data, error, isLoading } = useSWR(
    `https://swapi.dev/api/people/${id}`,
    fetcher
  );

  if (isLoading) return <h1>Loading Star Wars Character...</h1>;
  if (error)
    return (
      <h1>
        {error.status}: {error.info}
      </h1>
    );
  return (
    <Layout>
      <Card
        id={id}
        name={data.name}
        height={data.height}
        eyeColor={data.eye_color}
        birthYear={data.birth_year}
      />
    </Layout>
  );
}
