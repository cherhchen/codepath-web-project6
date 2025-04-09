import {
    PieChart,
    Pie,
    Tooltip,
    Cell,
    Legend,
} from 'recharts'

const CountryChart = ({numUS, numForeign}) => {
  const COLORS = ['#82ca9d', '#8dd1e1'];

  const cleanData = (numA, numB) => {
    const data = [{"name": "US Breweries", "value": numA}, {"name": "Foreign Breweries", "value": numB}];
    return data;
  }

  return (
    <div className="piechart-container">
      <strong>US vs. Foreign Breweries</strong>
      <PieChart width={400} height={300} className="piechart">
        <Pie 
            data={cleanData(numUS, numForeign)}
            dataKey="value"
            fill="#82ca9d"
            label
        >
        {cleanData(numUS, numForeign).map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
        </Pie>
        <Tooltip />
        <Legend verticalAlign='top' layout='horizontal'/>
      </PieChart>
    </div>
  );
}

export default CountryChart;