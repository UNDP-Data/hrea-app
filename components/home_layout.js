//Todo: This renders the whole list of projects. NOT ONE BY ONE
import React, {useState, useEffect, useCallback} from 'react'
import {Box, useThemeUI} from 'theme-ui'
import Collapsible from "react-collapsible";
import {colormaps, useColormap} from "@carbonplan/colormaps";
import {Badge, Dimmer, Meta, Select, Slider, Toggle} from "@carbonplan/components";
import {Line, Map, Raster, RegionPicker} from "@carbonplan/maps";
import RegionControls from "./region-controls";
const bucket = 'https://storage.googleapis.com/carbonplan-share/'


const HomeLayout = ({ data, getters, setters }) => {

    const { theme } = useThemeUI()
    const [display, setDisplay] = useState(true)
    const [opacity, setOpacity] = useState(1)
    const [clim, setClim] = useState([0, 1])
    const [month, setMonth] = useState(1)
    const [band, setBand] = useState('lightscore')
    const [colormapName, setColormapName] = useState('warm')
    const colormap = useColormap(colormapName)
    const [showRegionPicker, setShowRegionPicker] = useState(false)
    const [regionData, setRegionData] = useState({ loading: true })
    const [expanded, setExpanded] = useState(false)


    function handleBandChange(source){
        return(
            useCallback((e) => {
                    const band = e.target.value
                    setBand(band)
                    console.log(band)
                    setClim([source['bands'][band]['min'], source['bands'][band]['max']])
                    setColormapName(source['bands'][band]['default_colormap'])
                }
            )
        )
    }


    return (
        <>
            <Meta
                card={'https://images.carbonplan.org/social/maps-demo.png'}
                description={
                    'UNDP Data - HREA'
                }
                title={'UNDP Data - HREA'}
            />
            <div
                style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 20,
                    bottom: 0,
                    flexDirection: ['column', 'row', 'row'],
                    overflow: 'scroll',
                    margin: 'auto',
                }}>
                <Box sx={{width:"20%"}}>
                    <Box>
                        {data.map((source, index) => {
                            return(
                                <Collapsible trigger={source.source_url}>
                                    <Box>
                                        <Box>
                                            <Box>Display</Box>
                                            <Toggle
                                                value={display}
                                                onClick={() => setDisplay((prev) => !prev)}/>
                                        </Box>
                                        <Box>
                                            <Box>Opacity</Box>
                                            <Slider
                                                min={0}
                                                max={1}
                                                step={0.01}
                                                sx={{ width: '175px', display: 'inline-block' }}
                                                value={opacity}
                                                onChange={(e) => setOpacity(parseFloat(e.target.value))}
                                            />
                                            <Badge>{opacity.toFixed(2)}</Badge>
                                        </Box>
                                        <Box>Minimum</Box>
                                        <Slider
                                            min={0}
                                            max={20}
                                            step={1}
                                            sx={{ width: '175px', display: 'inline-block' }}
                                            onChange={(e) =>
                                                setClim((prev) => [parseFloat(e.target.value), prev[1]])
                                            }/>
                                        <Badge>{clim[0].toFixed(0)}</Badge>
                                        <Box>Maximum</Box>
                                        <Slider
                                            min={0}
                                            max={20}
                                            step={1}
                                            sx={{ width: '175px', display: 'inline-block' }}
                                            onChange={(e) =>
                                                setClim((prev) => [prev[0], parseFloat(e.target.value)])
                                            }
                                        />
                                        <Badge>{clim[1].toFixed(0)}</Badge>
                                        <Box>Month</Box>
                                        <Slider
                                            min={1}
                                            max={12}
                                            step={1}
                                            sx={{ width: '175px', display: 'inline-block' }}
                                            onChange={(e) => setMonth(parseFloat(e.target.value))}
                                        />
                                        <Badge>{month.toFixed(0)}</Badge>
                                        <Box>Band</Box>
                                        <Select
                                            size='xs'
                                            onChange={handleBandChange(source)}
                                            sx={{ mt: [1] }}
                                            value={band}>
                                            {Object.keys(source['bands']).map((band, index) => (
                                                <option key={band}>{band}</option>
                                            ))}
                                        </Select>
                                        <Box>ColorMap</Box>
                                        <Select
                                            size='xs'
                                            onChange={(e) => setColormapName(e.target.value)}
                                            sx={{ mt: [1] }}
                                            value={colormapName}>
                                            {colormaps.map((d) => (
                                                <option key={d.name}>{d.name}</option>
                                            ))}
                                        </Select>
                                    </Box>
                                </Collapsible>
                            )
                        })}
                    </Box>
                </Box>
            </div>
            <Box sx={{position:"absolute", width: '80%', right: '0', height:"100%"}}>
                <Map zoom={2} center={[0, 0]} debug={true}>
                    <Line
                        color={theme.rawColors.primary}
                        source={bucket + 'maps-demo/land'}
                        variable={'land'}
                    />
                    {showRegionPicker && (
                        <RegionPicker
                            color={theme.colors.primary}
                            backgroundColor={theme.colors.background}
                            fontFamily={theme.fonts.mono}
                            fontSize={'14px'}
                            maxRadius={2000}
                        />
                    )}
                    <Raster
                        colormap={colormap}
                        clim={clim}
                        display={display}
                        opacity={opacity}
                        mode={'texture'}
                        //source={'https://undpngddlsgeohubdev01.blob.core.windows.net/test/zarr/Kenya/lightscore'}
                        source={'http://localhost:8000'}
                        //source={'https://undpngddlsgeohubdev01.blob.core.windows.net/test/kenyazarr/Data/a'}
                        variable={'lightscore'}
                        //variable={'lightscore'}
                        //selector={{ month, band }}
                        setRegionData={setRegionData}
                    />
                    <RegionControls
                        //band={band}
                        band={"lightscore"}
                        //month={month}
                        regionData={regionData}
                        showRegionPicker={showRegionPicker}
                        setShowRegionPicker={setShowRegionPicker}
                    />
                </Map>

                <Dimmer
                    sx={{
                        display: ['initial', 'initial', 'initial', 'initial'],
                        position: 'absolute',
                        color: 'primary',
                        right: [13],
                        bottom: [17, 17, 15, 15],
                    }}
                />
            </Box>
        </>
    )
}

export default HomeLayout
