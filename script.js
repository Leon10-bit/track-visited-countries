(async () => {

    const topology = await fetch(
        'https://code.highcharts.com/mapdata/custom/world.topo.json'
    ).then(response => response.json());

    // We use a darker border for some states
    const darkBorderColor = '#ccc';


    // Define the data, linking country codes to their flags
    const data = [
        ["United States of America", "https://flagcdn.com/us.svg"],
        ['France', "https://flagcdn.com/fr.svg"],
        ['Japan', "https://flagcdn.com/jp.svg"],
        ['Brazil', "https://flagcdn.com/br.svg"],
        ['Canada', "https://flagcdn.com/ca.svg"],
    ]; 

    // Create the chart
    Highcharts.mapChart('container', {
        chart: {
            map: topology,
            height: '80%', // Increase chart height for better visibility
            events: {
                click: function(e) {
                    // If a point was clicked
                    if (e.point) {
                        const countryName = e.point.name;
                        let elementId;
                        
                        // Map country names to HTML element IDs
                        if (countryName === 'United States of America') {
                            elementId = 'USA';
                        } else if (countryName === 'France' || 
                                  countryName === 'Japan' || 
                                  countryName === 'Brazil' || 
                                  countryName === 'Canada') {
                            elementId = countryName;
                        }
                        
                        // Scroll to the element if we have a matching ID
                        if (elementId) {
                            const element = document.getElementById(elementId);
                            if (element) {
                                element.scrollIntoView({ 
                                    behavior: 'smooth',
                                    block: 'start'
                                });
                            }
                        }
                    }
                }
            }
        },

        title: {
            text: 'World Flags'
        },

        subtitle: {
            text: 'Source: <a href="https://flagcdn.com/">Flag CDN</a>'
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

        // Make tooltip show full image and description
        tooltip: {
            useHTML: true,
            borderColor: '#aaa',
            headerFormat: '<div style="text-align:center;"><h3>{point.point.name}</h3></div>',
            pointFormatter: function() {
                let description = '';
                
                // Match country name to get appropriate description
                if (this.name === 'United States of America') {
                    description = 'I love the diversity and national parks of the USA. There\'s always something new to explore, from coast to coast.';
                } else if (this.name === 'France') {
                    description = 'France\'s art, history, and cuisine are simply unparalleled. Wandering the streets of Paris is a dream come true.';
                } else if (this.name === 'Japan') {
                    description = 'Japan blends ancient tradition with cutting-edge technology. Cherry blossom season is absolutely magical.';
                } else if (this.name === 'Brazil') {
                    description = 'The energy of Rio, the rhythms of samba, and the beauty of the Amazon make Brazil a must-visit destination.';
                } else if (this.name === 'Canada') {
                    description = 'From the Rocky Mountains to vibrant cities like Toronto and Montreal, Canada offers endless natural beauty and culture.';
                }
                
                return '<div style="text-align:center;">' +
                    '<img style="width: 200px; height: auto; max-height: 120px; object-fit: contain; margin-bottom: 10px;" ' +
                    'src="' + this.options.color.pattern.image + '">' +
                    '<p style="width:200px;white-space:break-spaces; margin: 5px 0; font-size: 14px;">' + description + '</p>' +
                    '</div>';
            }
        },

        // Define the series
        series: [{
            name: 'Country flags',
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
                    // definitions for each point
                    aspectRatio: 3 / 2,
                    width: 60,       // Set a fixed width for the pattern
                    height: 40,      // Set a fixed height for the pattern
                    backgroundColor: 'rgba(255,255,255,0.1)', // Add slight background
                    opacity: 0.85    // Make images slightly transparent to see borders
                }
            },
            states: {
                hover: {
                    borderColor: '#b44',
                    borderWidth: 2
                }
            },
            point: {
                events: {
                    click: function() {
                        let elementId;
                        
                        // Map country names to HTML element IDs
                        if (this.name === 'United States of America') {
                            elementId = 'USA';
                        } else if (this.name === 'France' || 
                                  this.name === 'Japan' || 
                                  this.name === 'Brazil' || 
                                  this.name === 'Canada') {
                            elementId = this.name;
                        }
                        
                        // Scroll to the element if we have a matching ID
                        if (elementId) {
                            const element = document.getElementById(elementId);
                            if (element) {
                                element.scrollIntoView({ 
                                    behavior: 'smooth',
                                    block: 'start'
                                });
                            }
                        }
                    }
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