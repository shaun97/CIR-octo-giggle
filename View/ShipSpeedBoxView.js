var ShipSpeedBoxView = (function () {
    $(document).ready(function () {
        $("#speed-info-close-button").click(function () {
            $("#speed-info-box").hide();
        });
    })

    function showSpeedChart() {
        if (SPEED_CHART != null && SPEED_CHART.getOption != null) {
            SPEED_CHART.clear;
        }
        var data = [];
        for (var i = 0; i < HISTORY_DATA.length; i++) {
            var snapshot = HISTORY_DATA[i];

            var temp = { name: snapshot.TIME, value: [snapshot.TIME.slice(0, -4), snapshot.SOG] }

            data.push(temp);
        }
        // date1 = { name: '1', value: ['2019-12-20 08:59:30', 10] };
        // date2 = { name: '2', value: ['2019-12-20 09:59:30', 10] };
        // date3 = { name: '3', value: ['2019-12-20 10:59:30', 11] };
        // date4 = { name: '4', value: ['2019-12-20 11:59:30', 100] };

        // data = [date1, date2, date3, date4]
        SPEED_CHART = echarts.init(document.getElementById('speed-chart'));

        // specify chart configuration item and data
        option = {
            grid: {
                top: 'middle',
                left: 'center',
                width: '90%',
                height: '85%',
                containLabel: true,
            },
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
        SPEED_CHART.setOption(option);
    }
    return {
        showSpeedChart: showSpeedChart
    }
}());