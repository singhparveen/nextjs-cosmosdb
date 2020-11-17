const CosmosClient = require("@azure/cosmos").CosmosClient;
import config from "../config";
import Head from "next/head";

Home.getInitialProps = async function () {
  const { endpoint, key, database, container } = config;

  const client = new CosmosClient({ endpoint, key });

  const databaseID = client.database(database);
  const containerID = databaseID.container(container);

  if (endpoint) {
    console.log(`Querying container:\n${containerID}`);
    const querySpec = {
      query: "SELECT * FROM c",
    };

    const { resources: items } = await containerID.items
      .query(querySpec)
      .fetchAll();
    return { CosmoData: items };
  }
};

export default function Home({ CosmoData }) {
  return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <title>Next.JS with Azure Cosmos DB</title>
        <meta name="title" content="Next.JS with Azure Cosmos DB" />
        <meta
          name="description"
          content="Next JS Application with Azure Cosmos DB Connection"
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://nextcosmo.parveensingh.com/" />
        <meta property="og:title" content="Next.JS with Azure Cosmos DB" />
        <meta
          property="og:description"
          content="Next JS Application with Azure Cosmos DB Connection"
        />
        <meta
          property="og:image"
          content="https://nextcosmo.parveensingh.com/AppService-CosmosNext.png"
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="https://nextcosmo.parveensingh.com/"
        />
        <meta property="twitter:title" content="Next.JS with Azure Cosmos DB" />
        <meta
          property="twitter:description"
          content="Next JS Application with Azure Cosmos DB Connection"
        />
        <meta
          property="twitter:image"
          content="https://nextcosmo.parveensingh.com/AppService-CosmosNext.png"
        />
        <link rel="icon" type="image/png" href="https://nextcosmo.parveensingh.com/favicon.ico" />
        <link rel="apple-touch-icon" href="https://nextcosmo.parveensingh.com/favicon.ico" />
      </Head>
      <div className="w-full text-center bg-blue-800 flex flex-wrap items-center">
        <div className="text-3xl w-1/2 text-white mx-2 md:mx-auto py-10">
          NextJS - CosmosDB Sample
        </div>
        <div className="w-1/2">
          <a
            className="p-2 rounded text-white border-white border hover:bg-orange-700 hover:text-gray-100"
            href="https://parveensingh.com/next-js-node-app-with-cosmos-db/"
          >
            Visit the Blog
          </a>
        </div>
      </div>
      <div className="bg-gray-200 py-10">
        {CosmoData.map(({ id, name, category, description, isComplete }) => (
          <div
            className="flex bg-white shadow-lg rounded-lg mx-2 md:mx-auto mb-10 max-w-2xl"
            key={id}
          >
            <div className="flex items-start px-4 py-6">
              <div className="">
                <div className="inline items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900 -mt-1">
                    {name}
                  </h2>
                  <small className="text-sm text-gray-700 object-right">
                    Category: {category}
                  </small>
                  <small className="ml-3 text-gray-700 text-sm">
                    Status: {isComplete}
                  </small>
                </div>
                <p className="mt-3 text-gray-700 text-sm">{description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
