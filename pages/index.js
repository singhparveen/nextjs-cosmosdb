const CosmosClient = require("@azure/cosmos").CosmosClient;
import config from "../config";

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
      <div className="text-3xl flex mx-2 md:mx-auto my-10 max-w-2xl">HomePage</div>
      {CosmoData.map(({ id, name, category, description, isComplete }) => (
        <div
          className="flex bg-white shadow-lg rounded-lg mx-2 md:mx-auto my-10 max-w-2xl"
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
  );
}
