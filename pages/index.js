import { useState } from 'react'
import { Box, useThemeUI } from 'theme-ui'
import { Dimmer, Meta } from '@carbonplan/components'
import { Map, Raster, Line, RegionPicker } from '@carbonplan/maps'
import { useColormap } from '@carbonplan/colormaps'
import RegionControls from '../components/region-controls'
import ParameterControls from '../components/parameter-controls'

const bucket = 'https://storage.googleapis.com/carbonplan-share/'
const Index = () => {
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

  const getters = { display, opacity, clim, month, band, colormapName }
  const setters = {
    setDisplay,
    setOpacity,
    setClim,
    setMonth,
    setBand,
    setColormapName,
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
      <Box sx={{ position: 'absolute', top: 0, bottom: 0, width: '100%' }}>
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
        <ParameterControls getters={getters} setters={setters} />
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

export default Index
