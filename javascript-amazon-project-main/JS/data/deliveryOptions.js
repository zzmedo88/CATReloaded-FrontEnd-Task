export const delivryOptions = [{
  id : '1',
  delivryDays : 7,
  priceCents : 0
},{
  id : '2',
  delivryDays : 3,
  priceCents : 499
},{
  id : '3',
  delivryDays : 1,
  priceCents : 999
}];

export function getDelivryOption(delivryOptionId){
  let delivryOption;

  delivryOptions.forEach((option) => {
    if( option.id === delivryOptionId){
      delivryOption = option;
    }
  });
  return delivryOption || delivryOption[0];
}