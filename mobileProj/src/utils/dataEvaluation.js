export function getUserEvaluation(rowData,minMax,geo,conf,found,usersTest,isfirstTest,isSecoundTest){
  if(found){
    return{
    kilavuzName: rowData.kilavuzName,
    type: rowData.type,
    value: rowData.value,
    age_group: rowData.age_group,
    // Geo values
    DataBaseMinGeoRange: geo.DataBaseMinRange,
    DataBaseMaxGeoRange: geo.DataBaseMaxRange,
    isLowerGeo: geo.isLower,
    isHigherGeo: geo.isHigher,
    resultGeo: geo.inRange,
    checkedByGeo:geo.checked,
    // minmax values
    isLowerMinMax: minMax.isLower,
    isHigherMinMax: minMax.isHigher,
    DataBaseMinRange: minMax.DataBaseMinRange,
    DataBaseMaxRange: minMax.DataBaseMaxRange,
    resultMinMax: minMax.inRange,
    checkedByminmax:minMax.checked,
    // Confidence values
    isLowerConf: conf.isLower,
    isHigherConf: conf.isHigher,
    DataBaseMinRangeconf: conf.DataBaseMinRange,
    DataBaseMaxRangeconf: conf.DataBaseMaxRange,
    resultConf: conf.inRange,
    checkedByConf:conf.checked,
    //
                //users tests
      firstTestDate:usersTest[0]?.date||null,
      firstTestValue:usersTest[0]?.value||null,
      secoundTestDate:usersTest[1]?.date||null,
      secoundTestValue:usersTest[1]?.value||null,
      isfirstTest:isfirstTest,
      isSecoundTest:isSecoundTest,
      found: true,
    }
  }
  else{
    return{
      kilavuzName: null,
      type: rowData.type,
      value: rowData.value,
      age_group: null,
      // Geo values
      DataBaseMinGeoRange: null,
      DataBaseMaxGeoRange: null,
      isLowerGeo: null,
      isHigherGeo: null,
      resultGeo: null,
      checkedByGeo:false,
      // minmax values
      isLowerMinMax: null,
      isHigherMinMax: null,
      DataBaseMinRange: null,
      DataBaseMaxRange: null,
      resultMinMax: null,
      checkedByminmax:false,
       // Confidence values
       isLowerConf: null,
       isHigherConf: null,
       DataBaseMinRange: null,
       DataBaseMaxRange: null,
       resultConf: null,
       checkedByConf:false,

       //
       firstTestDate:null,
        firstTestValue:null,
        secoundTestDate:null,
        secoundTestValue:null,
        isfirstTest:false,
        isSecoundTest:false,
      found: false,
    }
  }

}

export function getEvaluation(rowData,minMax,geo,conf,found){
  if(found){
  return {
    kilavuzName: rowData.kilavuzName,
    type: rowData.type,
    value: rowData.value,
    age_group: rowData.age_group,
    // Geo values
    DataBaseMinGeoRange: geo.DataBaseMinRange,
    DataBaseMaxGeoRange: geo.DataBaseMaxRange,
    isLowerGeo: geo.isLower,
    isHigherGeo: geo.isHigher,
    resultGeo: geo.inRange,
    checkedByGeo:geo.checked,
    // minmax values
    isLowerMinMax: minMax.isLower,
    isHigherMinMax: minMax.isHigher,
    DataBaseMinRange: minMax.DataBaseMinRange,
    DataBaseMaxRange: minMax.DataBaseMaxRange,
    resultMinMax: minMax.inRange,
    checkedByminmax:minMax.checked,
    // Confidence values
    isLowerConf: conf.isLower,
    isHigherConf: conf.isHigher,
    DataBaseMinRangeconf: conf.DataBaseMinRange,
    DataBaseMaxRangeconf: conf.DataBaseMaxRange,
    resultConf: conf.inRange,
    checkedByConf:conf.checked,
    //
    found: found,
  };
}
else{
  return{
    kilavuzName: null,
    type: type,
    value: value,
    age_group: null,
    // Geo values
    DataBaseMinGeoRange: null,
    DataBaseMaxGeoRange: null,
    isLowerGeo: null,
    isHigherGeo: null,
    resultGeo: null,
    checkedByGeo:false,
    // minmax values
    isLowerMinMax: null,
    isHigherMinMax: null,
    DataBaseMinRange: null,
    DataBaseMaxRange: null,
    resultMinMax: null,
    checkedByminmax:false,
     // Confidence values
     isLowerConf: null,
     isHigherConf: null,
     DataBaseMinRange: null,
     DataBaseMaxRange: null,
     resultConf: null,
     checkedByConf:false,

     //
    found: false,
  }
}
}
export function getGeoTest(row,value){
  const isLower =value < Math.abs(row.max_geo - row.min_geo);
  const isHigher =value > (row.min_geo + row.max_geo);
  const inRange =(!isLower && !isHigher);


  const geo={
    isLower :isLower,
    isHigher: isHigher,
    inRange :inRange,
    DataBaseMinRange: row.min_geo,
    DataBaseMaxRange: row.max_geo,
    checked: ( row.max_geo+row.min_geo)>0//check if there values was null or not if null dont show the m to the user
  }
  return geo;
}
export  function getConfTest(row,value){
  const isLower =value < row.min_confidence;
  const isHigher =value > row.max_confidence;
  const inRange =(!isLower && !isHigher);

  const conf={
    isLower :isLower,
    isHigher: isHigher,
    inRange :inRange,
    DataBaseMinRange: row.min_confidence,
    DataBaseMaxRange: row.max_confidence,
    checked: ( row.min_confidence+row.max_confidence)>0//check if there values was null or not if null dont show the m to the user
  }
  return conf;
}
export function getMinMaxTest(row,value){

  const isLower =value < row.min;
  const isHigher = value > row.max;
  const inRange =(!isLower && !isHigher);

  const minMax={
    isLower :isLower,
    isHigher:isHigher,
    inRange :inRange,
    DataBaseMinRange: row.min,
    DataBaseMaxRange: row.max,
    checked: (row.min+row.max)>0//check if there values was null or not if null dont show the m to the user
  };
  return minMax;
}
