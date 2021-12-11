import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client"
import "../styles/tailwind.css"
import {useRouter} from "next/router";

function MyApp({Component, pageProps}) {

  const client = new ApolloClient({uri: `/api/graphql`, cache: new InMemoryCache()})

  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>)
}

export default MyApp
