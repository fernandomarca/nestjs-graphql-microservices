import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useQuery } from "../../graphql/generated/graphql";
import { getServerPageGetProducts, ssrGetProducts } from "../../graphql/generated/pagePublic";
import { withApollo } from "../../lib/withApollo";

function Home({ data }) {
  const { user } = useUser();
  // const { data, loading, error } = useGetProductsQuery()
  const { data: me } = useQuery();

  return (
    <div className="text-violet-500">
      <h1>Hello</h1>
      <pre>ok:{JSON.stringify(me, null, 2)}</pre>
      {/* <pre>{JSON.stringify(data.products, null, 2)}</pre> */}
      <pre>
        {JSON.stringify(user, null, 2)}
      </pre>
    </div>
  )
}
export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: async (ctx) => {
    // console.log(getAccessToken(req, res));
    // return getServerPageGetProducts({}, ctx)
    return {
      props: {}
    }
  }
});

export default withApollo(
  ssrGetProducts.withPage()(Home)
);

//high order component