import React, {FC, useEffect, useRef, useState} from "react";
import Highcharts from "highcharts";
import highchartsMap from "highcharts/modules/map";
import HighchartsReact from 'highcharts-react-official'
require("highcharts/modules/exporting")(Highcharts)
require("highcharts/modules/accessibility")(Highcharts)
require("highcharts/modules/export-data")(Highcharts)
import mapFile from "../../utils/ht-all.topo.json"

highchartsMap(Highcharts);

interface IProps {
    stats: any
}

const StateChart: FC<IProps> = (props: IProps) => {
    const [options, setOptions] = useState()
    useEffect(() => {
        var data: any = [];
        var x: any = '';
        var tiret = -1;
        if(props.stats !== undefined) Object.values(props.stats).map((item: any, key: number) => {
            if(item.name && item.name.indexOf('-') > 0 && item.name.indexOf("Grand-") === -1){
                tiret = item.name.indexOf('-');
                x = [('ht-' + item.name.substring(0, 1) + (item.name.substring(tiret+1, tiret+2))).toLowerCase(), parseInt(item.total)];
            }else {
                if (item.name.toLowerCase() === 'nord'){
                    x= ['ht-' + 'nd', parseInt(item.total)];
                }else if(item.name.toLowerCase() === 'sud'){
                    x= ['ht-' + 'sd', parseInt(item.total)];
                }else if(item.name.toLowerCase() === 'grand-anse'){
                    x= ['ht-' + 'gr', parseInt(item.total)];
                }else {
                    x = ['ht-' + item.name.substring(0, 2).toLowerCase(), parseInt(item.total)];
                }
            }
            data.push(x);
        })
        console.log(data);

        setOptions({
            chart: {
                map: mapFile
            },
            title: {
                text: ""
            },
            credits: {
                enabled: false
            },
            mapNavigation: {
                enabled: true,
                buttonOptions: {
                    verticalAlign: 'bottom'
                }
            },
            colorAxis: {
                min: 0
            },

            series: [
                {
                    data: data,
                    name: "Random data",
                    states: {
                        hover: {
                            color: "#BADA55"
                        }
                    },
                    dataLabels: {
                        enabled: true,
                        format: '{point.name}'
                    }
                }
            ]
        });
    }, [props.stats])


    return <>
        <HighchartsReact

            highcharts={Highcharts}
            options={options}
            constructorType="mapChart"
        />
    </>
}
export default StateChart
