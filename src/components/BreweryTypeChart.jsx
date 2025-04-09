import { 
  BarChart, 
  CartesianGrid, 
  XAxis, 
  YAxis, 
  Bar,
  Tooltip,
 } from "recharts";

const BreweryTypeChart = ({ list }) => {

  const cleanData = (data) => {
    let micro = 0;
    let nano = 0;
    let regional = 0
    let brewpub = 0;
    let large = 0;
    let planning = 0;
    let bar = 0;
    let contract = 0;
    let proprietor = 0;
    let closed = 0;
    for (const item of data) {
      switch (item.brewery_type) {
        case "micro":
          micro += 1;
          break;
        case "nano":
          nano += 1;
          break;
        case "regional":
          regional += 1;
          break;
        case "brewpub":
          brewpub += 1;
          break;
        case "large":
          large += 1;
          break;
        case "planning":
          planning += 1;
          break;
        case "bar":
          bar += 1;
          break;
        case "contract":
          contract += 1;
          break;
        case "proprietor":
          proprietor += 1;
          break;
        case "closed":
          closed += 1;
          break;
      }
    }
    const chartData = [
      { name: 'micro', value: micro },
      { name: 'nano', value: nano },
      { name: 'regional', value: regional },
      { name: 'brewpub', value: brewpub },
      { name: 'large', value: large },
      { name: 'planning', value: planning },
      { name: 'bar', value: bar },
      { name: 'contract', value: contract },
      { name: 'proprietor', value: proprietor },
      { name: 'closed', value: closed },
    ];
    return chartData;
  };

  return (
    <div>
      <strong>Brewery Types</strong>
      <BarChart width={1000} height={250} data={cleanData(list)}>
        <CartesianGrid />
        <XAxis dataKey="name"/>
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    </div>
  );
}

export default BreweryTypeChart;