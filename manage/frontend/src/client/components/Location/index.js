import React, {useEffect} from 'react'
import {Cascader} from 'antd'
import {inject, observer} from 'mobx-react'

const LocationField = observer((
  {
    locationStore,
    locationStore: {data},
    value,
    disabled = false,
    placeholder,
    level,
    style,
    ...rest
  }) => {

  useEffect(() => {
    load(value)
  }, [])

  const load = (value) => {
    locationStore.fetchList({parentId: 1})
      .then((response) => {
        if (response && response.result) {
          if (value && value.length > 0) {
            const city = value[0]
            const district = value.length > 1 ? value[1] : null
            loadCity(city, district)
          }
        }
      })
  }

  const loadCity = (city, district) => {
    const targetOption = data.find((r) => {
      return r.locationId === city
    })
    getLocation(targetOption, district)
  }

  const loadDistrict = (district) => {
    let parentOption = data.find((r) => {
      return r.children && r.children.find(c => {
        return c.locationId === district
      })
    })
    if (parentOption) {
      const targetOption = parentOption.children.find((r) => r.locationId === district)
      getLocation(targetOption)
    }
  }

  const checkLevel = (locationId) => {
    const length = locationId.toString().length
    const curLevel = parseInt(length) / 2
    return curLevel >= level
  }

  const getLocation = (targetOption, district = null) => {
    targetOption.loading = true
    locationStore.fetchList({parentId: targetOption.locationId})
      .then(response => {
        targetOption.loading = false
        targetOption.children = response.data
        locationStore.setList([...data])
        if (level) {
          if (district && !checkLevel(response.data[0].locationId)) {
            loadDistrict(district)
          }
        } else {
          if (district) {
            loadDistrict(district)
          }
        }
      })
  }

  const loadData = (selectedOptions) => {
    const targetOption = selectedOptions[selectedOptions.length - 1]
    getLocation(targetOption)
  }

  return (
    <Cascader
      {...rest}
      fieldNames={{label: 'name', value: 'locationId'}}
      placeholder={placeholder ? placeholder : 'Аймаг/Хот, Сум/Дүүрэг, Баг/Хороо'}
      options={data}
      loadData={loadData}
      changeOnSelect
      disabled={disabled}
      style={style ? style : {width: '100%'}}
      value={value ? value : []}
    />
  )
}, {forwardRef: true})

const LocationFieldWrapper = inject(stores => ({
  // ...stores
  locationStore: stores.locationStore,
}))(LocationField)

export default LocationFieldWrapper
