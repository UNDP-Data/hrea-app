export const vectorTiles = [
    {   id:1,
        name:"Kenya Lightscore",
        source_url:"https://localhost:8000",
        bands:
            {
                lightscore:
                    {
                        'max':1,
                        'min':0,
                        'default_colormap':'warm'
                    },
                prec:
                    {
                        'max':300,
                        'min':0,
                        'default_colormap':'cool'
                    },
            }
    },
    {   id:2,
        name:"Some Other Data",
        source_url:"https://localhost:8000",
        bands:
            {
                lightscore:
                    {
                        'max':1,
                        'min':0,
                        'default_colormap':'warm'
                    },
                prec:
                    {
                        'max':300,
                        'min':0,
                        'default_colormap':'cool'
                    },
            }
    },
]