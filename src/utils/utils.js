
export const calculateAverage=(scores=[])=>{

return  (scores?.reduce((total,value)=>parseInt(total)+parseInt(value), 0)/scores.length);
}