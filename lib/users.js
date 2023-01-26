const {
  request,
  gql
} = require('graphql-request');
const getServerSideProps = async () => {
  const query = gql`
    {
      embrGetProtocolData {
        circulatingSupply
      }
    }
    `;
  const results = await request('https://teste.testeborabora.cyou/graphql', query);
  console.log("vai toma: " + JSON.stringify(results.embrGetProtocolData));
  return results.embrGetProtocolData.circulatingSupply;
};
const userRoutes = async (app, fs) => {
  // variables  
  const query = gql`
        {
          embrGetProtocolData {
            circulatingSupply
          }
        }
        `;
  const results = await request('https://teste.testeborabora.cyou/graphql', query);
  console.log("vai toma: " + JSON.stringify(results.embrGetProtocolData));
  const dataPath = JSON.stringify(results.embrGetProtocolData.circulatingSupply);
  console.log("DATAPIXOTA: " + JSON.stringify(dataPath.replace("circulatingSupply", "")));

  // helper methods
  const readFile = (callback, returnJson = false, filePath = dataPath, encoding = 'utf8') => {
    fs.readFile(filePath, encoding, (err, data) => {
      if (err) {
        throw err;
      }
      callback(returnJson ? JSON.parse(data) : data);
    });
  };

  // READ
  app.get('/circulatingSupply', (req, res) => {
    console.log("FRANCISCO: " + JSON.stringify(dataPath));
    /* fs.readFile(JSON.stringify(dataPath), 'utf8', (err, data) => {
         if (err) {
             throw err;
         }
           res.send(JSON.parse(data));
     });*/
    /*  const d1 = JSON.stringify(dataPath).replace("circulatingSupply","");
      const d2 = d1.replace("{","");
      const d3 = d2.replace(/'/g,'');
      console.log("JOANA: "+d3)*/

    res.send(JSON.parse(dataPath));
  });
};
module.exports = userRoutes;