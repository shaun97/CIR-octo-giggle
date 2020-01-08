
$(document).ready(function () {
    $("#speed-info-close-button").click(function () {
        $("#speed-info-box").hide();
    });

    date1 = { date: new Date(9 / 1 / 19), value: 10 };
    date2 = { date: new Date(10 / 1 / 19), value: 10 };
    date3 = { date: new Date(11 / 1 / 19), value: 10 };
    date4 = { date: new Date(12 / 1 / 19), value: 10 };

    data = [date1, date2, date3, date4]

    var myChart = echarts.init(document.getElementById('speed-chart'));

    // specify chart configuration item and data
    option = {
        // grid: {
        //     left: 10,
        //     right: 10,
        //     bottom: 10,
        //     // height: '80%'
        // },
        tooltip: {
            trigger: 'axis',
            formatter: function (params) {
                params = params[0];
                var date = new Date(params.name);
                return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
            },
            axisPointer: {
                animation: false
            }
        },
        xAxis: {
            type: 'time',
            splitLine: {
                show: false
            }
        },
        yAxis: {
            type: 'value',
            boundaryGap: [0, '100%'],
            splitLine: {
                show: false
            }
        },
        series: [{
            name: '模拟数据',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            data: data
        }]
    };

    // use configuration item and data specified to show chart
    myChart.setOption(option);
})