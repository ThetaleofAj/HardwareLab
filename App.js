import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from "react";
import { ProgressChart,LineChart} from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import RNSpeedometer from 'react-native-speedometer'


export default function App() {
  const [data,setData] = useState([]);
  const [info,setInfo] = useState({})
 
  const screenWidth = Dimensions.get('window').width;

  const data1 = {
    labels: data.map((data)=>data.timeStamp),
    datasets: [
      {
        data:  [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2 // optional
      },
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2 //
      }
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: "black",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "black",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  };

  useEffect(()=>{
    fetch("https://andyson4.pythonanywhere.com/api/home")
      .then(res => res.json())
      .then(
        (result) => {
          //console.log(result)
          setData(result)
          setInfo(result[result.length -1])
        },
        (error) => {
        }
      )
      setInterval(() => {
        fetch("https://andyson4.pythonanywhere.com/api/home")
        .then(res => res.json())
        .then(
          (result) => {
           // console.log(result)
            setData(result)
            setInfo(result[result.length -1])
          },
          (error) => {
          }
        )
        }, 30000);
  },[])

  return (
    <View style={styles.container}>
      <Text style={{paddingBottom:30,fontWeight:'bold'}}>Andyson's Temperature and Humidity Mobile App</Text>
      <View style={{paddingBottom:80}}>
      <Text>Temperature</Text>
       <RNSpeedometer
          value={parseInt(info.temperature)}
          //value for Speedometer
          size={200}
          //Size of Speedometer
          minValue={0}
          //Min value for Speedometer
          maxValue={100}
          //Max value for Speedometer
          allowedDecimals={0}
          //Decimals value allowed or not
          labels={[
            {  name: 'Low',
            labelColor: '#00ff6b',
            activeBarColor: '#00ff6b',
              
            },
            {
              name: 'Medium',
              labelColor: '#f4ab44',
              activeBarColor: '#f4ab44',
            },
            {
              name: 'High',
              labelColor: '#ff2900',
              activeBarColor: '#ff2900',
             
            },
          ]}
          //Labels for the different steps of Speedometer
        />
      </View>
     <View>
     <Text>Humidity</Text>
       <RNSpeedometer
          value={parseInt(info.humidity)}
          //value for Speedometer
          size={200}
          //Size of Speedometer
          minValue={0}
          //Min value for Speedometer
          maxValue={100}
          //Max value for Speedometer
          allowedDecimals={0}
          //Decimals value allowed or not
          labels={[
            {  name: 'Low',
            labelColor: '#00ff6b',
            activeBarColor: '#00ff6b',
              
            },
            {
              name: 'Medium',
              labelColor: '#f4ab44',
              activeBarColor: '#f4ab44',
            },
            {
              name: 'High',
              labelColor: '#ff2900',
              activeBarColor: '#ff2900',
             
            },
          ]}
          //Labels for the different steps of Speedometer
        />
     </View>
     < View style={{paddingTop:90}}>
<Text>Temperature and Humidity againt Time graph</Text>
<LineChart
        data={{
          labels: data.map((data)=>data.timeStamp) ,
          datasets: [
            {
              data: [21,23,23,23,23,23,23,23,24,23,24,24,24,24,24,24,24],
              strokeWidth: 2,

            },
            {
              data:[48,48,48,48,48,48,48,48,48,48,48,48,48,48],
              strokeWidth:2

            }
          ],
        }}
        width={Dimensions.get('window').width - 16}
        height={220}
        chartConfig={{
          backgroundColor: '#1cc910',
          backgroundGradientFrom: '#eff3ff',
          backgroundGradientTo: '#efefef',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
 </View>
        
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});



