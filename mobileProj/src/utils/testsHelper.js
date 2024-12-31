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
    console.log(`isLower = ${value} `)
  
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
    console.log(minMax.checked);
    return minMax;
  }
  