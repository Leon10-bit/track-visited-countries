(async () => {

    const topology = await fetch(
        'https://code.highcharts.com/mapdata/custom/world.topo.json'
    ).then(response => response.json());

    // We use a darker border for some states
    const darkBorderColor = '#ccc';


    // Define the data, linking flags to each point's color.pattern.image. We
    // specify a smaller border width for the smaller states. For some states we
    // also specify an explicit x/y offset for the images, where the default is
    // not satisfactory. Aspect ratio is provided in series definition, and the
    // width height for each image is calculated automatically based on that
    // and the
    // bounding box of each state.
    const data = [
        ["United States of America", "assets/img/Statue-of-Liberty-Island-New-York.webp"],
        ['France', "assets/img/Eiffels-Scientific-Contributions-1-700ee2f5.jpeg"],
        ['Japan', "assets/img/fuji-and-sakura-royalty-free-image-144483163-1562593125.jpg"],
        ['Brazil', "assets/img/cq5dam.thumbnail.cropped.750.422.jpeg"],
        ['Canada', "assets/img/canada.jpeg"],
       
    ]; 

    // Create the chart
    Highcharts.mapChart('container', {
        chart: {
            map: topology
        },

        title: {
            text: 'World  flags'
        },

        subtitle: {
            text: 'Source: <a href="https://en.wikipedia.org/wiki/Flags_of_the_U.S._states_and_territories">Wikipedia</a>'
        },

        accessibility: {
            description: 'Map of US states, where each state is filled with ' +
                'an illustration of its state flag.'
        },

        // Add zoom/pan
        mapNavigation: {
            enabled: true,
            enableDoubleClickZoomTo: true,
            buttonOptions: {
                verticalAlign: 'bottom'
            }
        },

        // Limit zoom
        xAxis: {
            minRange: 3500
        },

        // We do not want a legend
        legend: {
            enabled: false
        },

        // Make tooltip show full image
        tooltip: {
            useHTML: true,
            borderColor: '#aaa',
            headerFormat: '<b>{point.point.name}</b><br>',
            pointFormat: '<img style="width: 150px; height: 100px;" ' +
                'src="{point.options.color.pattern.image}">'
        },

        // Define the series
        series: [{
            name: 'State flags',
            accessibility: {
                exposeAsGroupOnly: true
            },
            keys: [
                'name', 'color.pattern.image', 'borderWidth', 'color.pattern.x',
                'color.pattern.y', 'borderColor'
            ],
            joinBy: 'name',
            data: data,
            borderColor: '#fff',
            color: {
                pattern: {
                    // This is inherited by the individual pattern
                    // definitions for
                    // each point. As long as a width/height for the pattern
                    // is not
                    // defined, Highcharts will automatically fill the
                    // bounding box
                    // while preserving the aspect ratio defined here.
                    // Without an
                    // aspect ratio defined, Highcharts will simply fill the
                    // bounding box with the image, stretching it to fit.
                    aspectRatio: 3 / 2
                }
            },
            states: {
                hover: {
                    borderColor: '#b44',
                    borderWidth: 2
                }
            }
        }, {
            /* Separator lines */
            type: 'mapline',
            nullColor: '#aaa',
            accessibility: {
                enabled: false
            }
        }]
    });

})();